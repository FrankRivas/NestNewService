import {
  Controller,
  Get,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { GuardiaNewsService } from './guardianews.service';
import { NYTNewsService } from './nytnews.service';
import { Observable } from 'rxjs';
import { MyNews } from './interfaces/news';
import { AuthGuard } from 'src/users/users.guard';
import { mergeNews } from '../utils/helpers';

@Controller('news')
@UseGuards(AuthGuard)
export class NewsController {
  constructor(
    private readonly newsService: GuardiaNewsService,
    private readonly nytnewsService: NYTNewsService,
  ) {}
  @Get()
  search(
    @Query('searchedWord') searchedWord: string,
    @Query('searcher') searcher: string,
    @Query('page') page: string,
  ): Observable<MyNews[]> {
    let searchGuardian;
    let searchNYT;
    if (searcher) {
      switch (searcher) {
        case 'nyt':
          searchNYT = this.nytnewsService.search(searchedWord, page);
          return searchNYT;
        case 'guardian':
          searchGuardian = this.newsService.search(searchedWord, page);
          return searchGuardian;
        default:
          throw new NotFoundException('Invalid url');
      }
    } else {
      searchGuardian = this.newsService.search(searchedWord, page);
      searchNYT = this.nytnewsService.search(searchedWord, page);
      return mergeNews(searchNYT, searchGuardian);
    }
  }
}
