<template>
  <v-container>
    <v-layout row wrap v-for="e in errors" v-bind:key="e.path" fill>
      <v-alert v-model="alert" type="error" @click="removeError(e)">{{e.message}}</v-alert>
    </v-layout>
    <v-layout row>
      <v-flex sm1>
        <div class="text-xs-center">
          <v-btn flat icon color="blue lighten-2" @click="goBack()">
            <v-icon x-large>fas fa-arrow-left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex>
        <v-card>
          <v-toolbar color="transparent" flat dense card>
            <v-toolbar-title>
              <h4>Nuevo empleado</h4>
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
                      <v-text-field v-model="employee.idNumber" label="Legajo" disabled></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7 offset-xs1>
                      <v-text-field
                        v-model="employee.firstName"
                        label="Nombres"
                        color="primary"
                        :rules="[rules.required,rules.maxLength]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7 offset-xs1>
                      <v-text-field
                        v-model="employee.lastName"
                        label="Apellidos"
                        color="primary"
                        :rules="[rules.required,rules.maxLength]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7 offset-xs1>
                      <v-text-field
                        v-model="employee.email"
                        label="E-mail"
                        color="primary"
                        :rules="[rules.required,rules.email]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7 offset-xs1>
                      <v-text-field
                        v-model="employee.telephone"
                        label="Telefono"
                        color="primary"
                        :rules="[rules.required,rules.onlyNumbers]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7 offset-xs1>
                      <v-menu
                        ref="menu"
                        lazy
                        :close-on-content-click="false"
                        v-model="menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        :return-value.sync="employee.birthday"
                      >
                        <v-text-field
                          slot="activator"
                          label="Picker in menu"
                          v-model="employee.birthday"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="employee.birthday" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.menu.save(employee.birthday)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
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
    menu: false,
    employee: {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      telephone: "",
      idNumber: ""
    },
    rules: config.rules,
    errors: [],
    alert: false
  }),
  async created() {
    this.service = this.$store.state.services.employeeService;
    const response = await this.service.getLastIdNumber();
    this.employee.idNumber = response.data + 1;
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Empleados" });
    },
    async save() {
      const response = await this.service.addEmployee(this.employee);
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