import { Controller, Get, Query, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostQueryDto } from './dto/post-query.dto';
// 放在 auth 模块
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('posts')

export class PostsController {
    constructor(private readonly postsService: PostsService) {

    }

    @Get()
    async getPosts(@Query() query: PostQueryDto) {
        console.log(query);
        return this.postsService.findAll(query);
    }

    // 发布文章的处理函数
    // RESTful
    // 需要鉴权
    @Post()
    @UseGuards(JwtAuthGuard) // 路由守卫
    createPost(
        @Body('title') title: string,
        @Body('content') content:string,
        @Req() req
    ) {
        console.log(req.user);
        const { user } = req;
        return this.postsService.createPost({
            title,
            content,
            userId: user.id
        })
    }
}