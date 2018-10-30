import Axios from "axios";
import userService from "../services/users/userService";

// Axios Configuration
Axios.defaults.headers.common.Accept = "application/json";

export default {
  userService: new userService(Axios)
};
