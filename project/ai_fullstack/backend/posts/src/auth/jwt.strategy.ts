import { Injectable } from '@nestjs/common';
// 定义和集成 Passport 身份验证策略的基类，定义 JWT 策略的规则
import { PassportStrategy } from '@nestjs/passport';
// 身份验证策略是 jwt
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 如何从 HTTP 请求中提取 token。ExtractJwt.fromAuthHeaderAsBearerToken() 表示从 Authorization: Bearer <token> 头中提取。
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 用于验证 JWT 签名的密钥。必须和签发 token 时用的密钥一致（通常从环境变量读取，如 .env 文件）。
            secretOrKey: process.env.TOKEN_SECRET || "",
            // 是否忽略 token 的过期时间。false 表示严格检查过期（推荐）。
            ignoreExpiration: false
        })
    }

    // 当 JWT 通过签名和过期验证后，Passport 会自动调用这个方法。
    // payload：就是 JWT 的 payload 部分（即你签发 token 时传入的数据，比如 { sub: '7', name: 'admin' }）
    // 返回的对象会自动挂到 req.user 上，后续控制器可通过 @Request() req 或 @User()（配合自定义装饰器）获取。
    async validate(payload) {
        console.log(payload);
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}