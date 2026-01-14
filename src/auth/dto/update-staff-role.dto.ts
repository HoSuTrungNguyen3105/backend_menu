import { IsEnum, IsOptional, IsArray, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateStaffRoleDto {
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    permissions?: string[];
}
