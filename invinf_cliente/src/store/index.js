import Vue from "vue";
import Vuex from "vuex";
import services from "./service";
import logo from '../store/logo.png';
import { account } from './account.module';

Vue.use(Vuex);

const state = {
  services,
  systemTitle: 'Inventario Informático',
  systemDescription: 'Gestión de equipos informáticos para control de stock',
  logo
};

export default new Vuex.Store({
  state,
  modules: {
    account
  }
});
