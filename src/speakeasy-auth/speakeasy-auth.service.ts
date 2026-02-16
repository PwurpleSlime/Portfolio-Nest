import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { randomUUID } from 'crypto';
import speakeasy from 'speakeasy'
import { authDTO } from './dto/auth.dto';
@Injectable()
export class SpeakeasyAuthService {
    db = new JsonDB(new Config('myDatabase', true, false, '/'))

    async registerUser(){
        const id = randomUUID()
        console.log(id);

        try {
            const path = `/speakeasy2fa/user/${id}`
            const temp_secret = speakeasy.generateSecret()
            this.db.push(path, { id, temp_secret})
            return temp_secret.base32
        } catch (error) {
            console.error(error)
        }
    }

    async verifyUser(authDTO: authDTO) {
        const { token, userId} = authDTO
        try {
            const path = `/speakeasy2fa/user/${userId}`
            const user = await this.db.getData(path)

            const {base32: secret} = user.temp_secret

            const verified = speakeasy.totp.verify({ secret: secret,
                encoding: 'base32',
                token: token
            })

            if (verified) {
                this.db.push(path, { id: userId, secret: user.temp_secret})
                return {verified: true}
            }else {
                return {verified: false}
            }
        } catch (error) {
            console.error(error)
        }
    }

    async validateUser(authDTO: authDTO) {
        const { token, userId} = authDTO

        try {
            const path = `/speakeasy2fa/user/${userId}`
            const user = await this.db.getData(path)

            const {base32: secret} = user.secret

            const tokenValidates = speakeasy.totp.verify({ secret: secret,
                encoding: 'base32',
                token: token,
                window: 1
            })

            if (tokenValidates) {
                return {validated: true}
            }else {
                return {validated: false}
            }
        } catch (error) {
            console.error(error)
        }
    }

}
