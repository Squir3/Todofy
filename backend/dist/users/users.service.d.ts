import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findLoggedUser(email: string): Promise<UserDocument>;
    findOne(id: string): Promise<UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument>;
    delete(id: string): Promise<UserDocument>;
    findByUsername(username: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
}
