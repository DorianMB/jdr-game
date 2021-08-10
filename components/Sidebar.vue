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
          <b-list-group-item href="#">Awesome link</b-list-group-item>
          <b-list-group-item href="#">Link with active state</b-list-group-item>
          <b-list-group-item href="#" v-on:click="disconnect()" variant="danger">Deconnexion</b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isConnected: false
    }
  },
  watch: {
    '$route'(to, from) {
      this.checkConnexion();
    }
  },
  beforeMount() {
    this.checkConnexion();
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
    }
  }
}
</script>

<style scoped>

</style>
