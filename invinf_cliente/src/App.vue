<template>
  <div id="appRoot">
    <template v-if="!isPublic">
      <v-app
        id="inspire"
        app
      >
        <!-- menus -->
        <v-navigation-drawer
          id="appDrawer"
          :mini-variant.sync="mini"
          fixed
          app
          v-model="drawer"
          width="300"
        >
          <v-toolbar
            color="primary darken-1"
            dark
          >
            <img
              v-bind:src="computeLogo"
              height="36"
              alt="Vue Material Admin Template"
            >
            <v-toolbar-title class="ml-0 pl-2">
              <span class="hidden-sm-and-down">Inventario Informático</span>
            </v-toolbar-title>
          </v-toolbar>
          <vue-perfect-scrollbar class="drawer-menu--scroll">
            <v-list
              dense
              expand
            >
              <template v-for="(item) in menus">
                <!--top-level link-->
                <v-list-tile
                  :to="item.href"
                  ripple="ripple"
                  rel="noopener"
                  :key="item.name"
                >
                  <v-list-tile-action v-if="item.icon">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </vue-perfect-scrollbar>
        </v-navigation-drawer>
        <!-- Nav top -->
        <v-toolbar
          color="primary"
          fixed
          dark
          app
        >
          <v-toolbar-title class="ml-0 pl-2">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          </v-toolbar-title>
          <h3 class="title">{{title}}</h3>
          <v-spacer></v-spacer>
          <div class="text-xs-center">
            <v-chip>{{bienvenida}}</v-chip>
          </div>
          <v-menu offset-y>
            <v-btn
              @click="logOut"
              color="white"
              slot="activator"
            >
              <span class="black--text">Log out</span>
              <v-icon
                class="black--text"
                right
              >fas fa-sign-out-alt</v-icon>
            </v-btn>
          </v-menu>
        </v-toolbar>
        <v-content>
          <!-- Page Header -->
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          <!-- App Footer -->
          <v-footer
            fixed
            bottom
            height="auto"
            class="white pa-3 app--footer"
          >
            <span class="caption">Los Magios S.A. &copy; {{ new Date().getFullYear() }}</span>
          </v-footer>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import _ from "lodash";
import { mapState } from "vuex";

export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      mini: false,
      drawer: null
    };
  },
  created() {
    this.systemTitle = this.$store.state.systemTitle;
    this.systemDescription = this.$store.state.systemDescription;
    this.service = this.$store.state.services.mainService;
    this.menus = this.service.findMenu();
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    computeLogo() {
      return this.$store.state.logo;
    },
    computeGroupActive() {
      return true;
    },
    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    },
    bienvenida() {
      const user = this.account.user;
      return user ? `Bienvenido ${user.firstName}` : "";
    },
    title() {
      const tit = this.$route.meta.title;
      return _.startCase(_.toLower(tit));
    },
    isPublic() {
      return this.$route.meta.public;
    }
  }
};
</script>

