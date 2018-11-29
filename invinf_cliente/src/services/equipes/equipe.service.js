import { authHeader } from '../../helper';

class equipeService {
    axios;
    lodash;
    baseUrl;
    token;

    constructor(axios, baseUrl, lodash) {
        this.axios = axios;
        this.lodash = lodash;
        this.baseUrl = baseUrl;
        this.token = authHeader();
    }

    // GET
    async findAll() {
        const resAreas = await this.axios.get(`${this.baseUrl}areas/findAll`, { headers: this.token });
        const areas = resAreas.data.area;
        const response = await this.axios.get(`${this.baseUrl}equipes/findAll`, { headers: this.token });
        this.lodash.forEach(response.data.equipes, e => {
            e.areaName = this.lodash.find(areas, a => a._id === e.area).name
        });
        console.log(response);
        return response;
    }

    async find(filter) {
        const response = await this.axios.get(`${this.baseUrl}equipes/find`, { headers: this.token, params: filter });
        return response;
    }

    async getLastCode() {
        const response = await this.axios.get(`${this.baseUrl}equipes/lastCode`, { headers: this.token });
        return response;
    }

    async getTypes() {
        const response = await this.axios.get(`${this.baseUrl}equipes/types`, { headers: this.token });
        return response;
    }

    async getProviders() {
        const response = await this.axios.get(`${this.baseUrl}equipes/providers`, { headers: this.token });
        return response;
    }
    //POST
    async addEquipe(equipe) {
        const response = await this.axios.post(`${this.baseUrl}equipes/create`, equipe, { headers: this.token });
        return response;
    }

    async editEquipe(equipe) {
        const response = await this.axios.post(`${this.baseUrl}equipes/edit`, { id: equipe._id, equipe }, { headers: this.token });
        return response;
    }

    async disableEquipe(id) {
        const disable = {
            disabled: true
        }
        const response = await this.axios.post(`${this.baseUrl}equipes/disable`, { id: id, disable }, { headers: this.token });
        return response;
    }

    async enableEquipe(id) {
        const enable = {
            disabled: false
        }
        const response = await this.axios.post(`${this.baseUrl}equipes/enable`, { id: id, enable }, { headers: this.token });
        return response;
    }
}

export default equipeService;