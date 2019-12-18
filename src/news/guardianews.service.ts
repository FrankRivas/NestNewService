import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuardianNews, MyNews } from './interfaces/news';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GuardiaNewsService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  transform(news: GuardianNews): MyNews {
    const newArt = {
      webPublicationDate: new Date(news.webPublicationDate),
      webTitle: news.webTitle,
      webUrl: news.webUrl,
      author: news.fields.byline,
    };
    return newArt;
  }

  search(searchedWord: string, page = '1'): Observable<MyNews[]> {
    const key = this.configService.get<string>('GUARDIAN_KEY');
    const baseUrl = this.configService.get<string>('GUARDIAN_URL_BASE');
    const filters = this.configService.get<string>('GUARDIAN_URL_FILTERS');
    return this.http
      .get(`${baseUrl}api-key=${key}&q=${searchedWord}${filters}&page=${page}`)
      .pipe(
        map(response => response.data.response.results.map(this.transform)),
      );
  }
}
