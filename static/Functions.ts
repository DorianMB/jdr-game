import {User} from "./models/user";
import {Bag} from "~/static/models/bag";
import {NuxtAxiosInstance} from "@nuxtjs/axios";
import * as ApiUrls from "./ApiUrls";
import {Equipement} from "~/static/models/equipement";
import {Stat} from "~/static/models/stat";
import {Caracter} from "~/static/models/caracter";
import {LootTable} from "~/static/models/lootTable";
import {Item} from "~/static/models/item";
import {charmTypeLoot} from "./Constants";

export function getNameAndEmail(user: User) {
  return user.name + " & " + user.mail;
}

export async function createCaracter(axios: NuxtAxiosInstance, userId: number, form: {url: string, name: string}) {
  const bag = new Bag();
  bag.length = 4;
  let res = await axios.$post(ApiUrls.API_BAGS(), bag);
  bag.bag_id = res.data.insertId;
  const equipement = new Equipement();
  equipement.equipement_id = 0;
  res = await axios.$post(ApiUrls.API_EQUIPEMENTS(), equipement);
  equipement.equipement_id = res.data.insertId;
  const stat = new Stat();
  stat.strength = 1;
  stat.speed = 1;
  stat.health = 1;
  stat.charisma = 1;
  stat.intelligence = 1;
  stat.luck = 1;
  res = await axios.$post(ApiUrls.API_STATS(), stat);
  stat.stat_id = res.data.insertId;
  const caracter = new Caracter();
  caracter.user_id = userId;
  caracter.name = form.name;
  caracter.picture = form.url;
  caracter.bag_id = bag.bag_id;
  caracter.equipement_id = equipement.equipement_id;
  caracter.stat_id = stat.stat_id;
  caracter.experience = 0;
  caracter.money = 0;
  res = await axios.$post(ApiUrls.API_CARACTERS(), caracter);
  caracter.caracter_id = res.data.insertId;
  return await axios.$get(ApiUrls.API_CARACTERS() + '/' + caracter.caracter_id);
}

export async function createLootTable(axios: NuxtAxiosInstance, form: LootTable) {
  const lootTable: LootTable = {...form};
  const res = await axios.$post(ApiUrls.API_LOOT_TABLE(), lootTable);
  return res;
}

export async function createItem(axios: NuxtAxiosInstance, form: Item) {
  const item: Item = {...form};
  const res = await axios.$post(ApiUrls.API_ITEMS(), item);
  return res;
}

export async function createItemAuto(axios: NuxtAxiosInstance, loot: LootTable, moobLevel: number, playerLuck: number) {
  let item: Item = {};
  item.loot_id = loot.loot_id;
  item.level = random(1, moobLevel, playerLuck);
  item.strength = random(loot.strength_min, loot.strength_max, playerLuck);
  item.intelligence = random(loot.intelligence_min, loot.intelligence_max, playerLuck);
  item.speed = random(loot.speed_min, loot.speed_max, playerLuck);
  item.charisma = random(loot.charisma_min, loot.charisma_max, playerLuck);
  item.health = random(loot.health_min, loot.health_max, playerLuck);
  item.luck = random(loot.luck_min, loot.luck_max, playerLuck);
  if (loot.charm) {
    item.charm = loot.charm;
    item.charm_type = loot.charm_type;
    item.charm_value = random(loot.charm_value, 100, playerLuck);
  } else {
    const isCharm = random(0,1, playerLuck);
    if (isCharm === 1) {
      item.charm = true;
      item.charm_type = charmTypeLoot[random(0, charmTypeLoot.length - 1, 0)];
      item.charm_value = random(loot.charm_value, 100, playerLuck);
    } else {
      item.charm = false;
    }
  }
  const res = await axios.$post(ApiUrls.API_ITEMS(), item);
  return res;
}

// create function randonmly between min and max
// if min is null then min = 0
// if max is null then max is infinite
// generate a random number between min and max and this number is rounded
function random(min: any, max: any, luck: any) {
  if (isNaN(min) || min == null) {
    min = 0;
  }
  if (isNaN(max) || max == null) {
    max = 100;
  }
  const rand1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const rand2 = Math.floor(Math.random() * (max - min + 1)) + min;
  // what is the greatest number between rand1 and rand2
  let maxRand = Math.max(rand1, rand2);
  // if luck is null or undefined then return rand1
  // if luck is a number then function will return max between rand1 and rand2 depending on luck percentage
  if (isNaN(luck) || luck == null) {
    return rand1;
  } else {
    const rand = Math.floor(Math.random() * (100 + 1));
    if (rand <= luck) {
      return maxRand;
    } else {
      return rand1;
    }
  }
}
