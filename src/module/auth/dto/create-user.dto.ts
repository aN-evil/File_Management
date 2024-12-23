import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsOptional,
    IsBoolean,
    IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'test@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Name of the user',
        example: 'jaymin patel',
    })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        description: 'Username of the user',
        example: 'jaymin54',
    })
    @IsString()
    @IsNotEmpty()
    username: string;
}

export class CreateGuestDto {
    @ApiProperty({
        description: 'Indicates if the user is a guest',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    isGuest?: boolean;
}

export interface Payload {
    id: string;
    email: string;
}
