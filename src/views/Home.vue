<template>
  <v-data-table :headers="table.headers" :items="items" :search="search" :item-class= "row_classes" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Bric do Klaus</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" :ripple="false">
              Cadastrar Novo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.author" label="Autor"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field v-model="editedItem.category" label="Categoria"></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="3" md="2">
                    <v-text-field v-model="editedItem.price" label="Preço"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="editedItem.discountAmount"
                      label="Desconto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field v-model="editedItem.image" label="Imagem"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedItem.isSealed" label="Lacrado"></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedItem.isAvailable" label="Disponível"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="createOrUpdate()">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.isSealed="{ item }">
      <v-checkbox v-model="item.isSealed" :ripple="false" disabled></v-checkbox>
    </template>
    <template v-slot:item.isAvailable="{ item }">
      <v-checkbox v-model="item.isAvailable" :ripple="false" disabled></v-checkbox>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import * as fb from '../firebase';

export default {
  name: 'Home',
  data() {
    return {
      dialog: false,
      table: {
        headers: [
          { text: 'ID', value: '_id' },
          { text: 'Título', value: 'title' },
          { text: 'Categoria', value: 'category' },
          { text: 'Autor', value: 'author' },
          { text: 'Preço', value: 'price' },
          { text: 'Desconto (%)', value: 'discountAmount' },
          { text: 'Imagem', value: 'image' },
          { text: 'Lacrado', value: 'isSealed' },
          { text: 'Disponível', value: 'isAvailable' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      },
      items: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        title: '',
        category: '',
        author: '',
        price: '',
        image: '',
        isSealed: '',
        isAvailable: true,
        discountAmount: 0,
        actions: ''
      },
      defaultItem: {
        _id: '',
        title: '',
        category: '',
        author: '',
        price: '',
        image: '',
        isSealed: '',
        isAvailable: '',
        actions: ''
      },
      search: ''
    };
  },

  created() {
    this.fetch();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item';
    },

    itemsStore: function() {
      return this.$store.state.items;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    async fetch() {
      const items = await fb.itemsCollection.get();
      let allItems = [];
      items.forEach(doc => {
        let tempItem = {};
        tempItem = doc.data();
        tempItem._id = doc.id;
        allItems.push(tempItem);
      });
      this.items = allItems;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    createOrUpdate() {
      if (this.formTitle == 'Novo Item') {
        this.$store.dispatch('createItem', this.editedItem);
      } else if (this.formTitle == 'Editar Item') {
        this.$store.dispatch('updateItem', this.editedItem);
      } else {
        console.log('Ocorreu um erro ao enviar o formulário');
      }
      this.editedItem = '';
      this.close();
      this.fetch();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    row_classes(item) {
        if (!item.isAvailable) {
          return "bg-gray";
        }
    }
  }
};
</script>


<style lang="scss">
  .bg-gray {
    background-color: rgba(255, 0, 0, 0.192)
  }
</style>
