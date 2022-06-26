<template>
  <div class="w-100 p-5 row" @click="closeTooltip()">
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="helmet-slot" @mouseover="openTooltip($event, itemsInEquipement.helmet)">
        <img v-if="itemsInEquipement.helmet && itemsInEquipement.helmet.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.helmet.loot_id) + itemsInEquipement.helmet.item_id"
             :src="getImageByLootTable(itemsInEquipement.helmet.loot_id)" width="100" height="100"
             data-type="helmet">
      </div>
      <div class="item-slot" id="chestplate-slot" @mouseover="openTooltip($event, itemsInEquipement.chestplate)">
        <img v-if="itemsInEquipement.chestplate && itemsInEquipement.chestplate.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.chestplate.loot_id) + itemsInEquipement.chestplate.item_id"
             :src="getImageByLootTable(itemsInEquipement.chestplate.loot_id)" width="100" height="100"
             data-type="chestplate">
      </div>
      <div class="item-slot" id="primary-magic-item-slot" @mouseover="openTooltip($event, itemsInEquipement.primary_magic_item)">
        <img v-if="itemsInEquipement.primary_magic_item && itemsInEquipement.primary_magic_item.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.primary_magic_item.loot_id) + itemsInEquipement.primary_magic_item.item_id"
             :src="getImageByLootTable(itemsInEquipement.primary_magic_item.loot_id)" width="100" height="100"
             data-type="primary_magic_item">
      </div>
    </div>
    <div class="col-6 d-flex flex-wrap justify-content-center">
      <div class="img-caracter" :style="{ backgroundImage: `url(${caracter.picture})`}"></div>
      <div class="item-slot mx-2" id="primary-weapon-slot" @mouseover="openTooltip($event, itemsInEquipement.primary_weapon)">
        <img v-if="itemsInEquipement.primary_weapon && itemsInEquipement.primary_weapon.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.primary_weapon.loot_id) + itemsInEquipement.primary_weapon.item_id"
             :src="getImageByLootTable(itemsInEquipement.primary_weapon.loot_id)" width="100" height="100"
             data-type="primary_weapon">
      </div>
      <div class="item-slot mx-2" id="secondary-weapon-slot" @mouseover="openTooltip($event, itemsInEquipement.secondary_weapon)">
        <img v-if="itemsInEquipement.secondary_weapon && itemsInEquipement.secondary_weapon.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.secondary_weapon.loot_id) + itemsInEquipement.secondary_weapon.item_id"
             :src="getImageByLootTable(itemsInEquipement.secondary_weapon.loot_id)" width="100" height="100"
             data-type="secondary_weapon">
      </div>
    </div>
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="gloves-slot" @mouseover="openTooltip($event, itemsInEquipement.gloves)">
        <img v-if="itemsInEquipement.gloves && itemsInEquipement.gloves.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.gloves.loot_id) + itemsInEquipement.gloves.item_id"
             :src="getImageByLootTable(itemsInEquipement.gloves.loot_id)" width="100" height="100"
             data-type="gloves">
      </div>
      <div class="item-slot" id="boots-slot" @mouseover="openTooltip($event, itemsInEquipement.boots)">
        <img v-if="itemsInEquipement.boots && itemsInEquipement.boots.loot_id"
             :id="getTypeByLootTable(itemsInEquipement.boots.loot_id) + itemsInEquipement.boots.item_id"
             :src="getImageByLootTable(itemsInEquipement.boots.loot_id)" width="100" height="100"
             data-type="boots">
      </div>
      <div class="item-slot" id="secondary-magic-item-slot" @mouseover="openTooltip($event, itemsInEquipement.secondary_magic_item)">
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
           @mouseover="openTooltip($event, itemsInBag[index - 1])"
           :id="'bag' + index">
        <img v-if="itemsInBag[index - 1] && itemsInBag[index - 1].loot_id"
             :id="getTypeByLootTable(itemsInBag[index - 1].loot_id) + itemsInBag[index - 1].item_id"
             :src="getImageByLootTable(itemsInBag[index - 1].loot_id)" width="100" height="100"
             :data-type="'bag' + index">
      </div>
    </div>
    <div id="item-info-tooltip" class="item-info-tooltip-container" v-show="itemTooltip.isShow">
      <b-list-group v-if="itemTooltip.item">
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'star']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.level}}</span>
        </b-list-group-item>
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'dumbbell']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.strength}}</span>
        </b-list-group-item>
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'brain']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.intelligence}}</span>
        </b-list-group-item>
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'feather']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.speed}}</span>
        </b-list-group-item>
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'user']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.charisma}}</span>
        </b-list-group-item>
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'heart']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.health}}</span>
        </b-list-group-item>
        <b-list-group-item>
          <font-awesome-icon :icon="['fas', 'dice']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.luck}}</span>
        </b-list-group-item>
        <b-list-group-item v-if="itemTooltip.item.charm">
          <font-awesome-icon :icon="['fas', 'bolt']" class="ml-2"></font-awesome-icon>
          <span class="ml-2">{{itemTooltip.item.charm_type}} - {{itemTooltip.item.charm_value}}</span>
        </b-list-group-item>
      </b-list-group>
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
      itemTooltip: {
        isShow: false,
        item: null,
      },
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
    openTooltip(event, item) {
      this.itemTooltip.isShow = true;
      this.itemTooltip.item = item;
      const itemInfoTooltip = document.getElementById('item-info-tooltip');
      itemInfoTooltip.style.left = (event.clientX + 5) + 'px';
      itemInfoTooltip.style.top = (event.clientY + 5) + 'px';
      console.log('openTooltip', this.itemTooltip);
    },
    closeTooltip() {
      this.itemTooltip.isShow = false;
    }
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
.item-info-tooltip-container {
  position: absolute;
  display: block;
  z-index: 999;
  & .list-group-item {
    font-size: 10px;
    padding: 5px 1.25rem;
  }
}
</style>
