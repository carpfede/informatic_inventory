<template>
    <div id="equipes">
        <v-progress-linear :indeterminate="true" v-if="!isLoaded"></v-progress-linear>
        <v-container grid-list-xl fluid v-if="isLoaded">
            <v-layout row wrap>
                <v-flex sm10>
                    <h3>Lista de empleados</h3>
                    <v-alert v-model="alert" type="error" v-for="e in errors" v-bind:key="e.path">
                        {{e.message}}
                    </v-alert>
                </v-flex>
                <v-flex lg12>
                    <div class="text-xs-right">
                        <v-btn fab medium dark color="teal" right @click="create()">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </div>
                    <v-card>
                        <v-toolbar card color="white">
                            <v-text-field flat solo prepend-icon="fas fa-filter" placeholder="Type something" v-model="search" hide-details class="hidden-sm-and-down"></v-text-field>
                            <v-btn icon>
                                <v-icon>filter_list</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text class="pa-0">
                            <v-data-table hide-headers :search="search" :items="employees">
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.idNumber }}</td>
                                    <td>{{ props.item.lastName }}, {{props.item.firstName}}</td>
                                    <td>{{ props.item.email }}</td>
                                    <td>{{ props.item.telephone }}</td>
                                    <td>{{ props.item.birthday | toDate }}</td>
                                    <td class="text-xs-right">
                                        <v-btn depressed outline icon fab dark color="primary" small @click="edit(props.item._id)">
                                            <v-icon>fas fa-pencil-alt</v-icon>
                                        </v-btn>
                                        <v-btn depressed outline icon fab dark color="green" small @click="edit(props.item._id)">
                                            <v-icon>fas fa-eye</v-icon>
                                        </v-btn>
                                        <v-btn depressed outline icon fab dark color="black" small @click="edit(props.item._id)">
                                            <v-icon v-if="!props.item.disabled">fas fa-lock</v-icon>
                                            <v-icon v-if="props.item.disabled">fas fa-lock-open</v-icon>
                                        </v-btn>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import _ from "lodash";

export default {
  data: () => ({
    isLoaded: false,
    search: "",
    errors: [],
    employees: []
  }),
  async created() {
    this.service = this.$store.state.services.employeeService;
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
    this.isLoaded = true;
  },
  methods: {
    create() {
      this.$router.push({ name: "Empleados_create" });
    },
    edit(id) {
      this.$router.push({ name: "Empleados_edit", params: { id } });
    }
  },
  filters: {
    toDate(value) {
      var date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date.toLocaleDateString("es");
    }
  }
};
</script>