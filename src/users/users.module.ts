import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersMiddleware } from './users.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(UsersMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.GET,
    });
  }
}
