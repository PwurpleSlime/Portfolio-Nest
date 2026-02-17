import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { ROLES_KEY } from "./roles.decorator";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('Auth Guard Successfully Hit')
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass],
        )

        if (isPublic) return true

        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing Required Auth Token')
        }

        const token = authHeader.split(' ')[1]
        // decode / figure out encode token
        

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if (!requiredRoles || requiredRoles.length === 0) {
            return true
        }

        // Figure out how to designate Roles
//         const userRoles: string[] = decodedToken.roles ?? [] // What is this handling

        // const expandedUserRoles = new Set<string>() // What is expanded User Roles

        // for (const role of userRoles) {
        //     const inheritedRoles = ROLE_HIERARCHY[role] ?? [] // Does this handle if I don't set my roles?
        //     inheritedRoles.forEach(r => expandedUserRoles.add(r)) // What is R and what is it doing
        // }

        // const hasRole = requiredRoles.some(role => expandedUserRoles.has(role),)

        // if (!hasRole) {
        //     throw new ForbiddenException('Insufficient Permissions')
        // }

        return true
    }
}