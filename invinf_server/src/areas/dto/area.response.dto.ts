export class AreaResponse {
    area: any;
    errors: [];

    public constructor(area = null, errors = null) {
        this.area = area;
        this.errors = errors;
    }
}