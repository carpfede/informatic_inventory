export class ComponentDataResponse {
    types: [];
    errors: [];

    public constructor(types = null, errors = null) {
        this.types = types;
        this.errors = errors;
    }
}