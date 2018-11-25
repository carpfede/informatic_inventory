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
        const response = await this.axios.get(`${this.baseUrl}employees/findAll`, { headers: config.token });
        return response;
    }

    async getLastIdNumber() {
        const response = await this.axios.get(`${this.baseUrl}employees/lastIdNumber`);
        return response;
    }

    async find(filter) {
        const response = await this.axios.get(`${this.baseUrl}employees/find`, { headers: config.token, params: filter });
        return response.data;
    }
    //POST
    async addEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/create`, employee);
        return response;
    }

    async editEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/edit`, { id: employee._id, employee }, { headers: config.token });
        return response;
    }
}

export default equipeService;
