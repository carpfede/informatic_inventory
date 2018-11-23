class equipeService {
    axios;
    lodash;
    baseUrl;
    constructor(axios, baseUrl, lodash) {
        this.axios = axios;
        this.lodash = lodash;
        this.baseUrl = baseUrl;
        this.authToken = JSON.parse(localStorage.getItem('user')).token.accessToken;

    }

    async findAll() {
        console.log(this.authToken);
        const token = {
            'Authorization': 'Bearer' + this.authToken
        }
        const response = await this.axios.get(`${this.baseUrl}employees/findAll`, { params: token });
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
}

export default equipeService;
