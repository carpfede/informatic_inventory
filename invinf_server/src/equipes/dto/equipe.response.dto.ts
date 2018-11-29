export class EquipeResponse {
    equipe: {};
    errors: [];

    public constructor(equipe = null, errors = null) {
        this.equipe = equipe;
        this.errors = errors;
    }
}