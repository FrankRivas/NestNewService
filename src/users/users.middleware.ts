import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
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
    if (req.query.searcher === 'guardian' || !req.query.searcher) {
      const bearerHeader = req.headers['authorization'];
      if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, secretKey ? secretKey : 'secretKey', err => {
          if (err) {
            // if token is invalid
            const msg = generateMessage(codes.UNAUTHORIZED);
            throw new UnauthorizedException(msg);
          } else {
            next();
          }
        });
      } else {
        // if token is missing
        const msg = generateMessage(codes.UNAUTHORIZED);
        throw new UnauthorizedException(msg);
      }
    } else {
      next();
    }
  }
}
