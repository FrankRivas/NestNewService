import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Secret } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const secretKey = this.configService.get<Secret>('SECRET_CODE_JWT');
    if (request.query.searcher === 'guardian' || !request.query.searcher) {
      const bearerHeader = request.headers.authorization;
      if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        try {
          jwt.verify(token, secretKey ? secretKey : 'secretKey');
          return true;
        } catch {
          // if token is invalid
          throw new UnauthorizedException('Invalid token');
        }
      } else {
        // if token is missing
        throw new UnauthorizedException('Token is required');
      }
    } else {
      return true;
    }
  }
}
