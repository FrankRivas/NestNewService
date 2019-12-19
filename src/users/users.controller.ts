import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/users';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  login(@Body() user: User): string {
    return this.userService.login(user);
  }
  @Get()
  getUser(): void {
    console.log('This is a test Route');
  }
}
