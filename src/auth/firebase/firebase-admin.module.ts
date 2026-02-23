import { Module } from '@nestjs/common'
import * as admin from 'firebase-admin'

export const FirebaseAdminProvider = {
    provide: 'FIREBASE_ADMIN',
    useFactory: () => {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(
                    JSON.parse(process.env.SERVICE_ACCOUNT!)
                )
            })
        }
    }
}

@Module({
    providers: [FirebaseAdminProvider],
    exports: ['FIREBASE_ADMIN'],
    imports: []
})
export class FirebaseAdminModule {}