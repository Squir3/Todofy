import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // Req,
  // UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
// import { AccessTokenGuard } from 'src/auth/guards/accessTokenGuard';
// import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Returns all users
   * @return {User} - users data
   */
  @Get()
  async index() {
    return await this.usersService.findAll();
  }

  /**
   * Returns specified user's data
   * @returns {User} - user data
   * @param id {string} - ID of user
   */

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  /**
   * Create user
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Update user
   */

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete user
   */

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
