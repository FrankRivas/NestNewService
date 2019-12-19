import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { GuardiaNewsService } from './guardianews.service';
import { NYTNewsService } from './nytnews.service';
import { Observable, merge } from 'rxjs';
import { MyNews } from './interfaces/news';
import { reduce } from 'rxjs/operators';
import { generateMessage, codes } from 'src/utils/helpers';

@Controller('news')
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
          const msg = generateMessage(codes['NOT FOUND']);
          throw new NotFoundException(msg);
      }
    } else {
      searchGuardian = this.newsService.search(searchedWord, page);
      searchNYT = this.nytnewsService.search(searchedWord, page);
      const mergedNews = merge(searchNYT, searchGuardian).pipe(
        reduce((acum, val) =>
          [...acum, ...val].sort(function(a, b) {
            return a.webPublicationDate > b.webPublicationDate ? -1 : 1;
          }),
        ),
      );
      return mergedNews;
    }
  }
}
