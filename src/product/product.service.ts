import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../table/dto/pagination-query.dto';
import { sendResponse, ApiResponse } from '../helpers/response';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async create(createProductDto: CreateProductDto): Promise<ApiResponse> {
        const product = await this.prisma.product.create({
            data: createProductDto,
        });

        return sendResponse(201, {
            msg: 'Product created successfully',
            data: product,
            save_result: null
        });
    }

    async findAll(query: PaginationQueryDto): Promise<ApiResponse> {
        const {
            current_page = 1,
            per_page = 10,
            keyword = '',
            sort_by = 'displayOrder',
            sort_dir = 'ASC',
            date_col = '',
            from_date = '',
            to_date = '',
        } = query;

        const skip = (current_page - 1) * per_page;

        const where: any = {};
        if (keyword) {
            where.OR = [
                { name: { contains: keyword } },
                { description: { contains: keyword } },
            ];
        }

        const orderBy: any = {};
        if (sort_by) {
            orderBy[sort_by] = sort_dir.toLowerCase();
        }

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: per_page,
                include: {
                    category: true,
                    tags: true,
                },
            }),
            this.prisma.product.count({ where }),
        ]);

        const total_pages = Math.ceil(total / per_page);

        return sendResponse(200, {
            msg: 'success',
            data: products,
            pagination: {
                current_page,
                per_page,
                total,
                total_pages,
                keyword,
                sort_by,
                sort_dir,
                date_col,
                from_date,
                to_date,
            },
            save_result: null,
        });
    }

    async findOne(id: string): Promise<ApiResponse> {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                tags: true,
                optionGroups: {
                    include: {
                        options: true,
                    },
                },
            },
        });

        if (!product) {
            return sendResponse(404, {
                msg: 'Product not found',
                save_result: null
            });
        }

        return sendResponse(200, {
            msg: 'Product retrieved successfully',
            data: product,
            save_result: null
        });
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ApiResponse> {
        try {
            const product = await this.prisma.product.update({
                where: { id },
                data: updateProductDto,
            });

            return sendResponse(200, {
                msg: 'Product updated successfully',
                data: product,
                save_result: null
            });
        } catch (error) {
            return sendResponse(404, {
                msg: `Product with ID ${id} not found`,
                save_result: error
            });
        }
    }

    async remove(id: string): Promise<ApiResponse> {
        try {
            const product = await this.prisma.product.delete({
                where: { id },
            });

            return sendResponse(200, {
                msg: 'Product deleted successfully',
                data: product,
                save_result: null
            });
        } catch (error) {
            return sendResponse(404, {
                msg: `Product with ID ${id} not found`,
                save_result: error
            });
        }
    }
}
