import { Injectable } from '@nestjs/common';
// nestjs 默认提供的 guard，自动解析 req Authorization 中的 access_token
import { AuthGuard } from '@nestjs/passport';
// req header Authorization
// 关注的是 access_token
// @nestjs/jwt verify
// service 看待 依赖注入
// 继承 AuthGuard 基类
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}