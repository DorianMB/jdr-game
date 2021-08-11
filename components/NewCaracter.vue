<template>
  <b-modal id="modal-new-caracter"
           title="Nouveau personnage"
           @ok="handleOk"
           @show="clear"
           ok-title="Valider"
           cancel-title="Annuler">
    <b-form @submit="onSubmit" class="d-flex flex-column align-items-center w-100">
      <b-form-group
        id="input-group-url"
        label="Image de votre personnage"
        label-for="input-url"
      >
        <b-form-input
          id="input-url"
          v-model="form.url"
          type="text"
          placeholder="Entrer une url d'image"
          :state="validation"
          required
        ></b-form-input>
      </b-form-group>
      <b-img v-if="form.url" :src="form.url" alt="preview" class="img-fluid mb-3"></b-img>
      <b-form-group
        id="input-group-name"
        label="Nom du personnage"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          placeholder="Entrer le nom"
          :state="validation"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import {createCaracter} from "../static/Functions";

export default {
  name: "NewCaracter",
  data() {
    return {
      form: {
        url: null,
        name: null,
      },
      validation: null
    }
  },

  methods: {
    async onSubmit() {
      console.log('submit');
      const token = JSON.parse(localStorage.getItem('token'));
      await this.createCaracter(this.$axios, token.user_id, this.form);
      this.$nextTick(() => {
        this.$emit('closeModal');
        this.$bvModal.hide('modal-new-caracter')
      })
    },
    handleOk(event) {
      event.preventDefault();
      this.onSubmit();
    },
    clear() {
      this.form.name = null;
      this.form.url = null;
    },
    createCaracter
  }
}
</script>

<style lang="scss">
  .form-group {
    width: 100%;
  }
</style>
