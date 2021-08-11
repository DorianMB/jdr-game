<template>
  <div class="d-flex justify-content-center align-items-center connexion">
    <div class="d-flex flex-column align-items-center full-card p-3">
      <h2>Connexion</h2>
      <b-form @submit="onSubmit" class="d-flex flex-column align-items-center w-100">
        <b-form-group
          id="input-group-email"
          label="Email"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            placeholder="Entrer l'email"
            :state="validation"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-password"
          label="Mot de passe"
          label-for="input-password"
          description="Votre mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre"
        >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder="Entrer le mot de passe"
            :state="validation"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox
          id="checkbox-stay"
          v-model="form.stay"
          name="checkbox-stay"
          value="true"
          unchecked-value="false"
          class="mb-3"
        >
          Rester connecté(e)
        </b-form-checkbox>
        <nuxt-link class="text-secondary mb-3" to="inscription">Vous n'etes pas encore inscrit ?</nuxt-link>
        <b-alert v-model="showAlert" variant="danger" dismissible>
          {{message}}
        </b-alert>
        <b-button type="submit" variant="primary">Se connecter</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import {User} from "../static/models/user";

import * as ApiUrls from "../static/ApiUrls";
import * as moment from "moment";

export default {
  name: "admin",
  data() {
    return {
      form: {
        email: null,
        password: null,
        stay: false
      },
      user: User,
      validation: null,
      message: '',
      showAlert: false,
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const sendUser = {mail: this.form.email, password: this.form.password};
      const result = await this.$axios.$post(ApiUrls.GET_API_CONNECTION(), sendUser);
      if (!result.success) {
        this.validation = false;
        this.message = result.message;
        this.showAlert = true;
      } else {
        this.user = result.data;
        if (this.user.name) {
          const token = this.user;
          !this.form.stay ? token.expiration = moment().add(24, 'hours').toISOString() : token.expiration = false;
          localStorage.setItem('token', JSON.stringify(token));
          await this.$router.push('caracters-list');
        }
      }
    },
  }
}
</script>

<style lang="scss">
  .connexion {
    height: 100vh;
    .form-group {
      width: 100%;
    }
  }
</style>
