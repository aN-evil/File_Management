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

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    date?: string; // Optional for updates
}

export class UpdateHomeScreenDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    partyName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    placeName?: string;

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
