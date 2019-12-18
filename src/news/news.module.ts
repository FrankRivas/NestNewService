import { Module, HttpModule } from '@nestjs/common';
import { NewsController } from './news.controller';
import { GuardiaNewsService } from './guardianews.service';
import { ConfigModule } from '@nestjs/config';
import { NYTNewsService } from './nytnews.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [NewsController],
  providers: [GuardiaNewsService, NYTNewsService],
})
export class NewsModule {}
