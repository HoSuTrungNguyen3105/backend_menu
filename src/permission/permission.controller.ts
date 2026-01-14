import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PaginationQueryDto } from '../table/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
// import { RequirePermission } from '../auth/decorators/permissions.decorator';
import { SetRolePermissionsDto } from './dto/set-role-permissions.dto';
import { Role } from '@prisma/client';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    // @RequirePermission('PERMISSION_CREATE')
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }

    @Get()
    // @RequirePermission('PERMISSION_VIEW')
    findAll(@Query() query: PaginationQueryDto) {
        return this.permissionService.findAll(query);
    }

    @Get('select-list')
    // @RequirePermission('PERMISSION_VIEW')
    findAllPermissonToSelect() {
        return this.permissionService.findAllPermissonToSelect();
    }

    @Get(':id')
    // @RequirePermission('PERMISSION_VIEW')
    findOne(@Param('id') id: string) {
        return this.permissionService.findOne(id);
    }

    @Post('update/:id')
    // @RequirePermission('PERMISSION_EDIT')
    update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionService.update(id, updatePermissionDto);
    }

    @Post('delete/:id')
    // @RequirePermission('PERMISSION_DELETE')
    remove(@Param('id') id: string) {
        return this.permissionService.remove(id);
    }

    @Get('roles/:role')
    // @RequirePermission('PERMISSION_VIEW')
    getRolePermissions(@Param('role') role: Role) {
        return this.permissionService.getRolePermissions(role);
    }

    @Post('roles/:role')
    // @RequirePermission('PERMISSION_EDIT')
    setRolePermissions(@Param('role') role: Role, @Body() dto: SetRolePermissionsDto) {
        return this.permissionService.setRolePermissions(role, dto);
    }
}
