import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
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
}
