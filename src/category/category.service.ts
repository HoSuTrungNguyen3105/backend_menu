import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from '../table/dto/pagination-query.dto';
import { sendResponse, ApiResponse } from '../helpers/response';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ApiResponse> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return sendResponse(201, {
      msg: 'Category created successfully',
      data: category,
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
      where.name = { contains: keyword };
    }

    const orderBy: any = {};
    if (sort_by) {
      orderBy[sort_by] = sort_dir.toLowerCase();
    }

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where,
        orderBy,
        skip,
        take: per_page,
      }),
      this.prisma.category.count({ where }),
    ]);

    const total_pages = Math.ceil(total / per_page);

    return sendResponse(200, {
      msg: 'success',
      data: categories,
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
      save_result: null,
    });
  }

  async findOne(id: string): Promise<ApiResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return sendResponse(404, {
        msg: 'Category not found',
        save_result: null
      });
    }

    return sendResponse(200, {
      msg: 'Category retrieved successfully',
      data: category,
      save_result: null
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ApiResponse> {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return sendResponse(200, {
        msg: 'Category updated successfully',
        data: category,
        save_result: null
      });
    } catch (error) {
      return sendResponse(404, {
        msg: `Category with ID ${id} not found`,
        save_result: error
      });
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      const category = await this.prisma.category.delete({
        where: { id },
      });

      return sendResponse(200, {
        msg: 'Category deleted successfully',
        data: category,
        save_result: null
      });
    } catch (error) {
      return sendResponse(404, {
        msg: `Category with ID ${id} not found`,
        save_result: error
      });
    }
  }
}
