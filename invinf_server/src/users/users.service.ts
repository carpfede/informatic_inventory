import { Injectable } from '@nestjs/common';
import { User, UserModel } from './models/user.model';
import { CreateUserResponse } from './dtos/createUserResponse';

@Injectable()
export class UsersService {
    async create(createUser: User): Promise<CreateUserResponse> {
        try {
            const createdUser = new UserModel(createUser);
            await createdUser.save();
            return new CreateUserResponse(createdUser);
        } catch (errors) {
            return new CreateUserResponse(null, errors.errors);
        }
    }
}
