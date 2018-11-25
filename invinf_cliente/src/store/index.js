import Vue from "vue";
import Vuex from "vuex";
import services from "./service";
import logo from '../store/logo.png';
import config from "../config/config";

Vue.use(Vuex);
const token = config.token;

const state = {
  services,
  systemTitle: 'Inventario Informático',
  systemDescription: 'Gestión de equipos informáticos para control de stock',
  logo,
  token
};

export default new Vuex.Store({
  state
});
