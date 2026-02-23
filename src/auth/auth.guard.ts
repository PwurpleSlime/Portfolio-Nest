import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { ROLES_KEY } from "./decorators/roles/roles.decorator";
import { IS_TFA_KEY } from "./decorators/tfa.decorator";
import speakeasy from 'speakeasy'
import * as admin from 'firebase-admin'
import { ROLES_HIREACHY as ROLES_HIERARCHY } from "./decorators/roles/roles-hierarchy";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('Auth Guard Successfully Hit')
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass],
        )
        console.log('Before Public');
        
        if (isPublic) return true
        console.log('After Public');
        
        const isTFA = this.reflector.getAllAndOverride<boolean>(
            IS_TFA_KEY,
            [context.getHandler(), context.getClass()]
        )
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization

        if (!authHeader|| !authHeader.startsWith('Bearer ')) {            
            throw new UnauthorizedException('Missing Required Auth Token')
        }

        const token = authHeader.split(' ')[1]

        if (isTFA) {
            try {
                const base32 = process.env.TFASecret!
                const tokenValidates = speakeasy.totp.verify({ secret: base32, encoding: 'base32', token: token, window: 1})

                if (tokenValidates) {
                    return true
                }else {
                    return false
                }
            } catch (err) {
                console.error(err)
            }
        }        

        let decodedToken: admin.auth.DecodedIdToken

        try {
            decodedToken = await this.firebaseAdmin
            .auth()
            .verifyIdToken(token)
        } catch (err) {
            console.error(err)
            throw new UnauthorizedException('Invalid Token')
        }

        request.user = decodedToken
        console.log(request.user)

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if (!requiredRoles || requiredRoles.length === 0) {
            return true
        }

        const userRoles: string[] = decodedToken.roles ?? []

        const expandedUserRoles = new Set<string>()

        for (const role of userRoles) {
            const inheritedRoles = ROLES_HIERARCHY[role] ?? []
            inheritedRoles.forEach(r => expandedUserRoles.add(r))
        }

        const hasRole = requiredRoles.some(role => expandedUserRoles.has(role))

        if (!hasRole) {
            throw new ForbiddenException('Insufficient Permissions')
        }

        return true
    }
}