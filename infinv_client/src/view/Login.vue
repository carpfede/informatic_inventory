<template>
  <v-app>
    <v-container fill-height justify-center align-center>
      <v-flex xs8 sm5 md5 lg4>
        <v-card class="mt-0 pt-0">
          <v-card-title class="teal">
            <div class="title white--text">Welcome to Informatic Inventory!</div>
          </v-card-title>
          <v-card-text>
            <form @submit.prevent="login">
              <v-layout row wrap>
                <v-text-field v-model="user" label="User name" prepend-icon="fa-user" :rules="userRules"></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field type="password" v-model="pass" label="Password" prepend-icon="fa-lock" :rules="passRules"></v-text-field>
              </v-layout>
              <div class="text-xs-right">
                <v-btn color="success" type="submit">
                  Login
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
import  "./src/_services/user-service.js";

export default {
  data: () => ({
    user: "",
    userRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    pass: "",
    passRules: [v => !!v || "Password is required"]
  }),
  methods:{
    login: function (){

    }
  }
};
</script>