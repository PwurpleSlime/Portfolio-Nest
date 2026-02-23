import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ROLES_HIREACHY } from 'src/auth/decorators/roles/roles-hierarchy';
import * as admin from 'firebase-admin'
@Injectable()
export class FirebaseAuthRolesService {
    constructor(
        @Inject('FIREBASE_ADMIN')
        private readonly firebaseAdmin: typeof admin
    ){}
    async designateRoleOwner(targetUid: string, roles: string[]) { await this.designateRole(targetUid, roles) }

    async designateRoleAdmin(targetUid: string, roles: string[]) {
        if (roles.includes('owner')) throw new BadRequestException("Admins cannot declare owner")
            
        return await this.designateRole(targetUid, roles)
    }
    async designateRole(targetUid: string, roles: string[]) {
        if (!targetUid) throw new BadRequestException("Target UID is required")
        
        if (!Array.isArray(roles) || roles.length === 0) throw new BadRequestException("Roles must be a non empty array")

        const validRoles = Object.keys(ROLES_HIREACHY)

        for (const role of roles) if (!validRoles.includes(role)) throw new BadRequestException(`Invalid role: ${role}`)

        await this.firebaseAdmin.auth().setCustomUserClaims(targetUid, { roles })

        return { uid: targetUid, roles, message: 'Roles updated successfully'}
    }
}
