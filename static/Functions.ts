import {User} from "./models/user";
import {Bag} from "~/static/models/bag";
import {NuxtAxiosInstance} from "@nuxtjs/axios";
import * as ApiUrls from "./ApiUrls";
import {Equipement} from "~/static/models/equipement";
import {Stat} from "~/static/models/stat";
import {Caracter} from "~/static/models/caracter";

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
