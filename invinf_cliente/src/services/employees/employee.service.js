import config from "../../config/config";

class employeeService {
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
        const response = await this.axios.get(`${this.baseUrl}employees/lastIdNumber`, { headers: config.token });
        return response;
    }

    async find(filter) {
        const response = await this.axios.get(`${this.baseUrl}employees/find`, { headers: config.token, params: filter });
        return response.data;
    }
    //POST
    async addEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/create`, { headers: config.token });
        return response;
    }

    async editEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/edit`, { id: employee._id, employee }, { headers: config.token });
        return response;
    }

    async disableEmployee(id) {
        const disable = {
            disabled: true
        }
        const response = await this.axios.post(`${this.baseUrl}employees/disable`, { id: id, disable }, { headers: config.token });
        return response;
    }

    async enableEmployee(id) {
        const enable = {
            disabled: false
        }
        const response = await this.axios.post(`${this.baseUrl}employees/enable`, { id: id, enable }, { headers: config.token });
        return response;
    }
}

export default employeeService;
