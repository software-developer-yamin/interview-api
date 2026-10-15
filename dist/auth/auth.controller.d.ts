import { AuthService, type SignupDto, type LoginDto } from './auth.service.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getMe(req: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        createdAt: Date;
    }>;
}
