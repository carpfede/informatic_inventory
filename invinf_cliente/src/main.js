import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import HttpStatus from './config/httpStatus'

axios.interceptors.response.use(null, function (error) {
  const status = error.response.status;

  if (status === HttpStatus.UNAUTHORIZED)
    return router.push({ name: '401' })
  if (status === HttpStatus.NOT_FOUND)
    return router.push({ name: '404' })
  if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    return router.push({ name: '500' })
  }
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
