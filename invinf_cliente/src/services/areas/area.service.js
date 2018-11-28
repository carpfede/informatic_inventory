import { authHeader } from '../../helper';

class areaService {
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
        const response = await this.axios.get(`${this.baseUrl}areas/findAll`, { headers: this.token });
        return response;
    }

    async find(filter) {
        const response = await this.axios.get(`${this.baseUrl}areas/find`, { headers: this.token, params: filter });
        return response.data;
    }
    //POST
    async addArea(area) {
        const response = await this.axios.post(`${this.baseUrl}areas/create`, area, { headers: this.token });
        return response;
    }

    async editArea(area) {
        const response = await this.axios.post(`${this.baseUrl}areas/edit`, { id: area._id, area }, { headers: this.token });
        return response;
    }

    async disableArea(id) {
        const disable = {
            disabled: true
        }
        const response = await this.axios.post(`${this.baseUrl}areas/disable`, { id: id, disable }, { headers: this.token });
        return response;
    }

    async enableArea(id) {
        const enable = {
            disabled: false
        }
        const response = await this.axios.post(`${this.baseUrl}areas/enable`, { id: id, enable }, { headers: this.token });
        return response;
    }
}

export default areaService;
