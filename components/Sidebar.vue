<template>
  <div>
    <b-button v-if="isConnected" class="btn-sidebar" variant="light" v-b-toggle.sidebar-backdrop>
      <font-awesome-icon :icon="['fas', 'chevron-right']"></font-awesome-icon>
    </b-button>

    <b-sidebar
      id="sidebar-backdrop"
      title="Menu"
      backdrop-variant="dark"
      backdrop
      shadow
    >
      <div>
        <b-list-group>
          <b-list-group-item href="/game" variant="white">Acceuil</b-list-group-item>
          <b-list-group-item v-if="isAdminBool" href="/admin" variant="white">Admin</b-list-group-item>
          <b-list-group-item href="#" variant="white" v-b-modal.modal-new-caracter>Nouveau personnage</b-list-group-item>
          <b-list-group-item href="#" v-on:click="disconnect()" variant="danger">Deconnexion</b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import {API_IS_ADMIN} from "static/ApiUrls";

export default {
  name: "Sidebar",
  data() {
    return {
      isConnected: false,
      isAdminBool: false,
    }
  },
  watch: {
    '$route'(to, from) {
      this.checkConnexion();
    }
  },
  beforeMount() {
    this.checkConnexion();
    this.isAdmin();
  },
  methods: {
    checkConnexion() {
      const token = localStorage.getItem('token');
      (token && token !== '') ? this.isConnected = true : this.isConnected = false;
    },
    disconnect() {
      console.log('Disconnected !');
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    async isAdmin() {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log(token, 'token');
      const res = await this.$axios.$get(API_IS_ADMIN()+'/'+token.user_id);
      this.isAdminBool = res.data;
    }
  }
}
</script>

<style scoped>

</style>
