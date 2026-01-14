import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/permissions.decorator';

@Controller('tables')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @Post()
    @RequirePermission('TABLE_CREATE')
    create(@Body() createTableDto: CreateTableDto) {
        return this.tableService.create(createTableDto);
    }

    @Get()
    @RequirePermission('TABLE_VIEW')
    findAll(@Query() query: PaginationQueryDto) {
        return this.tableService.findAll(query);
    }

    @Get(':id')
    @RequirePermission('TABLE_VIEW')
    findOne(@Param('id') id: string) {
        return this.tableService.findOne(id);
    }

    @Post('update/:id')
    @RequirePermission('TABLE_EDIT')
    update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
        return this.tableService.update(id, updateTableDto);
    }

    @Post('delete/:id')
    @RequirePermission('TABLE_DELETE')
    remove(@Param('id') id: string) {
        return this.tableService.remove(id);
    }
}
