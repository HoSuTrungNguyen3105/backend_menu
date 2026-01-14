import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../table/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/permissions.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @RequirePermission('PRODUCT_CREATE')
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    @RequirePermission('PRODUCT_VIEW')
    findAll(@Query() query: PaginationQueryDto) {
        return this.productService.findAll(query);
    }

    @Get(':id')
    @RequirePermission('PRODUCT_VIEW')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    @RequirePermission('PRODUCT_EDIT')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    @RequirePermission('PRODUCT_DELETE')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
