export class EquipesResponse {
    equipes: [];
    errors: [];

    public constructor(equipes = null, errors = null) {
        this.equipes = equipes;
        this.errors = errors;
    }
}