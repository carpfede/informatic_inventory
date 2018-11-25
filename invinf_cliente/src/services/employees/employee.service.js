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

    async findAll() {
        const response = await this.axios.get(`${this.baseUrl}employees/findAll`, { headers: config.token });
        return response;
    }

    async addEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/create`, employee);
        return response;
    }

    async getLastIdNumber() {
        const response = await this.axios.get(`${this.baseUrl}employees/lastIdNumber`);
        return response;
    }

    async find(filter){
        
    }
}

export default equipeService;
