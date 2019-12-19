import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './interfaces/users';
import * as jwt from 'jsonwebtoken';
import { RegistredUsers } from './collections/users';
import { generateMessage, codes } from 'src/utils/helpers';
import { ConfigService } from '@nestjs/config';
import { Secret } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}
  login(user: User): string {
    const secretKey = this.configService.get<Secret>('SECRET_CODE_JWT');
    const userDB = RegistredUsers.find(a => a.username === user.username);
    if (userDB) {
      if (userDB.password === user.password) {
        const token = jwt.sign(user, secretKey ? secretKey : 'secretKey', {
          expiresIn: '1m',
        });
        return token;
      } else {
        // If invalid password
        const msg = generateMessage(codes.UNAUTHORIZED);
        throw new UnauthorizedException(msg);
      }
    } else {
      // If user does not exist
      const msg = generateMessage(codes['BAD REQUEST']);
      throw new BadRequestException(msg);
    }
  }
}
