
export class LoginResponse {
    user: {
        token: string;
        userName: string;
        firstName: string;
    }
    errors: [];

    public constructor(token = null, userName = null, firstName = null, errors = null) {
        this.user = {
            token: token,
            userName: userName,
            firstName: firstName
        }
        this.errors = errors;
    }
}