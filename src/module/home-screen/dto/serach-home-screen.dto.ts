import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchHomeScreenDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    partyName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    placeName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    date?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    fileName?: string;
}
