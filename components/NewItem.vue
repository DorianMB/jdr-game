<template>
  <b-modal id="modal-new-item"
           cancel-title="Annuler"
           ok-title="Valider"
           title="Nouvel item"
           @ok="handleOk"
           @show="clear">
    <b-form class="d-flex flex-column align-items-center w-100" @submit="onSubmit">
      <b-form-group
        id="input-group-type"
        label="De quel type est l'item ?"
        label-for="input-type"
        label-class="required"
      >
        <b-form-select id="input-type" v-model="type" :options="options" required></b-form-select>
        <p class="text-danger" v-if="showMessage && type == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-auto"
        label="Générer automatiquement l'objet ?"
        label-for="input-auto"
      >
        <b-form-checkbox id="input-auto" v-model="automatic" name="check-auto" size="lg" switch>
        </b-form-checkbox>
      </b-form-group>
      <div v-if="type && !automatic" class="w-100">
        <b-form-group
          id="input-group-level"
          label="Niveau de votre objet"
          label-for="input-level"
          label-class="required"
        >
          <b-form-input
            id="input-level"
            v-model="form.level"
            placeholder="Entrer le niveau"
            required
            type="number"
          ></b-form-input>
          <p class="text-danger" v-if="showMessage && form.level == null">this field is required</p>
        </b-form-group>
        <b-form-group
          id="input-group-strength"
          :label="'Force de votre objet'+ this.asLimit(type.strength_min, type.strength_max)"
          label-for="input-strength"
        >
          <b-form-input
            id="input-strength"
            v-model="form.strength"
            placeholder="Entrer la valeur"
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-intelligence"
          :label="'Intelligence de votre objet'+ this.asLimit(type.intelligence_min, type.intelligence_max)"
          label-for="input-intelligence"
        >
          <b-form-input
            id="input-intelligence"
            v-model="form.intelligence"
            placeholder="Entrer la valeur"
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-speed"
          :label="'Vitesse de votre objet'+ this.asLimit(type.speed_min, type.speed_max)"
          label-for="input-speed"
        >
          <b-form-input
            id="input-speed"
            v-model="form.speed"
            placeholder="Entrer la valeur"
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-charisma"
          :label="'Charisme de votre objet'+ this.asLimit(type.charisma_min, type.charisma_max)"
          label-for="input-charisma"
        >
          <b-form-input
            id="input-charisma"
            v-model="form.charisma"
            placeholder="Entrer la valeur"
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-health"
          :label="'Vie de votre objet'+ this.asLimit(type.health_min, type.health_max)"
          label-for="input-health"
        >
          <b-form-input
            id="input-health"
            v-model="form.health"
            placeholder="Entrer la valeur"
            type="number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-luck"
          :label="'Chance de votre objet'+ this.asLimit(type.luck_min, type.luck_max)"
          label-for="input-luck"
        >
          <b-form-input
            id="input-luck"
            v-model="form.luck"
            placeholder="Entrer la valeur"
            type="number"
          ></b-form-input>
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
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import * as constants from "static/Constants";
import {createItem} from "static/Functions";
import {createItemAuto} from "static/Functions";
import {API_LOOT_TABLE} from "static/ApiUrls";

export default {
  name: "NewItem",
  props: {
    reload: {
      type: Function,
    }
  },
  data() {
    return {
      type: null,
      automatic: false,
      options: [],
      form: {
        level: null,
        strength: null,
        intelligence: null,
        speed: null,
        charisma: null,
        health: null,
        luck: null,
        charm: false,
        charm_type: null,
        charm_value: null,
        loot_id: null,
      },
      charmTypeLoot: constants.charmTypeLoot,
      showMessage: false
    }
  },
  beforeMount() {
    this.getLootTables();
  },
  methods: {
    async onSubmit() {
      // if some required field is empty, show error message
      if (
        (this.type == null ||
        this.form.level == null ||
        this.form.charm == null) && this.automatic === false
      ) {
        this.showMessage = true;
        return;
      } else {
        this.showMessage = false;
        this.form.loot_id = this.type.loot_id;
        if (this.automatic) {
          await this.createItemAuto(this.$axios, this.type, null);
          this.$nextTick(() => {
            this.$emit('closeModal');
            this.reload();
            this.$bvModal.hide('modal-new-item')
          })
        } else {
          console.log('submit', this.form);
          await this.createItem(this.$axios, this.form);
          this.$nextTick(() => {
            this.$emit('closeModal');
            this.reload();
            this.$bvModal.hide('modal-new-item')
          })
        }
      }
    },
    handleOk(event) {
      event.preventDefault();
      this.onSubmit();
    },
    clear() {
      // clear all data in form
      this.type = null;
      this.form.strength = null;
      this.form.intelligence = null;
      this.form.speed = null;
      this.form.charisma = null;
      this.form.health = null;
      this.form.luck = null;
      this.form.charm = false;
      this.form.charm_type = null;
      this.form.charm_value = null;
    },
    async getLootTables() {
      const response = await this.$axios.$get(API_LOOT_TABLE());
      this.options = response.data.map(lootTable => {
        return {
          text: lootTable.name,
          value: lootTable
        }
      });
      console.log('loot tables', this.options);
    },
    asLimit(min, max) {
      if (min && max) {
        return ' (entre ' + min + ' et ' + max + ')';
      } else if (min) {
        return ' (supérieur ou égal à ' + min + ')';
      } else if (max) {
        return ' (inférieur ou égal à ' + max + ')';
      } else {
        return '';
      }
    },
    createItem,
    createItemAuto
  }
}
</script>

<style scoped>

</style>
