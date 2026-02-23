import { 
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
// nestjs 内置了 jwt 模块
// 需要安装的依赖：@nestjs/jwt
// @nestjs 插件式 性能比较好，企业级同时保持小巧
// 注入的方式注入到Auth模块
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // 构造函数，注入 PrismaService 和 JwtService
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const { name, password } = loginDto;
        // 先根据 name 查找用户
        const user = await this.prisma.user.findUnique({
            where: {
                name: name
            }
        })
        console.log(user);

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('用户名或密码错误'); //401
        }

        // 颁发 token
        // 开发模块化分离，业务专注于用户登录逻辑
        const tokens = await this.generateTokens(user.id.toString(), user.name);

        return {
            ...tokens,
            user: {
                id: user.id.toString(),
                name: user.name
            }
        }
    }

    // OOP 面向对象编程，私有方法，复杂度剥离
    private async generateTokens(id: string, name: string) {
        // 关键用户信息 JSON Object
        // 马上用于签发token，生成token，先要准备用户对象payload
        const payload = {
            sub: id, // subject（主题） JWT中规定的关键字段
            name: name
        }
        // 并行生成两个 JWT
        // 基于用户 ID 和姓名，快速生成一对短期有效的访问令牌和长期有效的刷新令牌，用于实现安全的用户认证流程。
        const[at, rt] = await Promise.all([
            // this.jwtService.signAsync() 签名生成 JWT 字符串 
            // 访问令牌 Access Token (AT)：有效期 15 分钟（"15m"），用于常规 API 请求的身份验证。
            this.jwtService.signAsync(payload,{
                expiresIn: "1m",
                secret: process.env.TOKEN_SECRET
            }),
            // 刷新令牌 Refresh Token (RT)：有效期 7 天（"7d"），用于在 AT 过期后换取新的 AT，避免频繁登录。
            this.jwtService.signAsync(payload,{
                expiresIn: "7d",
                secret: process.env.TOKEN_SECRET
            }),
        ])
        return { accessToken: at, refreshToken: rt };
    }

    async refresh(refreshToken: string) {
        try {
            // 验证刷新令牌的有效性
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.TOKEN_SECRET
            });
            console.log(payload);
            if(payload) {
                return this.generateTokens(payload.sub, payload.name);
            }
        } catch (err) {
            throw new UnauthorizedException('刷新令牌无效');
        }
    } 
}