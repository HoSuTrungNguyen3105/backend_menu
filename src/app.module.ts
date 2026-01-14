import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TableModule } from './table/table.module';
import { ProductModule } from './product/product.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [PrismaModule, CategoryModule, AuthModule, TableModule, ProductModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
