import { Injectable } from '@nestjs/common';
import { User, UserModel } from './models/user.model';
import { CreateUserResponse } from './dtos/createUserResponse.dto';

@Injectable()
export class UsersService {
    async create(createUser: User): Promise<CreateUserResponse> {
        try {
            const userModel = new UserModel(createUser);
            await userModel.save();
            return new CreateUserResponse(userModel);
        } catch (errors) {
            return new CreateUserResponse(null, errors.errors);
        }
    }

    async findOne(filter: {}): Promise<CreateUserResponse> {
        try {
            const user = await UserModel.findOne(filter);
            return new CreateUserResponse(user);
        } catch (errors) {
            return new CreateUserResponse(null, errors.errors);
        }
    }
}
