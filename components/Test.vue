<template>
  <h1 v-if="user.Name">
    {{user.getNameAndEmail()}}
    <font-awesome-icon :icon="['fas', 'chart-bar']" class="ml-2"></font-awesome-icon>
  </h1>
</template>

<script>
import {User} from "../models/user";

export default {
  name: "Test",
  data() {
    return {
      user: User
    }
  },
  async beforeMount() {
    this.user = new User();
    const result = await this.$axios.$get('http://localhost:3000/api/users');
    this.user.Name = result[0].Name;
    this.user.Mail = result[0].Mail;
    console.log(this.user);
  }
}
</script>

<style scoped lang="scss">

</style>
