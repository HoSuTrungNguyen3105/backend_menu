import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    key: string;

    @IsString()
    category: string;

    @IsString()
    action: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
