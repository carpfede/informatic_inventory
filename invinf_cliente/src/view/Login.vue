<template>
  <v-app>
    <v-container fill-height justify-center align-center>
      <v-flex xs8 sm5 md5 lg4>
        <v-layout row wrap v-for="e in errors" v-bind:key="e.path" fill>
          <v-alert v-model="alert" type="error" @click="removeError(e)">
            {{e}}
          </v-alert>
        </v-layout>
        <v-card class="mt-0 pt-0">
          <v-card-title class="teal">
            <div class="title white--text">Bienvenido a Inventario Informático!</div>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="login">
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
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>

<script>
import router from "../router";
import _ from "lodash";

export default {
  data: () => ({
    user: "",
    userRules: [v => !!v || "El nombre es requerido"],
    pass: "",
    passRules: [v => !!v || "La contraseña es requerida"],
    errors: [],
    alert: false
  }),
  created() {
    this.userService = this.$store.state.services.userService;
  },
  methods: {
    login: async function() {
      if (this.$refs.form.validate()) {
        const response = await this.userService.logIn(this.user, this.pass);
        if (_.some(response.data.errors)) {
          this.errors = response.data.errors;
          this.alert = true;
        } else {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          router.push({ name: "Home" });
        }
      }
    },
    removeError(e) {
      this.errors = _.filter(this.errors, error => error !== e);
    }
  }
};
</script>