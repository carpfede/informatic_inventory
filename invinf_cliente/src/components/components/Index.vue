<template>
  <div id="components">
    <v-progress-linear :indeterminate="true" v-if="!isLoaded"></v-progress-linear>
    <v-container grid-list-xl fluid v-if="isLoaded">
      <v-layout row wrap>
        <v-flex sm10>
          <h3>Lista de componentes</h3>
          <v-alert
            v-model="alert"
            type="error"
            v-for="e in errors"
            v-bind:key="e.path"
          >{{e.message}}</v-alert>
        </v-flex>
        <v-flex lg12>
          <div class="text-xs-right">
            <v-btn fab medium dark color="teal" right @click="create()">
              <v-icon dark>fas fa-plus</v-icon>
            </v-btn>
          </div>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="fas fa-filter"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table :search="search" :items="employees">
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th class="text-xs-left">
                      <v-icon>fas fa-id-card-alt</v-icon>
                    </th>
                    <th class="text-xs-center">
                      <v-icon>fas fa-address-card</v-icon>
                    </th>
                    <th class="text-xs-center">
                      <v-icon>fas fa-envelope</v-icon>
                    </th>
                    <th class="text-xs-center">
                      <v-icon>fas fa-phone-square</v-icon>
                    </th>
                    <th class="text-xs-center">
                      <v-icon>fas fa-calendar-alt</v-icon>
                    </th>
                    <td></td>
                  </tr>
                </template>
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.idNumber }}</td>
                  <td>{{ props.item.lastName }}, {{props.item.firstName}}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.telephone }}</td>
                  <td>{{ props.item.birthday | toDate }}</td>
                  <td class="text-xs-right">
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="edit(props.item._id)"
                    >
                      <v-icon>fas fa-pencil-alt</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="green"
                      small
                      @click="show(props.item._id)"
                    >
                      <v-icon>fas fa-eye</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="props.item.disabled"
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="black"
                      small
                      @click="enableEmployee(props.item._id)"
                    >
                      <v-icon>fas fa-lock-open</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="!props.item.disabled"
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="black"
                      small
                      @click="disabled(props.item._id)"
                    >
                      <v-icon>fas fa-lock</v-icon>
                    </v-btn>
                  </td>
                </template>
                <template slot="no-data">
                  <div></div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="290" return-value="true">
          <v-card>
            <v-card-text>¿Está seguro que desea deshabilitar el empleado?</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="teal darken-1" flat="flat" @click="dialog = false">Cancelar</v-btn>

              <v-btn color="teal darken-1" flat="flat" @click="disableEmployee()">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data: () => ({
    dialog: false,
    isLoaded: false,
    search: "",
    errors: [],
    employees: []
  }),
  async created() {
    this.service = this.$store.state.services.employeeService;
    this.findEmployee();
    this.isLoaded = true;
  },
  methods: {
    async findEmployee() {
      const response = await this.service.findAll();
      if (_.some(response.data.errors)) {
        this.errors = response.data.errors;
        this.alert = true;
      } else {
        _.forEach(response.data.employee, e => {
          e.value = false;
        });
        this.employees = response.data.employee;
      }
    },
    create() {
      this.$router.push({ name: "Empleados_create" });
    },
    edit(id) {
      this.$router.push({ name: "Empleados_edit", params: { id } });
    },
    show(id) {
      this.$router.push({ name: "Empleados_detail", params: { id } });
    },
    disabled(id) {
      this.dialog = true;
      this.disabledEmployeeId = id;
    },
    async disableEmployee() {
      this.dialog = false;
      const response = await this.service.disableEmployee(
        this.disabledEmployeeId
      );
      if (_.some(response.data.errors)) {
        this.errors = response.data.errors;
        this.alert = true;
        return;
      }
      this.findEmployee();
    },
    async enableEmployee(id) {
      const response = await this.service.enableEmployee(id);
      if (_.some(response.data.errors)) {
        this.errors = response.data.errors;
        this.alert = true;
        return;
      }
      this.findEmployee();
    }
  },
  filters: {
    toDate(value) {
      var date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date && date != 'Invalid Date' ? date.toLocaleDateString("es") : "";
    }
  }
};
</script>