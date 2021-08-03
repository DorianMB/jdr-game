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
    const result = await this.$axios.$get('http://localhost:3000/api/users');
    this.user = result[0];
    console.log(this.user);
  },
  methods: {
    getNameAndEmail,
  }
}
</script>

<style scoped lang="scss">

</style>
