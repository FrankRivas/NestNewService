import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/users';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  login(@Body() user: User, @Res() res: Response): void {
    const token = this.userService.login(user, res);
    res.send(token);
  }
  @Get()
  getUser(): void {
    console.log('This is a test Route');
  }
}
