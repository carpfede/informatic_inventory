import config from "../../config/config";

class equipeService {
    axios;
    lodash;
    baseUrl;
    constructor(axios, baseUrl, lodash) {
        this.axios = axios;
        this.lodash = lodash;
        this.baseUrl = baseUrl;
    }

    // GET
    async findAll() {
        const response = await this.axios.get(`${this.baseUrl}equipes/findAll`, { headers: config.token });
        return response;
    }

    async find(filter) {
        const response = await this.axios.get(`${this.baseUrl}equipes/find`, { headers: config.token, params: filter });
        return response;
    }
    //POST
    async addEquipe(equipe) {
        const response = await this.axios.post(`${this.baseUrl}equipes/create`, { headers: config.token });
        return response;
    }

    async editEquipe(equipe) {
        const response = await this.axios.post(`${this.baseUrl}equipes/edit`, { id: equipe._id, equipe }, { headers: config.token });
        return response;
    }

    async disableEquipe(id) {
        const disable = {
            disabled: true
        }
        const response = await this.axios.post(`${this.baseUrl}equipes/disable`, { id: id, disable }, { headers: config.token });
        return response;
    }

    async enableEquipe(id) {
        const enable = {
            disabled: false
        }
        const response = await this.axios.post(`${this.baseUrl}equipes/enable`, { id: id, enable }, { headers: config.token });
        return response;
    }
}

export default equipeService;