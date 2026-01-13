import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { generateOtp, hashPassword } from "src/helpers/hook";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        // private jwtService: JwtService,
        // private mailer: MailService,
    ) { }

    async register(dto: RegisterDto) {
        try {
            const existingUser = await this.prisma.staff.findUnique({
                where: { email: dto.email },
            });

            if (existingUser) {
                return { resultCode: '99', resultMessage: 'Email already registered' };
            }

            const { otp, hashedOtp, expireAt } = await generateOtp(5);

            const user = await this.prisma.staff.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: await hashPassword(dto.password), // hash trước khi lưu
                    phone: dto.phone,
                    otpCode: hashedOtp,
                    otpExpire: expireAt,
                },
            });

            //try {
            //             await this.mailer.sendMail(
            //                 dto.email,
            //                 'Xác nhận tài khoản',
            //                 `Xin chào ${dto.name ?? 'bạn'}, mã xác nhận của bạn là ${otp}`,
            //                 `<p>Xin chào <b>${dto.name ?? 'bạn'}</b>,</p>
            //    <p>Mã xác nhận của bạn là: <b>${otp}</b></p>
            //    <p>Mã có hiệu lực trong 5 phút.</p>`,
            //             );
            // } catch (err) {
            //     console.error('Gửi email thất bại:', err.message);
            // }

            return {
                resultCode: '00',
                resultMessage: 'Đăng ký thành công!',
                data: {
                    email: user.email,
                    userId: user.id,
                },
            };
        } catch (error) {
            console.error('err', error);
        }
    }
}