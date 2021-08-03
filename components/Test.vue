<template>
  <h1 v-if="user.Name">
    {{getNameAndEmail(user)}}
    <font-awesome-icon :icon="['fas', 'chart-bar']" class="ml-2"></font-awesome-icon>
  </h1>
</template>

<script>
import {User} from "../static/models/user";
import {getNameAndEmail} from "../static/Functions";

export default {
  name: "Test",
  data() {
    return {
      user: User
    }
  },
  async beforeMount() {
    this.user = await this.$axios.$post('http://localhost:3000/api/connection', {Mail: 'test@test.fr', Password: 'test'});
    console.log(this.user);
  },
  methods: {
    getNameAndEmail,
  }
}
</script>

<style scoped lang="scss">

</style>
