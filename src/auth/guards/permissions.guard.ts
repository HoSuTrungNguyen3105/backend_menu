import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermission) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user || (!user.role && !user.permissions)) {
            return false;
        }

        // Role.ADMIN has all permissions by default
        if (user.role === Role.ADMIN) {
            return true;
        }

        // 1. Check individual staff permissions first (direct assignment)
        let staffPermissions: string[] = [];
        if (Array.isArray(user.permissions)) {
            staffPermissions = user.permissions.map((p: any) => {
                if (typeof p === 'string') return p;
                if (typeof p === 'object' && p !== null && p.key) return p.key;
                return '';
            }).filter(Boolean);
        }

        if (staffPermissions.includes(requiredPermission) || staffPermissions.includes('ALL_ACTION')) {
            return true;
        }

        // 2. Then check role permissions
        if (user.role) {
            const rolePermission = await this.prisma.rolePermission.findUnique({
                where: { role: user.role },
            });

            if (rolePermission && rolePermission.permissions) {
                const rolePermissions = rolePermission.permissions as string[];
                if (rolePermissions.includes(requiredPermission) || rolePermissions.includes('ALL_ACTION')) {
                    return true;
                }
            }
        }

        throw new ForbiddenException('You do not have permission to perform this action');
    }
}
