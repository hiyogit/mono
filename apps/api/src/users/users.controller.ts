import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { API_ROUTES } from '@mono/consts';
import type { User } from '@mono/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller(API_ROUTES.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto): User {
    return this.usersService.create(dto);
  }
}
