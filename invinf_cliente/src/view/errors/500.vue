<template>
    <v-app id="500">
        <v-container fluid>
            <v-layout align-center justify-center row>
                <div class="text-md-center">
                    <h1>Error 500 error de servidor interno</h1>
                </div>
            </v-layout>
            <v-layout align-center justify-center row>
                <div class="text-md-center">
                    <h3>Error para realizar la operación, contactese con el administrador.</h3>
                    <v-btn color="primary" @click="goHome">Salir</v-btn>
                </div>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped lang="css">
h1 {
  font-size: 50px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
 