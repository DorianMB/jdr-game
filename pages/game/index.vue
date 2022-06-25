<template>
  <div class="d-flex flex-column align-items-center">
    <h1 v-if="user.name">Bonjour {{user.name}}</h1>
    <div class="mt-3 w-100  d-flex flex-wrap justify-content-center" v-if="caracters[0]">
      <div v-for="(caracter, key) in caracters"
           :key="key"
           class="caracter-card col-3 shadow m-3"
           :style="{ backgroundImage: `url(${caracter.picture})`}"
           @click="goToDetail(caracter)">
        <span>{{caracter.name}}</span>
      </div>
    </div>
    <b-button type="button" class="mt-3" v-b-modal.modal-new-caracter>Nouveau personnage</b-button>
    <NewCaracter @closeModal="getAllCaracters"></NewCaracter>
  </div>
</template>

<script>
import {User} from "../../static/models/user";
import {Caracter} from "../../static/models/caracter";
import * as ApiUrl from "../../static/ApiUrls";

export default {
  name: "index",
  data() {
    return {
      user: User,
      caracters: {
        type: [Caracter],
        default: null
      }
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('token'));
    this.getAllCaracters();
  },
  methods: {
    async getAllCaracters() {
      const res = await this.$axios.$get(ApiUrl.API_CARACTERS_BY_USER() + '/' + this.user.user_id);
      this.caracters = res.data;
    },
    goToDetail(data) {
      this.$router.push('/game/' + data.caracter_id);
    }
  }
}
</script>

<style scoped>

</style>
