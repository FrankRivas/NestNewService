import { Controller, Get, Query } from '@nestjs/common';
import { GuardiaNewsService } from './guardianews.service';
import { NYTNewsService } from './nytnews.service';
import { Observable, merge } from 'rxjs';
import { MyNews } from './interfaces/news';
import { reduce } from 'rxjs/operators';

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
  ): Observable<MyNews[]> {
    let searchGuardian;
    let searchNYT;

    switch (searcher) {
      case 'nyt':
        searchNYT = this.nytnewsService.search(searchedWord);
        return searchNYT;
        break;
      case 'guardian':
        searchGuardian = this.newsService.search(searchedWord);
        return searchGuardian;
        break;
      default:
        searchGuardian = this.newsService.search(searchedWord);
        searchNYT = this.nytnewsService.search(searchedWord);
        const mergedNews = merge(searchNYT, searchGuardian).pipe(
          reduce((acum, val) => [...acum, ...val]),
        );
        return mergedNews;
    }
  }
}
