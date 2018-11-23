class equipeService {
    axios;
    lodash;
    baseUrl;
    constructor(axios, baseUrl, lodash) {
        this.axios = axios;
        this.lodash = lodash;
        this.baseUrl = baseUrl;
    }
}

export default equipeService;
