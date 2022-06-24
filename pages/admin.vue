<template>
  <div>
    <b-tabs class="m-5" content-class="mt-3">
      <b-tab title="Loot Table" active>
        <b-button type="button" class="my-3" v-b-modal.modal-new-loot-table>Nouveau loot table</b-button>
        <AdminTable :items="lootTable" :fields="fieldsLootTable"/>
      </b-tab>
      <b-tab title="Users">
        <AdminTable :items="users" :fields="fieldsUsers"/>
      </b-tab>
      <b-tab title="Items">
        <b-button type="button" class="my-3" v-b-modal.modal-new-item>Nouvel item</b-button>
        <AdminTable :items="items" :fields="fieldsItems"/>
      </b-tab>
      <b-tab title="Caracters">
        <AdminTable :items="caracters" :fields="fieldsCaracters"/>
      </b-tab>
      <b-tab title="Moobs"><p>I'm a moobs tab!</p></b-tab>
    </b-tabs>
    <NewLootTable :reload="getLootTable"/>
    <NewItem :reload="getItems"/>
  </div>
</template>

<script>
import {API_CARACTERS, API_ITEMS, API_LOOT_TABLE, API_USERS} from "static/ApiUrls";

export default {
  name: "admin",
  data() {
    return {
      lootTable: [],
      users: [],
      items: [],
      caracters: [],
      fieldsLootTable: [],
      fieldsUsers: [],
      fieldsItems: [],
      fieldsCaracters: [],
    }
  },
  beforeMount() {
    this.getLootTable();
    this.getUsers();
    this.getItems();
    this.getCaracters();
  },
  methods: {
    async getLootTable() {
      const res = await this.$axios.$get(API_LOOT_TABLE());
      this.lootTable = res.data;
      this.fieldsLootTable = Object.keys(this.lootTable[0]).map(key => {
        return {
          key: key,
          sortable: true
        }
      });
    },
    async getUsers() {
      const res = await this.$axios.$get(API_USERS());
      this.users = res.data;
      this.fieldsUsers = Object.keys(this.users[0]).map(key => {
        return {
          key: key,
          sortable: true
        }
      });
    },
    async getItems() {
      const res = await this.$axios.$get(API_ITEMS());
      this.items = res.data;
      this.fieldsItems = Object.keys(this.items[0]).map(key => {
        return {
          key: key,
          sortable: true
        }
      });
    },
    async getCaracters() {
      const res = await this.$axios.$get(API_CARACTERS());
      this.caracters = res.data;
      this.fieldsCaracters = Object.keys(this.caracters[0]).map(key => {
        return {
          key: key,
          sortable: true
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
