import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
        PassportModule,
        // MailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PermissionsGuard],
    exports: [PermissionsGuard],
})
export class AuthModule { }
