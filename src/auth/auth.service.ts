import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { generateOtp, hashPassword, comparePassword } from "src/helpers/hook";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { sendResponse, ApiResponse } from "../helpers/response";
import { UpdateStaffRoleDto } from "./dto/update-staff-role.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        // private mailer: MailService,
    ) { }

    async register(dto: RegisterDto): Promise<ApiResponse> {
        try {
            const existingUser = await this.prisma.staff.findUnique({
                where: { email: dto.email },
            });

            if (existingUser) {
                return sendResponse(400, {
                    msg: 'Email already registered',
                    save_result: null
                });
            }

            const { hashedOtp, expireAt } = await generateOtp(5);

            const user = await this.prisma.staff.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: await hashPassword(dto.password),
                    phone: dto.phone,
                    otpCode: hashedOtp,
                    otpExpire: expireAt,
                },
            });

            return sendResponse(201, {
                msg: 'Đăng ký thành công!',
                data: {
                    email: user.email,
                    userId: user.id,
                },
                save_result: null
            });
        } catch (error) {
            console.error('err', error);
            return sendResponse(500, {
                msg: 'An error occurred during registration',
                save_result: error
            });
        }
    }

    async login(dto: LoginDto): Promise<ApiResponse> {
        try {
            const user = await this.prisma.staff.findUnique({
                where: { email: dto.email },
            });

            if (!user) {
                return sendResponse(401, {
                    msg: 'Invalid credentials',
                    save_result: null
                });
            }

            const isPasswordValid = await comparePassword(dto.password, user.password);

            if (!isPasswordValid) {
                return sendResponse(401, {
                    msg: 'Invalid credentials',
                    save_result: null
                });
            }

            const payload = { email: user.email, sub: user.id };
            const accessToken = this.jwtService.sign(payload);

            return sendResponse(200, {
                msg: 'Login successful',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    },
                    accessToken,
                },
                save_result: null
            });
        } catch (error) {
            console.error('Login error:', error);
            return sendResponse(500, {
                msg: 'An error occurred during login',
                save_result: error
            });
        }
    }

    async updateStaffRole(id: number, dto: UpdateStaffRoleDto): Promise<ApiResponse> {
        try {
            const data: any = {};
            if (dto.role) data.role = dto.role;

            if (dto.permissions && dto.permissions.length > 0) {
                // Fetch details for each permission ID provided
                const permissionDefinitions = await this.prisma.permissionDefinition.findMany({
                    where: {
                        id: { in: dto.permissions }
                    },
                    select: {
                        id: true,
                        key: true,
                        description: true
                    }
                });
                data.permissions = permissionDefinitions;
            } else if (dto.permissions) {
                data.permissions = [];
            }

            const staff = await this.prisma.staff.update({
                where: { id },
                data,
            });

            return sendResponse(200, {
                msg: `Staff member updated successfully`,
                data: staff,
                save_result: null,
            });
        } catch (error) {
            console.error('Update staff error:', error);
            return sendResponse(404, {
                msg: 'Staff member not found or error occurred',
                save_result: error,
            });
        }
    }
}
