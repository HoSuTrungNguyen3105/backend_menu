import { Decimal } from "@prisma/client/runtime/library";
import * as bcrypt from 'bcrypt';

export function dateToDecimal(date: Date): Decimal {
    return new Decimal(date.getTime());
}

export async function generateOtp(expireMinutes: number = 5) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expireAt = dateToDecimal(
        new Date(Date.now() + expireMinutes * 60 * 1000),
    );

    return { otp, hashedOtp, expireAt };
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}