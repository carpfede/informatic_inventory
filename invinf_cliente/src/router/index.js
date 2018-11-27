import Vue from "vue";
import Router from "vue-router";
import store from '../store/index';

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
      path: '/error/autorizacion',
      meta: {
        public: true,
      },
      name: '401',
      component: () => import(
        `@/view/errors/401.vue`
      )
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    },
    {
      path: '/error/archivos',
      meta: {
        public: true,
      },
      name: '404',
      component: () => import(
        `@/view/errors/404.vue`
      )
    },
    {
      path: '/error/server',
      meta: {
        public: true,
      },
      name: '500',
      component: () => import(
        `@/view/errors/500.vue`
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
      name: 'Empleados_detail',
      component: () => import(
        `@/components/employees/Detail.vue`
      )
    },
    {
      path: '/equipos',
      meta: { title: 'Equipos' },
      name: 'Equipos_root',
      redirect: {
        name: 'Equipos'
      }
    },
    {
      path: '/equipos/index',
      meta: { title: 'Equipos' },
      name: 'Equipos',
      component: () => import(
        `@/components/equipes/Index.vue`
      )
    },
    {
      path: '/equipos/crear',
      meta: { title: 'Equipos' },
      name: 'Equipos_create',
      component: () => import(
        `@/components/equipes/Create.vue`
      )
    },
    {
      path: '/equipos/editar/:id?',
      meta: { title: 'Equipos' },
      name: 'Equipos_edit',
      component: () => import(
        `@/components/equipes/Edit.vue`
      )
    },
    {
      path: '/equipos/detalle/id:?',
      meta: { title: 'Empleados' },
      name: 'Equipos_detail',
      component: () => import(
        `@/components/equipes/Detail.vue`
      )
    }
  ]
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  console.log(to.path);
  if (to.path === '/login') {
    store.state.user = null;
  }

  const currentUser = store.state.user = JSON.parse(localStorage.getItem("user"));
  if (to.path !== "/login" && !currentUser) {
    next("/login");
  }
  next();
});

export default router;
