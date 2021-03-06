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
    },
    {
      path: '/areas',
      meta: { title: 'Areas' },
      name: 'Areas_root',
      redirect: {
        name: 'Areas'
      }
    },
    {
      path: '/areas/index',
      meta: { title: 'Areas' },
      name: 'Areas',
      component: () => import(
        `@/components/areas/Index.vue`
      )
    },
    {
      path: '/areas/crear',
      meta: { title: 'Areas' },
      name: 'Areas_create',
      component: () => import(
        `@/components/areas/Create.vue`
      )
    },
    {
      path: '/areas/editar/:id?',
      meta: { title: 'Areas' },
      name: 'Areas_edit',
      component: () => import(
        `@/components/areas/Edit.vue`
      )
    },
    {
      path: '/areas/detalle/id:?',
      meta: { title: 'Areas' },
      name: 'Areas_detail',
      component: () => import(
        `@/components/areas/Detail.vue`
      )
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (to.name === 'Login' && currentUser) {
    next({ name: 'Home' })
  }

  if (to.name !== '401' && to.name !== 'Login' && !currentUser) {
    next({ name: '401' })
  }

  next();
});

export default router;