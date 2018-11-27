import Vue from "vue";
import Vuex from "vuex";
import services from "./service";
import logo from '../store/logo.png';

Vue.use(Vuex);

const state = {
  services,
  systemTitle: 'Inventario Informático',
  systemDescription: 'Gestión de equipos informáticos para control de stock',
  logo,
  user: null
};

export default new Vuex.Store({
  state,
  mutations: {
    desAuth(state) {
      Vue.set(state.user, null);
    },
    auth(state, { user }) {
      Vue.set(state.user, user);
    }
  }
});
