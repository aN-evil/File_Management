import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    private get<T>(key: string) {
        const value = this.configService.get<T>(key);
        if (value == null) {
            throw new InternalServerErrorException(
                `app env config error ${key}`,
            );
        }
        return value;
    }
    get jwtPublic(): string {
        let str;
        try {
            str = readFileSync(
                'src/module/auth/certs/private-key.pem',
            ).toString();
        } catch (e) {
            throw new InternalServerErrorException(
                'app env config error - public',
            );
        }
        return str;
    }
    get port(): number {
        return this.get<number>('app.serverPort');
    }

    get jwtSecret(): string {
        return this.get<string>('app.jwtSecret');
    }

    get accessToken(): number {
        return this.get<number>('app.accessTokenSecretExpire');
    }
    get refreshToken(): number {
        return this.get<number>('app.refreshTokenSecretExpire');
    }

    get emailPort(): number {
        return this.get<number>('app.emailPort');
    }

    get emailHost(): string {
        return this.get<string>('app.emailHost');
    }

    get emailFrom(): string {
        return this.get<string>('app.emailFrom');
    }

    get emailAppPasswod() {
        return this.get<string>('app.emailAppPassword');
    }
}
