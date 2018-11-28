<template>
  <v-container
    grid-list-xl
    fluid
  >
    <v-layout
      row
      wrap
      v-for="e in errors"
      v-bind:key="e.path"
      fill
    >
      <v-alert
        v-model="alert"
        type="error"
        @click="removeError(e)"
      >
        {{e.message}}
      </v-alert>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex sm1>
        <div class="text-xs-center">
          <v-btn
            flat
            icon
            color="blue lighten-2"
            @click="goBack()"
          >
            <v-icon x-large>fas fa-arrow-left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex sm8>
        <v-card>
          <v-toolbar
            color="transparent"
            flat
            dense
            card
          >
            <v-toolbar-title>
              <h4>Nuevo equipo</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="widget-header-action"></slot>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <slot name="widget-content">
              <v-layout
                row
                wrap
              >
                <v-flex>
                  <v-layout
                    wrap
                    align-center
                    justify-space-around
                    row
                  >
                    <v-flex
                      xs7
                      offset-xs1
                    >
                      <v-text-field
                        v-model="equipe.code"
                        label="Código"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    align-center
                    justify-space-around
                    row
                  >
                    <v-flex
                      xs7
                      offset-xs1
                    >
                      <v-text-field
                        v-model="equipe.description"
                        label="Descripción"
                        multi-line
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    align-center
                    justify-space-around
                    row
                  >
                    <v-flex
                      xs7
                      offset-xs1
                    >
                      <v-text-field
                        v-model="equipe.state"
                        label="Estado"
                        color="primary"
                        :rules="[rules.required,rules.maxLength]"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    align-center
                    justify-space-around
                    row
                  >
                    <v-flex
                      xs7
                      offset-xs1
                    >
                      <v-text-field
                        v-model="equipe.avgLife"
                        label="Vida útil"
                        color="primary"
                        :rules="[rules.required,rules.maxLength]"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    align-center
                    justify-space-around
                    row
                  >
                    <v-flex
                      xs7
                      offset-xs1
                    >
                      <v-select
                        :items="areas"
                        v-model="equipe.area"
                        label="Areas"
                        single-line
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    align-center
                    justify-space-around
                    row
                  >
                    <v-flex
                      xs7
                      offset-xs1
                    >
                      <v-select
                        :items="users"
                        v-model="equipe.users"
                        tags
                        chips
                        multiple=""
                        label="Usuarios"
                        class="input-group--focused"
                      ></v-select>
                    </v-flex>
                  </v-layout>

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
    menu: false,
    equipe: {},
    rules: config.rules,
    errors: [],
    areas: [],
    users: [],
    alert: false
  }),
  async created() {
    this.service = this.$store.state.services.equipeService;
    this.areaService = this.$store.state.services.areaService;
    this.userService = this.$store.state.services.userService;
    const response = await this.service.getLastCode();
    this.equipe.code = response.data + 1;
    this.equipe.state = "nuevo";
    this.areas = await this.areaService.findAll();
    console.log(this.areas);
    this.users = await this.userService.findAll();
    console.log(this.users);
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Equipos" });
    },
    async save() {
      const response = await this.service.addequipe(this.equipe);
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