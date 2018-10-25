import Vue from "vue";
import Router from "vue-router";
import Home from "@/view/Home.vue";
import Login from "@/view/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "home"
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("user");
  if (to.path !== "/login" && !currentUser) {
    next("/login");
  }
  next();
});

export default router;
