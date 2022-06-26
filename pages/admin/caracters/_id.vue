<template>
  <div class="w-100 p-5 row">
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="helmet-slot">
        <img v-if="itemsInEquipement.helmet && itemsInEquipement.helmet.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.helmet.loot_id) + itemsInEquipement.helmet.item_id"
             :src="getImageByLootTable(itemsInEquipement.helmet.loot_id)" width="100" height="100"
             data-type="helmet">
      </div>
      <div class="item-slot" id="chestplate-slot">
        <img v-if="itemsInEquipement.chestplate && itemsInEquipement.chestplate.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.chestplate.loot_id) + itemsInEquipement.chestplate.item_id"
             :src="getImageByLootTable(itemsInEquipement.chestplate.loot_id)" width="100" height="100"
             data-type="chestplate">
      </div>
      <div class="item-slot" id="primary-magic-item-slot">
        <img v-if="itemsInEquipement.primary_magic_item && itemsInEquipement.primary_magic_item.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.primary_magic_item.loot_id) + itemsInEquipement.primary_magic_item.item_id"
             :src="getImageByLootTable(itemsInEquipement.primary_magic_item.loot_id)" width="100" height="100"
             data-type="primary_magic_item">
      </div>
    </div>
    <div class="col-6 d-flex flex-wrap justify-content-center">
      <div class="img-caracter" :style="{ backgroundImage: `url(${caracter.picture})`}"></div>
      <div class="item-slot mx-2" id="primary-weapon-slot">
        <img v-if="itemsInEquipement.primary_weapon && itemsInEquipement.primary_weapon.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.primary_weapon.loot_id) + itemsInEquipement.primary_weapon.item_id"
             :src="getImageByLootTable(itemsInEquipement.primary_weapon.loot_id)" width="100" height="100"
             data-type="primary_weapon">
      </div>
      <div class="item-slot mx-2" id="secondary-weapon-slot"></div>
    </div>
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="gloves-slot"></div>
      <div class="item-slot" id="boots-slot"></div>
      <div class="item-slot" id="secondary-magic-item-slot">
        <img v-if="itemsInEquipement.secondary_magic_item && itemsInEquipement.secondary_magic_item.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.secondary_magic_item.loot_id) + itemsInEquipement.secondary_magic_item.item_id"
             :src="getImageByLootTable(itemsInEquipement.secondary_magic_item.loot_id)" width="100" height="100"
             data-type="secondary_magic_item">
      </div>
    </div>
    <div class="bag-container w-100 mx-auto d-flex flex-wrap justify-content-center">
      <div v-for="index in bag.length"
           class="item-slot mx-2"
           :key="index"
           :id="'bag' + index">
        <img v-if="itemsInBag[index - 1] && itemsInBag[index - 1].loot_id"
             :id="getTypeByLootTable(itemsInBag[index - 1].loot_id) + itemsInBag[index - 1].item_id"
             :src="getImageByLootTable(itemsInBag[index - 1].loot_id)" width="100" height="100"
             :data-type="'bag' + index">
      </div>
    </div>
  </div>
</template>

<script>
import * as ApiUrls from "static/ApiUrls";
import {Caracter} from "static/models/caracter";
import {Bag} from "static/models/bag";
import {Equipement} from "static/models/equipement";

export default {
  name: "_id",
  async asyncData({params}) {
    const id = params.id;
    return {id}
  },
  data() {
    return {
      caracter: {
        type: Caracter,
        default: null
      },
      bag: {
        type: Bag,
        default: null
      },
      equipement: {
        type: Equipement,
        default: null
      },
      itemsInBag: [],
      itemsInEquipement: {
        helmet: null,
        chestplate: null,
        primary_weapon: null,
        secondary_weapon: null,
        gloves: null,
        boots: null,
        primary_magic_item: null,
        secondary_magic_item: null
      },
      lootTable : [],
    }
  },
  async beforeMount() {
    const res = await this.$axios.$get(ApiUrls.API_CARACTERS() + '/' + this.id);
    this.caracter = res.data[0];
    const resBag = await this.$axios.$get(ApiUrls.API_BAGS() + '/' + this.caracter.bag_id);
    this.bag = resBag.data[0];
    const resEquipement = await this.$axios.$get(ApiUrls.API_EQUIPEMENTS() + '/' + this.caracter.equipement_id);
    this.equipement = resEquipement.data[0];
    this.getAllItemsInBag();
    this.getAllEquipement();
  },
  methods: {
    async getAllItemsInBag() {
      const itemsBag = await this.$axios.$get(ApiUrls.API_ITEMS_BY_BAG() + '/' + this.bag.bag_id);
      this.itemsInBag = itemsBag.data;
      // for all item in itemsInBag run updateLootTable
      for (let i = 0; i < this.itemsInBag.length; i++) {
        await this.updateLootTable(this.itemsInBag[i]);
      }
    },
    getAllEquipement() {
      // foreach property of equipement
      // itemsInEquipement[property] = await this.$axios.$get(API_ITEMS() + this.equipement[property]);
      // skip when property is null
      // skip when property is equipement_id
      Object.keys(this.equipement).forEach(async property => {
        if (property !== null && property !== 'equipement_id') {
          const res = await this.$axios.$get(ApiUrls.API_ITEMS() + '/' + this.equipement[property]);
          this.itemsInEquipement[property.replace('_id', '')] = res.data[0];
          await this.updateLootTable(res.data[0]);
        }
      })
    },
    getImageByLootTable(loot_id) {
      const loot = this.lootTable.find(loot => {
        return loot.loot_id === loot_id;
      });
      if (loot) {
        return loot.picture;
      } else {
        return '';
      }
    },
    getTypeByLootTable(loot_id) {
      const loot = this.lootTable.find(loot => {
        return loot.loot_id === loot_id;
      });
      if (loot) {
        return loot.type;
      } else {
        return '';
      }
    },
    async updateLootTable(item) {
      const loot = await this.$axios.$get(ApiUrls.API_LOOT_TABLE() + '/' + item.loot_id);
      this.lootTable.push(loot.data[0]);
    },
  }
}
</script>

<style scoped lang="scss">
.img-caracter {
  width: 300px;
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid black;
}
.item-slot {
  width: 120px;
  height: 120px;
  border: 2px solid black;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
