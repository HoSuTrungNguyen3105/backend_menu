import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { sendResponse, ApiResponse } from '../helpers/response';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ApiResponse> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return sendResponse(201, {
      message: 'Category created successfully',
      data: category,
    });
  }

  async findAll(): Promise<ApiResponse> {
    const categories = await this.prisma.category.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return sendResponse(200, {
      message: 'Categories retrieved successfully',
      data: categories,
    });
  }

  async findOne(id: string): Promise<ApiResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return sendResponse(404, {
        message: 'Category not found',
      });
    }

    return sendResponse(200, {
      message: 'Category retrieved successfully',
      data: category,
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ApiResponse> {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return sendResponse(200, {
        message: 'Category updated successfully',
        data: category,
      });
    } catch (error) {
      return sendResponse(404, {
        message: `Category with ID ${id} not found`,
      });
    }
  }

  async remove(id: string): Promise<ApiResponse> {
    try {
      const category = await this.prisma.category.delete({
        where: { id },
      });

      return sendResponse(200, {
        message: 'Category deleted successfully',
        data: category,
      });
    } catch (error) {
      return sendResponse(404, {
        message: `Category with ID ${id} not found`,
      });
    }
  }
}
