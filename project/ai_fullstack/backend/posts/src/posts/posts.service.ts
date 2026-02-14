import { Injectable } from '@nestjs/common';
import { PostQueryDto } from './dto/post-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {} // 注入 PrismaService

    async findAll(query: PostQueryDto) {
        const total = await this.prisma.post.count(); // 统计总记录数
        console.log(total,'=======');
        return {
            items: [] 
        }
    }
}