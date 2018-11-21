
export class CreateUserResponse {
    user: any;
    errors: [];

    public constructor(user = null, errors = null) {
        this.user = user;
        this.errors = errors;
    }
}