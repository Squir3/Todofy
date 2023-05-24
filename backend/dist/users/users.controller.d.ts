import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    index(): Promise<import("./schemas/user.schema").UserDocument[]>;
    find(id: string): Promise<import("./schemas/user.schema").UserDocument>;
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schema").UserDocument>;
    delete(id: string): Promise<import("./schemas/user.schema").UserDocument>;
}
