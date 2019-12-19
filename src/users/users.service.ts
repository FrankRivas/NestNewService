import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users';
import * as jwt from 'jsonwebtoken';
import { RegistredUsers } from './collections/users';
import { generateMessage } from 'src/utils/helpers';
import { Response } from 'express';

@Injectable()
export class UsersService {
  login(user: User, res: Response): string | undefined {
    const userDB = RegistredUsers.find(a => a.username === user.username);
    if (userDB) {
      if (userDB.password === user.password) {
        console.log('inside username');
        const token = jwt.sign(user, 'sigueTratandoPerra');
        console.log(token);
        return token;
      } else {
        console.log('error en pass');
        const msg = generateMessage(401);
        res.status(401).send(msg);
      }
    } else {
      console.log('no user');
      const msg = generateMessage(401);
      res.status(401).send(msg);
    }
  }
}
