<template>
  <v-app>
    <v-container fill-height justify-center align-center>
      <v-flex xs8 sm5 md5 lg4>
        <v-card class="mt-0 pt-0">
          <v-card-title class="teal">
            <div class="title white--text">Bienvenido a Inventario Informático!</div>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="login">
              <v-layout row wrap>
                <v-text-field v-model="user" label="Usuario" prepend-icon="fa-user" :rules="userRules"></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field type="password" v-model="pass" label="Contraseña" prepend-icon="fa-lock" :rules="passRules"></v-text-field>
              </v-layout>
              <div class="text-xs-right">
                <v-btn color="success" type="submit">
                  Ingresar
                  <v-icon right>fa fa-sign-in-alt</v-icon>
                </v-btn>
              </div>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    user: "",
    userRules: [v => !!v || "El nombre es requerido"],
    pass: "",
    passRules: [v => !!v || "La contraseña es requerida"]
  }),
  created() {
    this.userService = this.$store.state.services.userService;
  },
  methods: {
    login: function() {
      this.userService.getAll();
    }
  }
};
</script>