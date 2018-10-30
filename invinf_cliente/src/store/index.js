import Vue from "vue";
import Vuex from "vuex";
import services from "./service";

Vue.use(Vuex);

const state = {
  services
};

export default new Vuex.Store({
  state
});
