import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users';
import * as jwt from 'jsonwebtoken';
import { RegistredUsers } from './collections/users';
import { generateMessage, codes } from 'src/utils/helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Secret } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}
  login(user: User, res: Response): string | undefined {
    const secretKey = this.configService.get<Secret>('SECRET_CODE_JWT');
    const userDB = RegistredUsers.find(a => a.username === user.username);
    if (userDB) {
      if (userDB.password === user.password) {
        const token = jwt.sign(user, secretKey ? secretKey : 'secretKey', {
          expiresIn: '1m',
        });
        return token;
      } else {
        const msg = generateMessage(codes.UNAUTHORIZED);
        res.status(codes.UNAUTHORIZED).send(msg);
      }
    } else {
      const msg = generateMessage(codes.UNAUTHORIZED);
      res.status(codes.UNAUTHORIZED).send(msg);
    }
  }
}
