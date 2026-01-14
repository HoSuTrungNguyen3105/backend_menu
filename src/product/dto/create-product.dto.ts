import { IsString, IsDecimal, IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Type(() => Number)
    @IsDecimal({ decimal_digits: '2' })
    price: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    isAvailable?: boolean;

    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @IsInt()
    @Min(0)
    @IsOptional()
    displayOrder?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    calories?: number;

    @IsString()
    categoryId: string;
}
