import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { sendResponse, ApiResponse } from '../helpers/response';

@Injectable()
export class TableService {
    constructor(private prisma: PrismaService) { }

    async create(createTableDto: CreateTableDto): Promise<ApiResponse> {
        const table = await this.prisma.restaurantTable.create({
            data: createTableDto,
        });

        return sendResponse(201, {
            msg: 'Table created successfully',
            data: table,
            save_result: null,
        });
    }

    async findAll(query: PaginationQueryDto): Promise<ApiResponse> {
        const {
            current_page = 1,
            per_page = 10,
            keyword = '',
            sort_by = 'tableNumber',
            sort_dir = 'ASC',
            date_col = '',
            from_date = '',
            to_date = '',
        } = query;

        const skip = (current_page - 1) * per_page;

        // Build where clause
        const where: any = {};
        if (keyword) {
            where.OR = [
                { tableNumber: { contains: keyword } },
                { qrCode: { contains: keyword } },
            ];
        }

        // Build orderBy
        const orderBy: any = {};
        if (sort_by) {
            orderBy[sort_by] = sort_dir.toLowerCase();
        } else {
            orderBy.tableNumber = 'asc';
        }

        const [tables, total] = await Promise.all([
            this.prisma.restaurantTable.findMany({
                where,
                orderBy,
                skip,
                take: per_page,
            }),
            this.prisma.restaurantTable.count({ where }),
        ]);

        const total_pages = Math.ceil(total / per_page);

        return sendResponse(200, {
            msg: 'success',
            data: tables,
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
        const table = await this.prisma.restaurantTable.findUnique({
            where: { id },
            include: { orders: true },
        });

        if (!table) {
            return sendResponse(404, {
                msg: 'Table not found',
                save_result: null,
            });
        }

        return sendResponse(200, {
            msg: 'Table retrieved successfully',
            data: table,
            save_result: null,
        });
    }

    async update(id: string, updateTableDto: UpdateTableDto): Promise<ApiResponse> {
        try {
            const table = await this.prisma.restaurantTable.update({
                where: { id },
                data: updateTableDto,
            });

            return sendResponse(200, {
                msg: 'Table updated successfully',
                data: table,
                save_result: null,
            });
        } catch (error) {
            return sendResponse(404, {
                msg: `Table with ID ${id} not found`,
                save_result: error,
            });
        }
    }

    async remove(id: string): Promise<ApiResponse> {
        try {
            const table = await this.prisma.restaurantTable.delete({
                where: { id },
            });

            return sendResponse(200, {
                msg: 'Table deleted successfully',
                data: table,
                save_result: null,
            });
        } catch (error) {
            return sendResponse(404, {
                msg: `Table with ID ${id} not found`,
                save_result: error,
            });
        }
    }
}
