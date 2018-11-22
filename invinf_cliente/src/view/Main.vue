<template>
  <v-app standalone>
    <v-navigation-drawer v-model='drawer' :mini-variant.sync="mini" persistent enable-resize-watcher>
      <div class="pa-3 text-xs-center" v-show="!mini">
        <div class="display-2 py-4">
          {{systemTitle}}
        </div>
        <p>{{systemDescription}}</p>
      </div>
      <div class="pa-3 text-xs-center" v-show="mini"> 
        <div class="display-2">
          A
        </div>
      </div>
      <v-divider>
      </v-divider>
      <v-list class="dense">
        <template v-for="item in menu">
          <v-list-title v-bind:to="item.href" v-bind:slot="item" v-bind:key="item.href" v-bind:title="item.title">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-title>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="darken-1 theme">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title> {{pageTitle}} </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn slot="activator">
          <span>Log out</span>
          <v-icon class="black--text" right>fas fa-sign-out-alt</v-icon>
        </v-btn>
      </v-menu>
    </v-toolbar>
    <main>
      <v-container class="fluid pa-4">
        <!-- <v-alert v-bind='message' v-model='message.body' dismissible py-2>{{message.body}}</v-alert> -->
        <v-slide-y-transition mode='out-in'>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      theme: "primary",
      mini: false,
      drawer: true,
      systemTitle: "",
      systemDescription: "",
      menu: [],
      service: null,
      pageTitle: "test",
      message: ""
    };
  },
  created() {
    this.systemTitle = this.$store.state.systemTitle;
    this.systemDescription = this.$store.state.systemDescription;
    this.service = this.$store.state.services.mainService;
    this.menu = this.service.findMenu();
    // eslint-disable-next-line
    console.log(this.menu);
  },
  methods: {}
};
</script>

