import { Module, HttpModule, MiddlewareConsumer } from '@nestjs/common';
import { NewsController } from './news.controller';
import { GuardiaNewsService } from './guardianews.service';
import { ConfigModule } from '@nestjs/config';
import { NYTNewsService } from './nytnews.service';
import { NewsMiddleware } from './news.middleware';
import { UsersMiddleware } from 'src/users/users.middleware';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [NewsController],
  providers: [GuardiaNewsService, NYTNewsService],
})
export class NewsModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(UsersMiddleware, NewsMiddleware).forRoutes('news');
  }
}
