import { IsString, IsInt, IsEnum, IsOptional, Min } from 'class-validator';
import { TableStatus } from '@prisma/client';

export class CreateTableDto {
    @IsString()
    tableNumber: string;

    @IsInt()
    @Min(1)
    capacity: number;

    @IsEnum(TableStatus)
    @IsOptional()
    status?: TableStatus;

    @IsString()
    @IsOptional()
    qrCode?: string;
}
