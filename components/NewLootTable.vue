<template>
  <b-modal id="modal-new-loot-table"
           cancel-title="Annuler"
           ok-title="Valider"
           title="Nouvelle table de loot"
           @ok="handleOk"
           @show="clear">
    <b-form class="d-flex flex-column align-items-center w-100" @submit="onSubmit">
      <b-form-group
        id="input-group-name"
        label="Nom de votre objet"
        label-for="input-name"
        label-class="required"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          placeholder="Entrer le nom"
          required
          type="text"
        ></b-form-input>
        <p class="text-danger" v-if="showMessage && form.name == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-desc"
        label="Description de votre objet"
        label-for="input-desc"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.description"
          placeholder="Enter something..."
          rows="3"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="input-group-type"
        label="Type de votre objet"
        label-for="input-type"
        label-class="required"
      >
        <b-form-select id="input-type" v-model="form.type" :options="typeLoot" required></b-form-select>
        <p class="text-danger" v-if="showMessage && form.type == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-picture"
        label="Image de votre objet"
        label-for="input-picture"
        label-class="required"
      >
        <b-form-input
          id="input-picture"
          v-model="form.picture"
          placeholder="Entrer une url d'image"
          required
          type="text"
        ></b-form-input>
        <p class="text-danger" v-if="showMessage && form.picture == null">this field is required</p>
      </b-form-group>
      <b-img v-if="form.picture" :src="form.picture" alt="preview" class="img-fluid mb-3"></b-img>
      <b-form-group
        id="input-group-fight-picture"
        label="Image de combat"
        label-for="input-fight-picture"
      >
        <b-form-input
          id="input-fight-picture"
          v-model="form.fight_picture"
          placeholder="Entrer une url d'image"
          type="text"
        ></b-form-input>
      </b-form-group>
      <b-img v-if="form.fight_picture" :src="form.fight_picture" alt="preview" class="img-fluid mb-3"></b-img>
      <b-form-group
        id="input-group-rarity"
        label="Rareté de votre objet"
        label-for="input-rarity"
        label-class="required"
      >
        <b-form-select id="input-rarity" v-model="form.rarity" :options="rarityLoot" required></b-form-select>
        <p class="text-danger" v-if="showMessage && form.rarity == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-damage"
        label="Dégat max et min"
        label-for="input-damage"
      >
        <div class="d-flex">
          <b-form-input
            id="input-damage"
            v-model="form.damage_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-damage"
            v-model="form.damage_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-armor"
        label="Armure max et min"
        label-for="input-armor"
      >
        <div class="d-flex">
          <b-form-input
            id="input-armor"
            v-model="form.armor_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-armor"
            v-model="form.armor_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-strength"
        label="Force max et min"
        label-for="input-strength"
      >
        <div class="d-flex">
          <b-form-input
            id="input-strength"
            v-model="form.strength_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-strength"
            v-model="form.strength_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-intelligence"
        label="Intelligence max et min"
        label-for="input-intelligence"
      >
        <div class="d-flex">
          <b-form-input
            id="input-intelligence"
            v-model="form.intelligence_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-intelligence"
            v-model="form.intelligence_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-speed"
        label="Vitesse max et min"
        label-for="input-speed"
      >
        <div class="d-flex">
          <b-form-input
            id="input-speed"
            v-model="form.speed_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-speed"
            v-model="form.speed_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-charisma"
        label="Charisme max et min"
        label-for="input-charisma"
      >
        <div class="d-flex">
          <b-form-input
            id="input-charisma"
            v-model="form.charisma_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-charisma"
            v-model="form.charisma_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-health"
        label="Vie max et min"
        label-for="input-health"
      >
        <div class="d-flex">
          <b-form-input
            id="input-health"
            v-model="form.health_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-health"
            v-model="form.health_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-luck"
        label="Chance max et min"
        label-for="input-luck"
      >
        <div class="d-flex">
          <b-form-input
            id="input-luck"
            v-model="form.luck_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-luck"
            v-model="form.luck_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-charm"
        label="Votre objet est-il enchanté ?"
        label-for="input-charm"
        label-class="required"
      >
        <b-form-checkbox id="input-charm" v-model="form.charm" name="check-charm" size="lg" switch required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group
        id="input-group-charm-type"
        label="Type d'enchantement de votre objet"
        label-for="input-charm-type"
      >
        <b-form-select id="input-charm-type" v-model="form.charm_type" :options="charmTypeLoot"></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-charm-value"
        label="Valeur de votre enchantement"
        label-for="input-charm-value"
      >
        <b-form-input
          id="input-charm-value"
          v-model="form.charm_value"
          placeholder="Entrer la  valeur"
          type="number"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import {createLootTable} from "static/Functions";
import * as constants from "static/Constants";

export default {
  name: "NewLootTable",
  props: {
    reload: {
      type: Function,
    }
  },
  data() {
    return {
      typeLoot: constants.typeLoot,
      rarityLoot: constants.rarityLoot,
      charmTypeLoot: constants.charmTypeLoot,
      form: {
        type: null,
        picture: null,
        fight_picture: null,
        name: null,
        description: null,
        rarity: null,
        damage_min: null,
        damage_max: null,
        armor_min: null,
        armor_max: null,
        strength_min: null,
        strength_max: null,
        intelligence_min: null,
        intelligence_max: null,
        speed_min: null,
        speed_max: null,
        charisma_min: null,
        charisma_max: null,
        health_min: null,
        health_max: null,
        luck_min: null,
        luck_max: null,
        charm: false,
        charm_type: null,
        charm_value: null,
      },
      showMessage: false
    }
  },
  methods: {
    async onSubmit() {
      // if some required field is empty, show error message
      if (
        this.form.name == null ||
        this.form.rarity == null ||
        this.form.picture == null ||
        this.form.type == null ||
        this.form.charm == null
      ) {
        this.showMessage = true;
        return;
      } else {
        this.showMessage = false;
        const token = JSON.parse(localStorage.getItem('token'));
        await this.createLootTable(this.$axios, this.form);
        this.$nextTick(() => {
          this.$emit('closeModal');
          this.reload();
          this.$bvModal.hide('modal-new-loot-table')
        })
      }
    },
    handleOk(event) {
      event.preventDefault();
      this.onSubmit();
    },
    clear() {
      // clear all data in form
      this.form.name = null;
      this.form.description = null;
      this.form.picture = null;
      this.form.fight_picture = null;
      this.form.rarity = null;
      this.form.type = null;
      this.form.damage_min = null;
      this.form.damage_max = null;
      this.form.armor_min = null;
      this.form.armor_max = null;
      this.form.strength_min = null;
      this.form.strength_max = null;
      this.form.intelligence_min = null;
      this.form.intelligence_max = null;
      this.form.speed_min = null;
      this.form.speed_max = null;
      this.form.charisma_min = null;
      this.form.charisma_max = null;
      this.form.health_min = null;
      this.form.health_max = null;
      this.form.luck_min = null;
      this.form.luck_max = null;
      this.form.charm = false;
      this.form.charm_type = null;
      this.form.charm_value = null;
    },
    createLootTable
  }
}
</script>

<style scoped>

</style>
