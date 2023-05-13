import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  /**
   * Injecting dependencies and creating mongoose model
   * @param userModel {Model<UserDocument>}
   */

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Creating new user
   * @param createUserDto {CreateUserDto}
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await new this.userModel(createUserDto);
    return createdUser.save();
  }

  /**
   * Returns all users
   */

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  /**
   * Returns logged user
   * @param email {String}
   */
  async findLoggedUser(email: string): Promise<UserDocument> {
    return this.userModel
      .findOne({ email })
      .select({ refreshedToken: 0, password: 0, _v: 0 })
      .exec();
  }

  /**
   * Returns specific user
   * @param id
   */

  async findOne(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  /**
   * Allows user to update his details
   * @param id
   * @param updateUserDto
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  /**
   * Delete user
   * @param id
   */

  async delete(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  /**
   * Searches for specified user by username
   * @param username
   */
  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  /**
   * Searches for specified user by email
   * @param email
   */

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
}
