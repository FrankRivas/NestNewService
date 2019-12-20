import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { ValidationUserPipe } from './users.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @UsePipes(ValidationUserPipe)
  login(@Body() user: UserDto): {} {
    const accessToken = this.userService.login(user);
    return {
      accessToken,
    };
  }
}
