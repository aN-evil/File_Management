import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    SuccessMessage,
    UnauthorizedMessage,
    InternalServerErrorMessage,
    BadRequestMessage,
} from 'src/common/types/enum.types';
import { CreateGuestDto, CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token-user.dto';

@ApiTags('Authentication Management')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Sign up using email' })
    @ApiResponse({ status: HttpStatus.OK, description: SuccessMessage })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: UnauthorizedMessage,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: InternalServerErrorMessage,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: BadRequestMessage,
    })
    async signup(@Body() dto: CreateUserDto) {
        return await this.authService.createUser(dto);
    }

    @Post('authenticate')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: HttpStatus.OK, description: SuccessMessage })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: UnauthorizedMessage,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: InternalServerErrorMessage,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: BadRequestMessage,
    })
    async login(@Body() dto: LoginUserDto) {
        return await this.authService.loginUser(dto);
    }

    @Post('guest')
    @ApiOperation({ summary: 'guest login' })
    @ApiResponse({ status: HttpStatus.OK, description: SuccessMessage })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: UnauthorizedMessage,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: InternalServerErrorMessage,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: BadRequestMessage,
    })
    async guest(@Body() dto: CreateGuestDto) {
        return await this.authService.createGuest(dto);
    }

    @Post('refresh-token')
    @ApiOperation({
        summary: 'Refresh token',
        description: 'Generate new access token using refresh token.',
    })
    @ApiOperation({ summary: 'admin web login' })
    @ApiResponse({ status: HttpStatus.OK, description: SuccessMessage })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: UnauthorizedMessage,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: InternalServerErrorMessage,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: BadRequestMessage,
    })
    async refreshToken(@Body() dto: RefreshTokenDto) {
        return await this.authService.refreshToken(dto.refreshToken);
    }
}
