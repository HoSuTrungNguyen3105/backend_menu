import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    current_page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    per_page?: number = 10;

    @IsOptional()
    @IsString()
    keyword?: string = '';

    @IsOptional()
    @IsString()
    sort_by?: string = '';

    @IsOptional()
    @IsIn(['ASC', 'DESC', 'asc', 'desc'])
    sort_dir?: string = 'ASC';

    @IsOptional()
    @IsString()
    date_col?: string = '';

    @IsOptional()
    @IsString()
    from_date?: string = '';

    @IsOptional()
    @IsString()
    to_date?: string = '';
}
