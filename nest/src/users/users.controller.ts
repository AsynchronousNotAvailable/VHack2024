import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get(':id')
  getUserDetails(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }


  @Patch('update/:userId')
  updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

}
