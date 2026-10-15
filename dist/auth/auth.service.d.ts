import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
export interface SignupDto {
    email: string;
    password: string;
    name?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            createdAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            createdAt: Date;
        };
    }>;
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        createdAt: Date;
    }>;
}
