
export class LoginResponse {
    token: string;
    userName: string;
    firstName: string;
    errors: [];

    public constructor(token = null, userName = null, firstName = null, errors = null) {
        this.token = token;
        this.userName = userName;
        this.firstName = firstName;
        this.errors = errors;
    }
}