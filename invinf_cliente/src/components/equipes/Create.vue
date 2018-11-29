<template>
  <v-container grid-list-xl fluid>
    <pre>{{component}}</pre>
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
      <v-flex sm11>
        <v-card>
          <v-toolbar color="transparent" flat dense card>
            <v-toolbar-title>
              <h4>Nuevo equipo</h4>
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
                    <v-flex xs7>
                      <v-text-field v-model="equipe.code" label="Código" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-textarea v-model="equipe.description" label="Descripción"></v-textarea>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field v-model="equipe.state" label="Estado" color="primary" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field
                        v-model="equipe.avgLife"
                        label="Vida útil"
                        color="primary"
                        :rules="[rules.required]"
                        readonly
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-select
                        :items="areas"
                        v-model="equipe.area"
                        label="Areas"
                        item-text="code"
                        item-value="_id"
                        single-line
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-combobox
                        multiple
                        :items="employees"
                        v-model="equipe.employees"
                        tags
                        chips
                        item-text="name"
                        label="Usuarios"
                        class="input-group--focused"
                      ></v-combobox>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <div class="text-xs-right">
                        <v-btn
                          small
                          fab
                          medium
                          dark
                          color="teal"
                          right
                          @click="addComponentDialog = true"
                        >
                          <v-icon dark>fas fa-plus</v-icon>
                        </v-btn>
                      </div>
                      <v-data-table :items="equipe.components">
                        <template slot="headers" slot-scope="props">
                          <tr>
                            <th class="text-xs-center">
                              <v-icon>fas fa-microchip</v-icon>
                            </th>
                            <th class="text-xs-center">
                              <v-icon>fas fa-store</v-icon>
                            </th>
                            <th class="text-xs-center">
                              <v-icon>fas fa-money-bill-alt</v-icon>
                            </th>
                            <th class="text-xs-center">
                              <v-icon>fas fa-calendar-alt</v-icon>
                            </th>
                            <td></td>
                          </tr>
                        </template>
                        <template slot="items" slot-scope="props">
                          <td>{{ typeName(props.item.key)}}</td>
                          <td>{{ providerName(props.item.provider_id)}}</td>
                          <td>$ {{ props.item.price}}</td>
                          <td>{{ props.item.avgLife}} años</td>
                          <td class="text-xs-right">
                            <v-btn
                              depressed
                              outline
                              icon
                              fab
                              dark
                              color="red"
                              small
                              @click="removeComponent(props.item)"
                            >
                              <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                            <v-btn
                              depressed
                              outline
                              icon
                              fab
                              dark
                              color="green"
                              small
                              @click="showComponent(props.item)"
                            >
                              <v-icon>fas fa-eye</v-icon>
                            </v-btn>
                          </td>
                        </template>
                        <template slot="no-data">
                          <div></div>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </slot>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="addComponentDialog" persistent max-width="600px">
        <v-layout row wrap v-for="e in errorsAdd" v-bind:key="e.path" fill>
          <v-alert v-model="alert" type="error" @click="removeErrorAdd(e)">{{e.message}}</v-alert>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-card>
              <v-toolbar color="transparent" flat dense card>
                <v-toolbar-title>
                  <h4>Agregar componente</h4>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <slot name="widget-header-action"></slot>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <slot name="widget-content">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-select
                          :items="componentTypes"
                          v-model="componentType"
                          label="Tipos"
                          item-text="value"
                          item-value="key"
                          single-line
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-select
                          :items="providers"
                          v-model="component.provider_id"
                          label="Proveedor"
                          item-text="name"
                          item-value="_id"
                          single-line
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field
                          v-model="component.mark"
                          :rules="[rules.required]"
                          label="Marca"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field
                          v-model="component.model"
                          :rules="[rules.required]"
                          label="Modelo"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field
                          v-model="component.price"
                          :rules="[rules.onlyNumbers,rules.required]"
                          label="Precio"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field
                          v-model="component.warranty"
                          label="Garantía"
                          :rules="[rules.onlyNumbers,rules.required]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field
                          v-model="component.avgLife"
                          label="Vida útil"
                          :rules="[rules.onlyNumbers,rules.required]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <template v-if="componentType === 0">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.frequency"
                            label="Frecuencia"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.socket"
                            label="Socket"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.core"
                            label="Núcleos"
                            :rules="[rules.onlyNumbers,rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-if="componentType === 1">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.type"
                            label="Tipo"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.socket"
                            label="Socket"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.chipset"
                            label="Chipset"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.width"
                            label="Ancho"
                            :rules="[rules.onlyNumbers,rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.height"
                            label="Alto"
                            :rules="[rules.onlyNumbers,rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-if="componentType === 2">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.resolution"
                            label="Resolución"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.type"
                            label="Tipo pantalla"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.connector"
                            label="Conector"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.inches"
                            label="Pulgadas"
                            :rules="[rules.onlyNumbers,rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-if="componentType === 3">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.connector"
                            label="Conector"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-if="componentType === 4">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.potency"
                            label="Potencia"
                            :rules="[rules.onlyNumbers,rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-if="componentType === 5">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.frequency"
                            label="Frecuencia"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.capacity"
                            label="Capacidad"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-if="componentType === 6">
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.capacity"
                            label="Capacidad"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.type"
                            label="Tipo"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.dimension"
                            label="Dimensión"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap align-center justify-space-around row>
                        <v-flex xs7>
                          <v-text-field
                            v-model="component.latency"
                            label="Latencia"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </template>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex>
                        <div class="text-xs-center">
                          <v-btn color="teal darken-1" flat="flat" @click="cancelarAdd()">Cancelar</v-btn>
                          <v-btn color="success" @click="addComponent()">Guardar</v-btn>
                        </div>
                      </v-flex>
                    </v-layout>
                  </slot>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
    </v-layout>
    <v-dialog v-model="showComponentDialog" persistent max-width="600px">
      <v-layout row>
        <v-flex>
          <v-card>
            <v-toolbar color="transparent" flat dense card>
              <v-toolbar-title>
                <h4>Detalle del componente</h4>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <slot name="widget-header-action"></slot>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <slot name="widget-content">
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field
                        :value="typeName(component.key)"
                        label="Tipo de componente"
                        readonly
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field
                        :value="providerName(component.provider_id)"
                        label="Proveedor"
                        readonly
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field :value="component.mark" label="Marca" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field :value="component.model" label="Modelo" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field :value="component.price" label="Precio" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field :value="component.warranty" label="Garantía" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex xs7>
                      <v-text-field :value="component.avgLife" label="Vida útil" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                  <template v-if="component.key === 0">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.frequency" label="Frecuencia" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.socket" label="Socket" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.core" label="Núcleos" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <template v-if="component.key === 1">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.type" label="Tipo" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.socket" label="Socket" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.chipset" label="Chipset" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.width" label="Ancho" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.height" label="Alto" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <template v-if="component.key === 2">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.resolution" label="Resolución" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.type" label="Tipo pantalla" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.connector" label="Conector" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.inches" label="Pulgadas" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <template v-if="component.key === 3">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.connector" label="Conector" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <template v-if="component.key === 4">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.potency" label="Potencia" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <template v-if="component.key === 5">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.frequency" label="Frecuencia" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.capacity" label="Capacidad" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <template v-if="component.key === 6">
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.capacity" label="Capacidad" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.type" label="Tipo" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.dimension" label="Dimensión" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap align-center justify-space-around row>
                      <v-flex xs7>
                        <v-text-field :value="component.latency" label="Latencia" readonly></v-text-field>
                      </v-flex>
                    </v-layout>
                  </template>
                  <v-layout wrap align-center justify-space-around row>
                    <v-flex>
                      <div class="text-xs-center">
                        <v-btn color="teal darken-1" flat="flat" @click="hideComponent()">Cerrar</v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                </slot>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
    <v-dialog v-model="removeComponentDialog" max-width="290" return-value="true">
      <v-card>
        <v-card-text>¿Está seguro que desea eliminar el componente?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="teal darken-1" flat="flat" @click="removeComponentDialog = false">Cancelar</v-btn>

          <v-btn color="teal darken-1" flat="flat" @click="removedComponent()">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import config from "@/config/config";
import _ from "lodash";

export default {
  data: () => ({
    alert: false,
    addComponentDialog: false,
    showComponentDialog: false,
    removeComponentDialog: false,
    component: {},
    equipe: {
      code: "",
      description: "",
      avgLife: 0,
      state: "nuevo",
      employees: [],
      components: []
    },
    rules: config.rules,
    errors: [],
    errorsAdd: [],
    areas: [],
    employees: [],
    providers: [],
    componentType: 0,
    componentTypes: []
  }),
  async created() {
    this.equipeService = this.$store.state.services.equipeService;
    this.areaService = this.$store.state.services.areaService;
    this.employeeService = this.$store.state.services.employeeService;

    const resCode = await this.equipeService.getLastCode();
    this.equipe.code = resCode.data + 1;

    const resArea = await this.areaService.findAll();
    this.areas = _.filter(resArea.data.area, a => !a.disabled);

    const resUser = await this.employeeService.findAll();
    this.employees = _.filter(resUser.data.employee, e => !e.disabled);
    _.forEach(this.employees, e => {
      e.name = e.lastName.concat(", ", e.firstName);
    });

    const resComponents = await this.equipeService.getTypes();
    this.types = resComponents.data.types;

    const resProviders = await this.equipeService.getProviders();
    this.providers = resProviders.data;
  },
  methods: {
    providerName(value) {
      const prov = _.find(this.providers, p => p._id === value);
      return prov ? prov.name : "";
    },
    typeName(value) {
      const type = _.find(this.types, t => t.key === value);
      return type ? type.value : "";
    },
    goBack() {
      this.$router.push({ name: "Equipos" });
    },
    removeError(e) {
      this.errors = _.filter(this.errors, error => error !== e);
    },
    removeErrorAdd(e) {
      this.errorsAdd = _.filter(this.errorsAdd, error => error !== e);
    },
    addComponent() {
      if (this.$refs.form.validate()) {
        this.component.key = this.componentType;
        this.equipe.components.push(this.component);
        this.component = {};
        this.addComponentDialog = false;
      }
    },
    removedComponent() {
      var index = _.findIndex(
        this.equipe.components,
        c => c === this.elemRemove
      );
      this.equipe.components = this.equipe.components.splice(index, 1);
      this.removeComponentDialog = false;
    },
    removeComponent(component) {
      this.elemRemove = component;
      this.removeComponentDialog = true;
    },
    cancelarAdd() {
      this.component = {};
      this.$refs.form.resetValidation();
      this.addComponentDialog = false;
    },
    showComponent(component) {
      this.component = component;
      this.showComponentDialog = true;
    },
    hideComponent() {
      this.component = {};
      this.showComponentDialog = false;
    },
    async save() {
      const response = await this.service.addequipe(this.equipe);
      if (_.some(response.data.errors)) {
        this.errors = response.data.errors;
        this.alert = true;
      } else {
        this.goBack();
      }
    }
  },
  watch: {
    addComponentDialog() {
      this.componentTypes = _.filter(this.types, t => {
        if (t.key === 0 && _.every(this.equipe.components, e => e.key !== 0)) {
          return t;
        }
        if (
          t.key === 1 &&
          _.filter(this.equipe.components, e => e.key === 1) < 2
        ) {
          return t;
        }
        if (t.key === 2 && _.every(this.equipe.components, e => e.key !== 2)) {
          return t;
        }
        if (t.key === 3) {
          return t;
        }
        if (t.key === 4 && _.every(this.equipe.components, e => e.key !== 4)) {
          return t;
        }
        if (
          t.key === 5 &&
          _.filter(this.equipe.components, e => e.key === 5).length < 4
        ) {
          return t;
        }
        if (
          t.key === 6 &&
          _.filter(this.equipe.components, e => e.key !== 6).length < 2
        ) {
          return t;
        }
      });

      this.componentType = this.componentTypes[0].key;
    }
  },
  filters: {
    toDate(value) {
      var date = new Date(value);
      date.setDate(date.getDate() + 1);
      return date ? "" : date.toLocaleDateString("es");
    }
  }
};
</script>