<template>
  <tr class="item row">
    <td class="input-group">
      <input name="id" v-model="item._id" disabled/>
    </td>
    <td class="input-group">
      <input name="title" v-model="item.title" />
    </td>
    <td class="input-group">
      <input name="category" v-model="item.category" />
    </td>
    <td class="input-group">
      <input name="author" v-model="item.author" />
    </td>
    <td class="input-group">
      <input name="price" v-model="item.price" />
    </td>
    <td class="input-group">
      <input name="image" v-model="item.image" />
    </td>
    <td class="input-group">
      <input name="isSealed" v-model="item.isSealed" />
    </td>
    <td class="input-group">
      <input name="isAvailable" v-model="item.isAvailable" />
    </td>
    <td class="input-group btn btn-danger">
      <button @click.prevent="updateItem">Salvar</button>
    </td>
  </tr>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Item',
  props: {
    item: Object,
  },

  methods: {
    updateItem() {
      axios.put(`/edit/${this.item._id}`, this.item).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style scoped>
</style>
