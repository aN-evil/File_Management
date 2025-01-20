import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class FileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CreateHomeScreenDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    partyName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    placeName: string;

    @ApiProperty({
        type: [FileDto],
        required: false,
        example: [
            {
                name: 'AA',
            },
            {
                name: 'BB',
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FileDto)
    @IsOptional()
    files?: FileDto[];
}
