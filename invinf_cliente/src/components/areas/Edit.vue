<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap v-for="e in errors" v-bind:key="e.path" fill>
      <v-alert v-model="alert" type="error" @click="removeError(e)">{{e.message}}</v-alert>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm1>
        <div class="text-xs-center">
          <v-btn flat icon color="blue lighten-2" @click="goBack()">
            <v-icon x-large>fas fa-arrow-left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex sm8>
        <v-card>
          <v-toolbar color="transparent" flat dense card>
            <v-toolbar-title>
              <h4>Editar area</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="widget-header-action"></slot>
          </v-toolbar>
          <v-divider></v-divider>
          <v-form ref="form" lazy-validation @submit.prevent="save">
            <v-card-text>
              <slot name="widget-content">
                <v-layout row wrap>
                  <v-flex>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7 offset-xs1>
                        <v-text-field v-model="area.code" label="Código" :rule="[rules.required]"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7 offset-xs1>
                        <v-text-field
                          v-model="area.name"
                          label="Nombre"
                          color="primary"
                          :rules="[rules.required,rules.maxLength]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap align-center justify-space-around row>
                  <v-flex>
                    <div class="text-xs-center">
                      <v-btn color="success" type="submit">Guardar</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </slot>
            </v-card-text>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from "@/config/config";
import _ from "lodash";

export default {
  data: () => ({
    id: "",
    area: {
      code: "",
      name: ""
    },
    rules: config.rules,
    errors: [],
    alert: false
  }),
  async created() {
    this.id = this.$route.params.id;
    this.service = this.$store.state.services.areaService;
    const response = await this.service.find({ _id: this.id });

    if (_.some(response.errors)) {
      this.$router.push({ name: "404" });
    }
    this.area = response.area;
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Areas" });
    },
    async save() {
      const response = await this.service.editArea(this.area);
      if (_.some(response.data.errors)) {
        this.errors = response.data.errors;
        this.alert = true;
      } else {
        this.goBack();
      }
    },
    removeError(e) {
      this.errors = _.filter(this.errors, error => error !== e);
    }
  }
};
</script>