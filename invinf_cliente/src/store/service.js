import Axios from "axios";
import userService from "../services/users/user.service";
import equipeService from "@/services/equipes/equipe.service";
import employeeService from "@/services/employees/employee.service";
import mainService from "@/services/main.service";

import config from "../config/config";
import Lodash from "lodash";
import areaService from "../services/areas/area.service";

// Axios Configuration
Axios.defaults.headers.common.Accept = "application/json";
export default {
  userService: new userService(Axios, config.baseUrl, Lodash),
  equipeService: new equipeService(Axios, config.baseUrl, Lodash),
  mainService: new mainService(Axios, config.baseUrl, Lodash),
  employeeService: new employeeService(Axios, config.baseUrl, Lodash),
  areaService: new areaService(Axios, config.baseUrl, Lodash)
};
