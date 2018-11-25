import { User } from "src/users/models/user.model";

export class LoginResponse {
    token: string;
    user: User
}