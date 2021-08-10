<template>
  <p v-if="user.name">Bonjour {{user.name}}</p>
</template>

<script>
import {User} from "../static/models/user";

export default {
  name: "game",
  data() {
    return {
      user: User
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('token'));
  }
}
</script>

<style scoped>

</style>
