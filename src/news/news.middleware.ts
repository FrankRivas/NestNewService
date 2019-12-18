import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { generateMessage } from './utils/helpers';

@Injectable()
export class NewsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    if (req.query.page > 200) {
      const msg = generateMessage(400);
      res.status(400).send(msg);
      return;
    }
    next();
  }
}
