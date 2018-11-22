export class LoginResponse {
    token: any;
    errors: [];

    public constructor(token = null, errors = null) {
        this.token = token;
        this.errors = errors;
    }
}