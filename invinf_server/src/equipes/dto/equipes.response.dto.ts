export class EquipesResponse {
    equipes: any;
    errors: [];

    public constructor(equipes = null, errors = null) {
        this.equipes = equipes;
        this.errors = errors;
    }
}