<template>
    <div id="equipes">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex sm12>
                    <h3>Equipos</h3>
                </v-flex>
                <v-flex lg12>
                    <v-card>
                        <v-toolbar card color="white">
                            <v-text-field flat solo prepend-icon="fas fa-filter" placeholder="Type something" v-model="search" hide-details class="hidden-sm-and-down"></v-text-field>
                            <v-btn icon>
                                <v-icon>filter_list</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text class="pa-0">
                            <v-data-table :headers="complex.headers" :search="search" :items="complex.items" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1" item-key="name" select-all v-model="complex.selected">
                                <template slot="items" slot-scope="props">
                                    <td>
                                        <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                                    </td>
                                    <td>
                                        <v-avatar size="32">
                                            <img :src="props.item.avatar" alt="">
                                        </v-avatar>
                                    </td>
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.email }}</td>
                                    <td>{{ props.item.phone }}</td>
                                    <td>
                                        <v-btn depressed outline icon fab dark color="primary" small>
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-btn depressed outline icon fab dark color="pink" small>
                                            <v-icon>delete</v-icon>
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
export default {
  data: () => ({
    search: ""
  }),
  mounted() {}
};
</script>