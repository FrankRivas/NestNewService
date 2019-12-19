import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { generateMessage } from '../utils/helpers';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    if (req.query.searcher.includes('guardian')) {
      const bearerHeader = req.headers['authorization'];
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'sigueTratandoPerra', err => {
          if (err) {
            const msg = generateMessage(403);
            res.status(403).send(msg);
          } else {
            next();
          }
        });
      } else {
        const msg = generateMessage(403);
        res.status(403).send(msg);
      }
    } else {
      next();
    }
  }
}
