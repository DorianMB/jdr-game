<template>
  <div class="d-flex justify-content-center w-100">
    <b-form class="d-flex flex-column align-items-center w-50 my-5" @submit="onSubmit">
      <b-form-group
        id="input-group-name"
        label="Nom de votre objet"
        label-for="input-name"
        label-class="required"
      >
        <b-form-input
          id="input-name"
          v-model="lootTable.name"
          placeholder="Entrer le nom"
          required
          type="text"
        ></b-form-input>
        <p class="text-danger" v-if="showMessage && lootTable.name == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-desc"
        label="Description de votre objet"
        label-for="input-desc"
      >
        <b-form-textarea
          id="textarea"
          v-model="lootTable.description"
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
        <b-form-select id="input-type" v-model="lootTable.type" :options="typeLoot" required></b-form-select>
        <p class="text-danger" v-if="showMessage && lootTable.type == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-picture"
        label="Image de votre objet"
        label-for="input-picture"
        label-class="required"
      >
        <b-form-input
          id="input-picture"
          v-model="lootTable.picture"
          placeholder="Entrer une url d'image"
          required
          type="text"
        ></b-form-input>
        <p class="text-danger" v-if="showMessage && lootTable.picture == null">this field is required</p>
      </b-form-group>
      <b-img v-if="lootTable.picture" :src="lootTable.picture" alt="preview" class="img-fluid mb-3" :style="{height: '100px'}"></b-img>
      <b-form-group
        id="input-group-fight-picture"
        label="Image de combat"
        label-for="input-fight-picture"
      >
        <b-form-input
          id="input-fight-picture"
          v-model="lootTable.fight_picture"
          placeholder="Entrer une url d'image"
          type="text"
        ></b-form-input>
      </b-form-group>
      <b-img v-if="lootTable.fight_picture" :src="lootTable.fight_picture" alt="preview" class="img-fluid mb-3" :style="{height: '100px'}"></b-img>
      <b-form-group
        id="input-group-rarity"
        label="Rareté de votre objet"
        label-for="input-rarity"
        label-class="required"
      >
        <b-form-select id="input-rarity" v-model="lootTable.rarity" :options="rarityLoot" required></b-form-select>
        <p class="text-danger" v-if="showMessage && lootTable.rarity == null">this field is required</p>
      </b-form-group>
      <b-form-group
        id="input-group-damage"
        label="Dégat max et min"
        label-for="input-damage"
      >
        <div class="d-flex">
          <b-form-input
            id="input-damage"
            v-model="lootTable.damage_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-damage"
            v-model="lootTable.damage_max"
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
            v-model="lootTable.armor_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-armor"
            v-model="lootTable.armor_max"
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
            v-model="lootTable.strength_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-strength"
            v-model="lootTable.strength_max"
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
            v-model="lootTable.intelligence_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-intelligence"
            v-model="lootTable.intelligence_max"
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
            v-model="lootTable.speed_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-speed"
            v-model="lootTable.speed_max"
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
            v-model="lootTable.charisma_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-charisma"
            v-model="lootTable.charisma_max"
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
            v-model="lootTable.health_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-health"
            v-model="lootTable.health_max"
            class="mx-1"
            placeholder="Entrer le max"
            type="number"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-form-group
        id="input-group-luck"
        label="Vie max et min"
        label-for="input-luck"
      >
        <div class="d-flex">
          <b-form-input
            id="input-luck"
            v-model="lootTable.luck_min"
            class="mx-1"
            placeholder="Entrer le min"
            type="number"
          ></b-form-input>
          <b-form-input
            id="input-luck"
            v-model="lootTable.luck_max"
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
      >
        <b-form-checkbox id="input-charm" v-model="lootTable.charm" name="check-charm" size="lg" switch>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group
        id="input-group-charm-type"
        label="Type d'enchantement de votre objet"
        label-for="input-charm-type"
      >
        <b-form-select id="input-charm-type" v-model="lootTable.charm_type" :options="charmTypeLoot"></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-charm-value"
        label="Valeur de votre enchantement"
        label-for="input-charm-value"
      >
        <b-form-input
          id="input-charm-value"
          v-model="lootTable.charm_value"
          placeholder="Entrer la  valeur"
          type="number"
        ></b-form-input>
      </b-form-group>
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
import {LootTable} from "static/models/lootTable";
import * as ApiUrls from "static/ApiUrls";
import * as constants from "static/constants";

export default {
  name: "_id",
  async asyncData({params}) {
    const id = params.id;
    return {id}
  },
  data() {
    return {
      lootTable: {
        type: LootTable,
        default: null
      },
      charmTypeLoot: constants.charmTypeLoot,
      rarityLoot: constants.rarityLoot,
      typeLoot: constants.typeLoot,
      showMessage: false,
    }
  },
  async beforeMount() {
    const res = await this.$axios.$get(ApiUrls.API_LOOT_TABLE() + '/' + this.id);
    this.lootTable = res.data[0];
  },
  methods: {
    async onSubmit() {
      // if some required field is empty, show error message
      if (
        this.lootTable.name == null ||
        this.lootTable.rarity == null ||
        this.lootTable.picture == null ||
        this.lootTable.type == null
      ) {
        this.showMessage = true;
        return;
      } else {
        this.showMessage = false;
        await this.$axios.$put(ApiUrls.API_LOOT_TABLE() + '/' + this.id, this.lootTable);
        this.$nextTick(() => {
          this.$emit('closeModal');
          this.reload();
          this.$bvModal.hide('modal-new-loot-table')
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
