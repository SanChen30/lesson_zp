import{ Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

// RESTful 把一切看作“资源”（Resource），并通过标准的 HTTP 方法对这些资源进行操作。
// RESTful 是一种以“资源”为中心、利用标准 HTTP 方法进行操作、无状态、可缓存的 Web API 设计风格。
// HTTP 方法 + URL（统一资源标识符）
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK) // 指定状态码为200
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body('refreshToken') refreshToken: string) {
        return this.authService.refresh(refreshToken);
    }
}