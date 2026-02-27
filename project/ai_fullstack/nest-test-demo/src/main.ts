import { NestFactory } from '@nestjs/core';
// 模块化
import { AppModule } from './app.module';
import { config } from 'dotenv';

// 加载 .env 文件
config();

async function bootstrap() {
  // server app
  // 工厂模式，NestFactory nest 工厂
  // 根模型
  const app = await NestFactory.create(AppModule);
  // 3000 端口, node 进程对象 process.env.PORT 环境变量
  // 空值合并运算符 ?? ，如果 process.env.PORT 为 null 或 undefined，则使用 3000 端口
  // 等价于 process.env.PORT ? process.env.PORT : 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();