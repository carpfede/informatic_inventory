import Vue from "vue";
import Router from "vue-router";

import Main from "@/view/Main.vue";
import Login from "@/view/Login.vue";
import Home from "@/components/Home.vue";
import Equipos_Index from "@/components/equipes/Index.vue";
import Equipos_Create from "@/components/equipes/Create.vue";
import Equipos_Edit from "@/components/equipes/Edit.vue";
import Equipos_Delete from "@/components/equipes/Delete.vue";
import Equipos_Detail from "@/components/equipes/Detail.vue";

function route(path, component, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component
  }
}

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    route('/login', Login, 'login'),
    route('/', Main, null, [
      route('/', Home, 'home'),
      route('/principal', Home, 'principal'),
      route('/equipos', Equipos_Index, 'equipos_index'),
      route('/equipos/index', Equipos_Index, 'index_equipos'),
      route('/equipos/editar/:id', Equipos_Edit, 'equipos_edit'),
      route('/equipos/crear', Equipos_Create, 'equipos_create'),
      route('/equipos/borrar/:id', Equipos_Delete, 'equipos_delete'),
      route('/equipos/detalle/:id', Equipos_Detail, 'equipos_detail'),
      // route('/example', 'Example'),
      // route('/settings', 'Settings'),
      // route('/theme', 'Theme'),
      // route('/chat', 'Chat'),
      // route('/about', 'About')
    ])
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("user");
  if (to.path !== "/login" && !currentUser) {
    // eslint-disable-next-line no-console
    next("/login");
  }
  next();
});

export default router;
