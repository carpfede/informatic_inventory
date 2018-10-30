import Axios from "axios";
import userService from "../services/users/userService";
import config from "../config/config";

// Axios Configuration
Axios.defaults.headers.common.Accept = "application/json";
export default {
  userService: new userService(Axios, config[0])
};
