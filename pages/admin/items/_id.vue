<template>
  <div class="d-flex justify-content-center w-100">
    <b-form class="d-flex flex-column align-items-center w-50 my-5" @submit="onSubmit" v-if="item && type">
      <b-form-group
        id="input-group-type"
        label="De quel type est l'item ?"
        label-for="input-type"
        label-class="required"
      >
        <b-form-select id="input-type" v-model="type" :options="optionsType" required></b-form-select>
        <p class="text-danger" v-if="showMessage && type == null">this field is required</p>
      </b-form-group>
      <div v-if="type" class="w-100">
        <b-form-group
          id="input-group-bag"
          label="Dans quel sac est l'objet?"
          label-for="input-bag"
          v-if="!caracter"
        >
          <b-form-select id="input-bag" v-model="item.bag_id" :options="optionsCaracter"></b-form-select>
        </b-form-group>
        <p v-if="caracter">Cet objet est équipé sur {{caracter.name}}</p>
        <b-form-group
          id="input-group-level"
          label="Niveau de votre objet"
          label-for="input-level"
          label-class="required"
        >
          <b-form-input
            id="input-level"
            v-model="item.level"
            placeholder="Entrer le niveau"
            required
            type="number"
          ></b-form-input>
          <p class="text-danger" v-if="showMessage && item.level == null">this field is required</p>
        </b-form-group>
        <b-form-group
          id="input-group-strength"
          :label="'Force de votre objet'+ this.asLimit(type.strength_min, type.strength_max)"
          label-for="input-strength"
        >
          <b-form-input
            id="input-strength"
            v-model="item.strength"
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
            v-model="item.intelligence"
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
            v-model="item.speed"
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
            v-model="item.charisma"
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
            v-model="item.health"
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
            v-model="item.luck"
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
          <b-form-checkbox id="input-charm" v-model="item.charm" name="check-charm" size="lg" switch required>
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          id="input-group-charm-type"
          label="Type d'enchantement de votre objet"
          label-for="input-charm-type"
        >
          <b-form-select id="input-charm-type" v-model="item.charm_type" :options="charmTypeLoot"></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-charm-value"
          label="Valeur de votre enchantement"
          label-for="input-charm-value"
        >
          <b-form-input
            id="input-charm-value"
            v-model="item.charm_value"
            placeholder="Entrer la  valeur"
            type="number"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <b-button type="submit" variant="primary" class="mx-2">
          Mettre a jour
        </b-button>
        <b-button type="button" variant="danger" class="mx-2" href="/admin">
          Retour
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import * as constants from "static/Constants";
import {API_CARACTERS_BY_EQUIPEMENT, API_LOOT_TABLE} from "static/ApiUrls";
import * as ApiUrls from "static/ApiUrls";
import {Item} from "static/models/item";
import {Caracter} from "static/models/caracter";

export default {
  name: "_id",
  async asyncData({params}) {
    const id = params.id;
    return {id}
  },
  data() {
    return {
      type: null,
      optionsType: [],
      optionsCaracter: [],
      item: {
        type: Item,
        default: null,
      },
      caracter: null,
      charmTypeLoot: constants.charmTypeLoot,
      showMessage: false
    }
  },
  async beforeMount() {
    const res = await this.$axios.$get(ApiUrls.API_ITEMS() + '/' + this.id);
    this.item = res.data[0];
    if (this.item.charm === 1) {
      this.item.charm = true;
    } else {
      this.item.charm = false;
    }
    console.log('item', this.item);
    await this.getLootTables();
    await this.getCaracters();
    await this.caracterWithTheItem();
  },
  methods: {
    async onSubmit() {
      // if some required field is empty, show error message
      if (
        (this.type == null ||
          this.item.level == null ||
          this.item.charm == null) && this.automatic === false
      ) {
        this.showMessage = true;
        return;
      } else {
        this.showMessage = false;
        this.item.loot_id = this.type.loot_id;
        await this.$axios.$put(ApiUrls.API_ITEMS() + '/' + this.id, this.item);
      }
    },
    async getLootTables() {
      const response = await this.$axios.$get(API_LOOT_TABLE());
      this.optionsType = response.data.map(lootTable => {
        return {
          text: lootTable.name,
          value: lootTable
        }
      });
      const selectedOption = this.optionsType.find(op => {
        return op.value.loot_id === this.item.loot_id;
      });
      this.type = selectedOption.value;
    },
    async getCaracters() {
      const response = await this.$axios.$get(ApiUrls.API_CARACTERS());
      this.optionsCaracter = response.data.map(caracter => {
        return {
          text: caracter.name,
          value: caracter.bag_id
        }
      });
    },
    async caracterWithTheItem() {
      const response = await this.$axios.$get(ApiUrls.API_EQUIPEMENTS_BY_ITEMS() + '/' + this.id);
      if (response.data.length > 0) {
        const cara = await this.$axios.$get(ApiUrls.API_CARACTERS_BY_EQUIPEMENT() + '/' + response.data[0].equipement_id);
        this.caracter = cara.data[0];
        console.log('caracter data', cara.data[0]);
      }
      console.log('caracter', this.caracter);
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
  }
}
</script>

<style scoped>

</style>
