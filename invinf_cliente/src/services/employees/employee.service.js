import { authHeader } from '../../helper';

class employeeService {
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
        const response = await this.axios.get(`${this.baseUrl}employees/findAll`, { headers: this.token });
        return response;
    }

    async getLastIdNumber() {
        const response = await this.axios.get(`${this.baseUrl}employees/lastIdNumber`, { headers: this.token });
        return response;
    }

    async find(filter) {
        const response = await this.axios.get(`${this.baseUrl}employees/find`, { headers: this.token, params: filter });
        return response.data;
    }
    //POST
    async addEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/create`, employee, { headers: this.token });
        console.log(response);
        return response;
    }

    async editEmployee(employee) {
        const response = await this.axios.post(`${this.baseUrl}employees/edit`, { id: employee._id, employee }, { headers: this.token });
        console.log(response);
        return response;
    }

    async disableEmployee(id) {
        const disable = {
            disabled: true
        }
        const response = await this.axios.post(`${this.baseUrl}employees/disable`, { id: id, disable }, { headers: this.token });
        return response;
    }

    async enableEmployee(id) {
        const enable = {
            disabled: false
        }
        const response = await this.axios.post(`${this.baseUrl}employees/enable`, { id: id, enable }, { headers: this.token });
        return response;
    }
}

export default employeeService;
