import Vue from "vue";
import Vuex from "vuex";
import services from "./service";

Vue.use(Vuex);

const state = {
  services,
  systemTitle: 'Inventario Informático',
  systemDescription: 'Gestión de equipos informáticos para control de stock'
};

export default new Vuex.Store({
  state
});
