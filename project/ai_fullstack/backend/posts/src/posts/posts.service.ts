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
                skip, // 从哪开始拿
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
                    },
                    files: {
                        where: {
                            mimetype: { 
                                startsWith: "image/"
                            }
                        },
                        select: {
                            filename: true,
                        }
                    }
                }
            })
        ])

        // 查询数据，再整备一下
        const data = posts.map(post => ({
            id: post.id,
            title: post.title,
            // 截取 content
            brief: post.content ? post.content.substring(0, 100) : '',
            user: {
                id: post.user?.id,
                name: post.user?.name,
                avatar: post.user?.avatars[0]?.filename ? `http://localhost:3000/uploads/avatar/resized/${post.user.avatars[0].filename}-small.jpg` : '',
            },
            tags: post.tags.map(t => t.tag.name),
            totalLikes: post._count.likes,
            totalComments: post._count.comments,
            thumbnail: post.files[0]?.filename ? `http://localhost:3000/uploads/resized/${post.files[0].filename}-thumbnail.jpg` : '',
        }))
        return {
            items: data,
            total: total
        }
    }
}