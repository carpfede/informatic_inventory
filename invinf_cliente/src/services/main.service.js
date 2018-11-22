class mainService {
    axios;
    lodash;
    baseUrl;
    constructor(axios, config, lodash) {
        this.axios = axios;
        this.lodash = lodash;
        this.baseUrl = config.baseUrl;
    }

    findMenu() {
        return [
            { 'header': 'Admin' },
            { 'href': '/', 'title': 'Home', 'icon': 'home' },
            { 'href': '/equipos', 'title': 'Equipos', 'icon': 'fas fa-desktop' },
            { 'href': '/cambios', 'title': 'Cambio', 'icon': 'view_list' },
            { 'href': '/reportes', 'title': 'Reportes', 'icon': 'far fa-file-alt' },
            { 'href': '/empleados', 'title': 'Empleados', 'icon': 'fas fa-users' },
        ]
    }
}

export default mainService;
