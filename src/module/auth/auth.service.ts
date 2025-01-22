import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './repository/auth.repository';
import { AppConfigService } from '../../config/config.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateGuestDto, CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiError } from '../../common/halper/helper.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly configService: AppConfigService,
        private readonly jwtService: JwtService,
    ) {}

    private async checkUserExistence(email: string, username: string) {
        return this.authRepository.findUserByEmailOruserName(email, username);
    }

    async createUser(dto: CreateUserDto) {
        const { email, password, fullName, username } = dto;

        const existingUser = await this.checkUserExistence(email, username);

        if (existingUser) {
            await this.handleExistingUser(existingUser, dto);
        }

        const authKey = this.generateAuthKey();
        const newUser = await this.authRepository.createUser({
            email,
            password: await this.hashPassword(password),
            username,
            fullName,
            authKey,
        });

        const tokens = await this.generateTokens(newUser.id);
        return {
            id: newUser.id,
            authKey: authKey,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async loginUser(dto: LoginUserDto) {
        const { email, password: userPassword } = dto;

        const foundUser = await this.authRepository.findUserByEmail(
            email,
            false,
        );

        if (!foundUser) {
            throw new BadRequestException(ApiError.USER_NOT_REGISTER);
        }

        const [isPasswordMatch, tokens] = await Promise.all([
            bcrypt.compare(userPassword, foundUser.password),
            this.generateTokens(foundUser.id),
        ]);

        if (!isPasswordMatch) {
            throw new BadRequestException(ApiError.USER_INVALID_PASSWORD);
        }

        return {
            id: foundUser.id,
            authKey: foundUser.authKey,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async getUserById(id: string) {
        const user = await this.authRepository.findUserById(id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    // async createGuest(dto: CreateGuestDto) {
    //     const expiresAt = new Date();
    //     expiresAt.setHours(expiresAt.getHours() + 24);

    //     const guestUser = await this.authRepository.createGuestUser({
    //         isGuest: true,
    //         expiresAt,
    //     });

    //     const token = await this.generateTokens(guestUser.id);
    //     return {
    //         id: guestUser.id,
    //         accessToken: token.accessToken,
    //         refreshToken: token.refreshToken,
    //     };
    // }

    // @Cron(CronExpression.EVERY_DAY_AT_1AM)
    // async deleteExpiredGuests() {
    //     const currentTime = new Date();
    //     await this.authRepository.deleteExpiredGuests(currentTime);
    // }

    private async handleExistingUser(existingUser, dto) {
        if (existingUser.isDeleted) {
            await this.authRepository.deleteUserById(existingUser.id);
        } else {
            await this.checkUniqueFields(existingUser, dto);
        }
    }

    private async checkUniqueFields(existingUser, dto) {
        if (existingUser.email === dto.email) {
            throw new BadRequestException(ApiError.USER_EMAIL_ALREADY_TAKEN);
        } else if (existingUser.displayName === dto.displayName) {
            throw new BadRequestException(ApiError.USER_USERNAME_ALREADY_TAKEN);
        }
    }

    async generateTokens(id: string) {
        const accessToken = await this.generateJwtToken(
            { id },
            this.configService.accessToken,
        );
        const refreshToken = await this.generateJwtToken(
            { sub: id },
            this.configService.refreshToken,
        );

        const hashedRefreshToken = await this.hash(refreshToken);
        await this.authRepository.updateUserRefreshToken(
            id,
            hashedRefreshToken,
        );

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException(ApiError.TOKEN_REFRESH_NULL);
        }

        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                ignoreExpiration: true,
            });

            const userId = payload.sub || payload.id;

            const foundUser =
                await this.authRepository.findUserForRefreshToken(userId);

            if (
                !foundUser ||
                !(await this.compare(refreshToken, foundUser.refreshToken))
            ) {
                throw new UnauthorizedException(ApiError.TOKEN_INVALID_REFRESH);
            }

            const tokens = await this.generateTokens(foundUser.id);
            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        } catch (error) {
            this.handleTokenError(error);
        }
    }

    private handleTokenError(error) {
        if (error.name === ApiError.TOKEN_EXPIRED_ERROR) {
            throw new UnauthorizedException(ApiError.TOKEN_EXPIRED);
        }
        throw new UnauthorizedException(ApiError.TOKEN_INVALID);
    }

    private async generateJwtToken(payload: object, expiresIn: number) {
        return this.jwtService.signAsync(payload, {
            expiresIn: Number(expiresIn),
            secret: this.configService.jwtPublic,
        });
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async hash(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    async compare(data: string, hashedData: string): Promise<boolean> {
        return bcrypt.compare(data, hashedData);
    }

    private generateAuthKey(): string {
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substring(2, 10);
        return `${timestamp}-${randomPart}`;
    }
}
