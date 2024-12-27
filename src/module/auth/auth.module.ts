import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import { AuthService } from './auth.service';
import { AppConfigModule } from '../../config/config.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../common/auth/jwt.strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthRepository } from './repository/auth.repository';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        AppConfigModule,
        JwtModule.register({
            global: true,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
            privateKey: fs.readFileSync('src/module/auth/certs/private.pem'),
            publicKey: fs.readFileSync('src/module/auth/certs/public-key.pem'),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthRepository],
})
export class AuthModule {}
