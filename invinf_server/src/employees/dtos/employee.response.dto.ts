export class EmployeeResponse {
    employee: any;
    errors: [];

    public constructor(employee = null, errors = null) {
        this.employee = employee;
        this.errors = errors;
    }
}