<template>
    <v-container grid-list-xl fluid>
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
                            <h4>Detalle de empleado</h4>
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
                                            <v-text-field v-model="employee.idNumber" label="Legajo" readonly></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout wrap align-center justify-space-around row>
                                        <v-flex xs7 offset-xs1>
                                            <v-text-field v-model="employee.firstName" label="Nombres" color="primary" :rules="[rules.required,rules.maxLength]" readonly></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout wrap align-center justify-space-around row>
                                        <v-flex xs7 offset-xs1>
                                            <v-text-field v-model="employee.lastName" label="Apellidos" color="primary" :rules="[rules.required,rules.maxLength]" readonly></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout wrap align-center justify-space-around row>
                                        <v-flex xs7 offset-xs1>
                                            <v-text-field v-model="employee.email" label="E-mail" color="primary" :rules="[rules.required,rules.email]" readonly></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout wrap align-center justify-space-around row>
                                        <v-flex xs7 offset-xs1>
                                            <v-text-field v-model="employee.telephone" label="Telefono" color="primary" :rules="[rules.required,rules.onlyNumbers]" readonly></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout wrap align-center justify-space-around row>
                                        <v-flex xs7 offset-xs1>
                                            <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" :return-value.sync="employee.birthday">
                                                <v-text-field slot="activator" label="Nacimiento" v-model="birthday" prepend-icon="event" readonly></v-text-field>
                                            </v-menu>
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
    id: "",
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
    this.id = this.$route.params.id;
    this.service = this.$store.state.services.employeeService;
    const response = await this.service.find({ _id: this.id });

    if (_.some(response.errors)) {
      this.$router.push({ name: "404" });
    }
    this.employee = response.employee;
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Empleados" });
    }
  },
  computed: {
    birthday() {
      return this.$options.filters.toDate(this.employee.birthday);
    }
  },
  filters: {
    toDate(value) {
      let date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("es");
    }
  }
};
</script>