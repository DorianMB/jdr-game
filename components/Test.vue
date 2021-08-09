<template>
  <h1 v-if="user.name">
    {{getNameAndEmail(user)}}
    <font-awesome-icon :icon="['fas', 'chart-bar']" class="ml-2"></font-awesome-icon>
  </h1>
</template>

<script>
import {User} from "../static/models/user";
import {Item} from "../static/models/item";

import {getNameAndEmail} from "../static/Functions";
import * as ApiUrls from "../static/ApiUrls";

export default {
  name: "Test",
  data() {
    return {
      user: User,
      items: [Item]
    }
  },
  async beforeMount() {
    const sendUser = {mail: 'test@test.fr', password: 'test'};
    this.user = await this.$axios.$post(ApiUrls.GET_API_CONNECTION(), sendUser);
    this.items = await this.$axios.$get(ApiUrls.GET_API_ALL_ITEMS());
    console.log(this.user, this.items);
  },
  methods: {
    getNameAndEmail,
  }
}
</script>

<style scoped lang="scss">

</style>
