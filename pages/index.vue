<template>
  <div class="d-flex justify-content-center align-items-center connexion">
    <div class="d-flex flex-column align-items-center w-75 shadow rounded p-3">
      <h2>Connexion</h2>
      <b-form @submit="onSubmit" class="d-flex flex-column align-items-center w-100">
        <b-form-group
          id="input-group-email"
          label="Email address"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            :state="validation"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-password"
          label="Password"
          label-for="input-password"
          description="Your password must be 8-20 characters long, contain letters and numbers, and must not
            contain spaces, special characters, or emoji."
        >
          <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            :state="validation"
            required
          ></b-form-input>
        </b-form-group>
        <b-alert v-model="showAlert" variant="danger" dismissible>
          {{message}}
        </b-alert>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import {User} from "../static/models/user";

import * as ApiUrls from "../static/ApiUrls";

export default {
  name: "admin",
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      user: User,
      validation: null,
      message: '',
      showAlert: false
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
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          await this.$router.push('game');
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
