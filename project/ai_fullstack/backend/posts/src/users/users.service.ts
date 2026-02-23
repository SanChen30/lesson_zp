import { 
    Injectable,
    BadRequestException // 错误处理
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // 创建用户到数据库
    async register(createUserDto: CreateUserDto) {
        const { name, password } = createUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: {
                name: name
            }
        })
        if(existingUser) {
            // 抛出异常
            // nest 企业级 捕获并返回给用户错误信息
            // 弱类型 单线程，出错可能灾难性
            throw new BadRequestException("用户名已存在")
        }
        // 密码加密
        // 10 是加密算法的强度
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword, hashedPassword.length);
        const user = await this.prisma.user.create({
            data: {
                name: name,
                password: hashedPassword
            },
            // select：控制返回字段
            select: {
                id: true,
                name: true
            }
        })

        return user;
    }


}