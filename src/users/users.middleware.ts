import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { generateMessage, codes } from '../utils/helpers';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Secret } from 'jsonwebtoken';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: Function): void {
    const secretKey = this.configService.get<Secret>('SECRET_CODE_JWT');
    if (req.query.searcher.includes('guardian')) {
      const bearerHeader = req.headers['authorization'];
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, secretKey ? secretKey : 'secretKey', err => {
          if (err) {
            const msg = generateMessage(codes.FORBIDDEN);
            res.status(codes.FORBIDDEN).send(msg);
          } else {
            next();
          }
        });
      } else {
        const msg = generateMessage(codes.FORBIDDEN);
        res.status(codes.FORBIDDEN).send(msg);
      }
    } else {
      next();
    }
  }
}
