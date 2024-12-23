import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/config.service';
import { AuthService } from 'src/module/auth/auth.service';
import { Payload } from 'src/module/auth/dto/create-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: AppConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtPublic,
            algorithms: ['RS256'],
        });
    }

    async validate(payload: Payload) {
        const id = payload.id;
        const user = await this.authService.getUserById(id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
