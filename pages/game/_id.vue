<template>
  <div class="w-100 p-5 row" @click="hideContextMenu()">
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="helmet-slot">
        <img v-if="itemsInEquipement.helmet && itemsInEquipement.helmet.loot_id"
             @contextmenu="showContextMenu($event)"
             @mouseover="setHoverItem(itemsInEquipement.helmet)"
             :id="getTypeByLootTable(itemsInEquipement.helmet.loot_id) + itemsInEquipement.helmet.item_id"
             :src="getImageByLootTable(itemsInEquipement.helmet.loot_id)" width="100" height="100"
             data-type="helmet">
      </div>
      <div class="item-slot" id="chestplate-slot">
        <img v-if="itemsInEquipement.chestplate && itemsInEquipement.chestplate.loot_id"
             @contextmenu="showContextMenu($event)"
             @mouseover="setHoverItem(itemsInEquipement.chestplate)"
             :id="getTypeByLootTable(itemsInEquipement.chestplate.loot_id) + itemsInEquipement.chestplate.item_id"
             :src="getImageByLootTable(itemsInEquipement.chestplate.loot_id)" width="100" height="100"
             data-type="chestplate">
      </div>
      <div class="item-slot" id="primary-magic-item-slot">
        <img v-if="itemsInEquipement.primary_magic_item && itemsInEquipement.primary_magic_item.loot_id"
             @contextmenu="showContextMenu($event)"
             @mouseover="setHoverItem(itemsInEquipement.primary_magic_item)"
             :id="getTypeByLootTable(itemsInEquipement.primary_magic_item.loot_id) + itemsInEquipement.primary_magic_item.item_id"
             :src="getImageByLootTable(itemsInEquipement.primary_magic_item.loot_id)" width="100" height="100"
             data-type="primary_magic_item">
      </div>
    </div>
    <div class="col-6 d-flex flex-wrap justify-content-center">
      <div class="img-caracter" :style="{ backgroundImage: `url(${caracter.picture})`}"></div>
      <div class="item-slot mx-2" id="primary-weapon-slot">
        <img v-if="itemsInEquipement.primary_weapon && itemsInEquipement.primary_weapon.loot_id"
             @contextmenu="showContextMenu($event)"
             @mouseover="setHoverItem(itemsInEquipement.primary_weapon)"
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
             @contextmenu="showContextMenu($event)"
             @mouseover="setHoverItem(itemsInEquipement.secondary_magic_item)"
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
             @contextmenu="showContextMenu($event)"
             @mouseover="setHoverItem(itemsInBag[index - 1])"
             :id="getTypeByLootTable(itemsInBag[index - 1].loot_id) + itemsInBag[index - 1].item_id"
             :src="getImageByLootTable(itemsInBag[index - 1].loot_id)" width="100" height="100"
             :data-type="'bag' + index">
      </div>
    </div>
    <div id="context-menu" class="context-menu-container" v-show="menuInfo.isShow">
      <b-button variant="link" class="context-menu-item"
           v-if="menuInfo.selectedItem"
           :disabled="!menuInfo.origin.includes('bag')"
           @click="useItemFromBag(menuInfo.selectedItem)">
        <span>Equiper</span>
      </b-button>
      <b-button variant="link" class="context-menu-item"
           v-if="menuInfo.selectedItem"
           :disabled="menuInfo.origin.includes('bag')"
           @click="useItemFromEquipement(menuInfo.selectedItem)">
        <span>Ranger</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import {Caracter} from "../../static/models/caracter";
import * as ApiUrls from "../../static/ApiUrls";
import {Bag} from "../../static/models/bag";
import {Equipement} from "static/models/equipement";
import {API_ITEMS_BY_BAG} from "../../static/ApiUrls";

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
      menuInfo: {
        isShow: false,
        preselectedItem: null,
        selectedItem: null,
        origin: null,
        posX: 0,
        posY: 0
      }
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
    setHoverItem(item) {
      this.menuInfo.preselectedItem = item;
      console.log('setHoverItem', this.menuInfo.preselectedItem);
    },
    showContextMenu(event) {
      event.preventDefault();
      const contextMenu = document.getElementById('context-menu');
      contextMenu.style.left = event.clientX + 'px';
      contextMenu.style.top = event.clientY + 'px';
      if (this.menuInfo.posX !== event.clientX || this.menuInfo.posY !== event.clientY) {
        this.menuInfo.selectedItem = this.menuInfo.preselectedItem;
      }
      this.menuInfo.posX = event.clientX;
      this.menuInfo.posY = event.clientY;
      this.menuInfo.origin = event.target.getAttribute('data-type');
      this.menuInfo.isShow = true;
      console.log('showContextMenu', this.menuInfo);
    },
    hideContextMenu() {
      this.menuInfo.isShow = false;
    },
    async useItemFromBag(item) {
      // get lootTablee item by item.loot_id
      const loot = this.lootTable.find(loot => {
        return loot.loot_id === item.loot_id;
      });
      let replacedItem = null;
      if (loot.type === 'sword' || loot.type === 'bow' || loot.type === 'magic_wand') {
        replacedItem = this.itemsInEquipement.primary_weapon;
        this.itemsInEquipement.primary_weapon = item;
        this.equipement.primary_weapon_id = item.item_id;
      } else if (loot.type === 'shield' || loot.type === 'arrow' || loot.type === 'magic_book') {
        replacedItem = this.itemsInEquipement.secondary_weapon;
        this.itemsInEquipement.secondary_weapon = item;
        this.equipement.secondary_weapon_id = item.item_id;
      } else if (loot.type === 'magic_item') {
        if (!this.itemsInEquipement.primary_magic_item) {
          replacedItem = this.itemsInEquipement.primary_magic_item;
          this.itemsInEquipement.primary_magic_item = item;
          this.equipement.primary_magic_item_id = item.item_id;
        } else {
          replacedItem = this.itemsInEquipement.secondary_magic_item;
          this.itemsInEquipement.secondary_magic_item = item;
          this.equipement.secondary_magic_item_id = item.item_id;
        }
      } else {
        replacedItem = this.itemsInEquipement[loot.type];
        this.itemsInEquipement[loot.type] = item;
        this.equipement[loot.type + '_id'] = item.item_id;
      }
      this.itemsInBag.splice(this.itemsInBag.indexOf(item), 1);
      // update equipement in database
      await this.$axios.$put(ApiUrls.API_EQUIPEMENTS() + '/' + this.equipement.equipement_id, this.equipement);
      item.bag_id = null;
      await this.$axios.$put(ApiUrls.API_ITEMS() + '/' + item.item_id, item);
      if (replacedItem) {
        this.itemsInBag.push(replacedItem);
        replacedItem.bag_id = this.bag.bag_id;
        await this.$axios.$put(ApiUrls.API_ITEMS() + '/' + replacedItem.item_id, replacedItem);
      }
      console.log('useItemFromBag', this.itemsInEquipement, this.itemsInBag);
    },
    async useItemFromEquipement(item) {
      if (this.itemsInBag.length < this.bag.length){
        const loot = this.lootTable.find(loot => {
          return loot.loot_id === item.loot_id;
        });
        if (loot.type === 'sword' || loot.type === 'bow' || loot.type === 'magic_wand') {
          this.itemsInEquipement.primary_weapon = null;
          this.equipement.primary_weapon_id = null;
        } else if (loot.type === 'shield' || loot.type === 'arrow' || loot.type === 'magic_book') {
          this.itemsInEquipement.secondary_weapon = null;
          this.equipement.secondary_weapon_id = null;
        } else if (loot.type === 'magic_item') {
          if (this.menuInfo.origin === 'primary_magic_item') {
            this.itemsInEquipement.primary_magic_item = null;
            this.equipement.primary_magic_item_id = null;
          } else {
            this.itemsInEquipement.secondary_magic_item = null;
            this.equipement.secondary_magic_item_id = null;
          }
        } else {
          this.itemsInEquipement[loot.type] = null;
          this.equipement[loot.type + '_id'] = null;
        }
        this.itemsInBag.push(item);
        await this.$axios.$put(ApiUrls.API_EQUIPEMENTS() + '/' + this.equipement.equipement_id, this.equipement);
        item.bag_id = this.bag.bag_id;
        await this.$axios.$put(ApiUrls.API_ITEMS() + '/' + item.item_id, item);
        console.log('useItemFromEquipement', this.equipement, this.itemsInBag);
      }
    }
  }
}
</script>

<style lang="scss">
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
  .context-menu-container {
    position: absolute;
    display: block;
    background-color: white;
    border: 1px solid black;
    padding: 10px;
    z-index: 999;
  }
  .context-menu-item {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid black;
    display: block;
    text-decoration: none;
    color: black;
  }
  .context-menu-item:hover {
    background-color: #ccc;
    text-decoration: none;
    color: black;
  }
  .context-menu-item:disabled {
    background-color: gray;
  }
</style>
