<template>
  <v-container grid-list-xl fluid>
    <v-progress-linear :indeterminate="true" v-if="saveFin"></v-progress-linear>
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
              <h4>Nueva area</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="widget-header-action"></slot>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <slot name="widget-content">
              <v-layout row wrap>
                <v-flex>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7 offset-xs1>
                      <v-text-field
                        v-model="area.code"
                        label="Código"
                        color="primary"
                        :rules="[rules.required]"
                      ></v-text-field>
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
                    <v-btn color="success" @click="save()">Guardar</v-btn>
                  </div>
                </v-flex>
              </v-layout>
            </slot>
          </v-card-text>
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
    saveFin: false,
    menu: false,
    area: {
      code: "",
      name: ""
    },
    rules: config.rules,
    errors: [],
    alert: false
  }),
  async created() {
    this.service = this.$store.state.services.areaService;
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Areas" });
    },
    async save() {
      this.saveFin = true;
      const response = await this.service.addArea(this.area);
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