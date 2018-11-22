import Axios from "axios";
import userService from "../services/users/user.service";
import equipeService from "@/services/equipes/equipe.service";
import mainService from "@/services/main.service";

import config from "../config/config";
import Lodash from "lodash";

// Axios Configuration
Axios.defaults.headers.common.Accept = "application/json";
export default {
  userService: new userService(Axios, config[0], Lodash),
  equipeService: new equipeService(Axios, config[0], Lodash),
  mainService: new mainService(Axios, config[0], Lodash)
};
