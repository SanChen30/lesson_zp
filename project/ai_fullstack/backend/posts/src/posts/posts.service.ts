import { Injectable } from '@nestjs/common';
import { PostQueryDto } from './dto/post-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {} // 注入 PrismaService

    async findAll(query: PostQueryDto) {
        const { page, limit } = query;
        // 分页的游标
        const skip = ((page || 1) - 1) * (limit ||10);
        const [total, posts] = await Promise.all([
            this.prisma.post.count(),
            this.prisma.post.findMany({
                skip, // 跳过几条，从哪开始拿
                take: limit || 10,  // 拿多少个
                orderBy: { id: 'desc'},
                include: { // 关系型的数据
                    user: {
                        select: { // 需要user表的哪些记录
                            id: true,
                            name: true,
                            avatars: {
                                take: 1,
                                orderBy: { id: 'desc' },
                                select: {
                                    filename: true
                                }
                            }
                        }
                    },
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true
                        }
                    }
                }
            })
        ])
        return {
            items: posts,
            total: total
        }
    }
}