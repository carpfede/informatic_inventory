import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";

axios.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    router.push({name: "404"})
  }
  return Promise.reject(error.response);
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
