import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      meta: {
        public: true,
      },
      name: 'Login',
      component: () => import(
        `@/view/Login.vue`
      )
    },
    {
      path: '/error',
      meta: {
        public: true,
      },
      name: '404',
      component: () => import(
        `@/view/404.vue`
      )
    },
    {
      path: '/',
      meta: {},
      name: 'Root',
      redirect: {
        name: 'Home'
      }
    },
    {
      path: '/home',
      meta: {},
      name: 'Home',
      component: () => import(
        `@/components/Home.vue`
      )
    },
    {
      path: '/empleados',
      meta: { title: 'Empleados' },
      name: 'Empleados_root',
      redirect: {
        name: 'Empleados'
      }
    },
    {
      path: '/empleados/index',
      meta: { title: 'Empleados' },
      name: 'Empleados',
      component: () => import(
        `@/components/employees/Index.vue`
      )
    },
    {
      path: '/empleados/crear',
      meta: { title: 'Empleados' },
      name: 'Empleados_create',
      component: () => import(
        `@/components/employees/Create.vue`
      )
    },
    {
      path: '/empleados/editar/:id?',
      meta: { title: 'Empleados' },
      name: 'Empleados_edit',
      component: () => import(
        `@/components/employees/Edit.vue`
      )
    },
    {
      path: '/empleados/detalle/id:?',
      meta: { title: 'Empleados' },
      name: 'Empleados_detalle',
      component: () => import(
        `@/components/employees/Detail.vue`
      )
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
