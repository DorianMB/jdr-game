<template>
  <h1 v-if="user.Name">
    {{getNameAndEmail(user)}}
    <font-awesome-icon :icon="['fas', 'chart-bar']" class="ml-2"></font-awesome-icon>
  </h1>
</template>

<script>
import {User} from "../static/models/user";
import {getNameAndEmail} from "../static/Functions";
import {Equipement} from "../static/models/equipement";

export default {
  name: "Test",
  data() {
    return {
      user: User,
      equipement: [Equipement]
    }
  },
  async beforeMount() {
    this.user = await this.$axios.$post('http://localhost:3000/api/connection', {Mail: 'test@test.fr', Password: 'test'});
    this.equipement = await this.$axios.$get('http://localhost:3000/api/equipements');
    console.log(this.user, this.equipement);
  },
  methods: {
    getNameAndEmail,
  }
}
</script>

<style scoped lang="scss">

</style>
