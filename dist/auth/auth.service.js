var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        if (!dto.email || !dto.password) {
            throw new BadRequestException('Email and password are required');
        }
        const normalizedEmail = dto.email.trim().toLowerCase();
        const existing = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (existing) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: normalizedEmail,
                password: hashedPassword,
                name: dto.name?.trim() || null,
            },
        });
        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });
        return {
            message: 'Signup successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }
    async login(dto) {
        if (!dto.email || !dto.password) {
            throw new BadRequestException('Email and password are required');
        }
        const normalizedEmail = dto.email.trim().toLowerCase();
        const user = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });
        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map