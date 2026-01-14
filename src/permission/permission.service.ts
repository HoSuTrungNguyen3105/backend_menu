import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PaginationQueryDto } from '../table/dto/pagination-query.dto';
import { sendResponse, ApiResponse } from '../helpers/response';
import { dateToDecimal } from '../helpers/hook';
import { SetRolePermissionsDto } from './dto/set-role-permissions.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PermissionService {
    constructor(private prisma: PrismaService) { }

    async create(createPermissionDto: CreatePermissionDto): Promise<ApiResponse> {
        try {
            const now = dateToDecimal(new Date());
            const permission = await this.prisma.permissionDefinition.create({
                data: {
                    ...createPermissionDto,
                    createdAt: now,
                    updatedAt: now,
                },
            });

            return sendResponse(201, {
                msg: 'Permission created successfully',
                data: permission,
                save_result: null,
            });
        } catch (error) {
            return sendResponse(400, {
                msg: 'Failed to create permission',
                save_result: error,
            });
        }
    }

    async findAll(query: PaginationQueryDto): Promise<ApiResponse> {
        const {
            current_page = 1,
            per_page = 10,
            keyword = '',
            sort_by = 'key',
            sort_dir = 'ASC',
            date_col = '',
            from_date = '',
            to_date = '',
        } = query;

        const skip = (current_page - 1) * per_page;

        const where: any = {};
        if (keyword) {
            where.OR = [
                { key: { contains: keyword } },
                { category: { contains: keyword } },
                { description: { contains: keyword } },
            ];
        }

        const orderBy: any = {};
        if (sort_by) {
            const dir = sort_dir.toLowerCase() as 'asc' | 'desc';
            orderBy[sort_by] = dir;
        }

        const [permissions, total] = await Promise.all([
            this.prisma.permissionDefinition.findMany({
                where,
                orderBy,
                skip,
                take: per_page,
            }),
            this.prisma.permissionDefinition.count({ where }),
        ]);

        const total_pages = Math.ceil(total / per_page);

        return sendResponse(200, {
            msg: 'success',
            data: permissions,
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
        const permission = await this.prisma.permissionDefinition.findUnique({
            where: { id },
        });

        if (!permission) {
            return sendResponse(404, {
                msg: 'Permission not found',
                save_result: null,
            });
        }

        return sendResponse(200, {
            msg: 'Permission retrieved successfully',
            data: permission,
            save_result: null,
        });
    }

    async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<ApiResponse> {
        try {
            const now = dateToDecimal(new Date());
            const permission = await this.prisma.permissionDefinition.update({
                where: { id },
                data: {
                    ...updatePermissionDto,
                    updatedAt: now,
                },
            });

            return sendResponse(200, {
                msg: 'Permission updated successfully',
                data: permission,
                save_result: null,
            });
        } catch (error) {
            return sendResponse(404, {
                msg: `Permission with ID ${id} not found`,
                save_result: error,
            });
        }
    }

    async remove(id: string): Promise<ApiResponse> {
        try {
            const permission = await this.prisma.permissionDefinition.delete({
                where: { id },
            });

            return sendResponse(200, {
                msg: 'Permission deleted successfully',
                data: permission,
                save_result: null,
            });
        } catch (error) {
            return sendResponse(404, {
                msg: `Permission with ID ${id} not found`,
                save_result: error,
            });
        }
    }

    async findAllPermissonToSelect(): Promise<ApiResponse> {
        const permissions = await this.prisma.permissionDefinition.findMany({
            where: { isActive: true }
        });

        const mappedPermissions = permissions.map(p => ({
            label: p.key,
            value: p.id,
        }));

        return sendResponse(200, {
            msg: 'success',
            data: mappedPermissions,
            save_result: null,
        });
    }

    async getRolePermissions(role: Role): Promise<ApiResponse> {
        const rolePermission = await this.prisma.rolePermission.findUnique({
            where: { role },
        });

        return sendResponse(200, {
            msg: 'Role permissions retrieved',
            data: rolePermission ? rolePermission.permissions : [],
            save_result: null,
        });
    }

    async setRolePermissions(role: Role, dto: SetRolePermissionsDto): Promise<ApiResponse> {
        const now = dateToDecimal(new Date());
        const rolePermission = await this.prisma.rolePermission.upsert({
            where: { role },
            update: {
                permissions: dto.permissions,
                updatedAt: now,
            },
            create: {
                role,
                permissions: dto.permissions,
                createdAt: now,
                updatedAt: now,
            },
        });

        return sendResponse(200, {
            msg: `Permissions updated for role ${role}`,
            data: rolePermission,
            save_result: null,
        });
    }
}
