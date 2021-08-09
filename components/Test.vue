<template>
  <h1 v-if="user.name">
    {{getNameAndEmail(user)}}
    <font-awesome-icon :icon="['fas', 'chart-bar']" class="ml-2"></font-awesome-icon>
  </h1>
</template>

<script>
import {User} from "../static/models/user";
import {getNameAndEmail} from "../static/Functions";
import {Bag} from "../static/models/bag";

export default {
  name: "Test",
  data() {
    return {
      user: User,
      bag: [Bag]
    }
  },
  async beforeMount() {
    const sendUser = {mail: 'test@test.fr', password: 'test'};
    this.user = await this.$axios.$post('http://localhost:3000/api/connection', sendUser);
    this.bag = await this.$axios.$get('http://localhost:3000/api/bags');
    console.log(this.user, this.bag);
  },
  methods: {
    getNameAndEmail,
  }
}
</script>

<style scoped lang="scss">

</style>
