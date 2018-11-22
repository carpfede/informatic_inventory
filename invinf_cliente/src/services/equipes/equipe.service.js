class equipeService {
    axios;
    lodash;
    baseUrl;
    constructor(axios, config, lodash) {
        this.axios = axios;
        this.lodash = lodash;
        this.baseUrl = config.baseUrl;
    }
}

export default equipeService;
