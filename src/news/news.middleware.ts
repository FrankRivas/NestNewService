import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { generateMessage, codes } from '../utils/helpers';

@Injectable()
export class NewsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    if (req.query.page > 200) {
      const msg = generateMessage(codes['BAD REQUEST']);
      throw new BadRequestException(msg);
    }
    next();
  }
}
