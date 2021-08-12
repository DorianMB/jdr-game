<template>
  <div class="w-100 p-5 row">
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="helmet" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
      <div class="item-slot" id="chestplate" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
      <div class="item-slot" id="primary-magic-item" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
    </div>
    <div class="col-6 d-flex flex-wrap justify-content-center">
      <div class="img-caracter" :style="{ backgroundImage: `url(${caracter.picture})`}"></div>
      <div class="item-slot mx-2" id="primary-weapon" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
      <div class="item-slot mx-2" id="secondary-weapon" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
    </div>
    <div class="col-3 d-flex flex-wrap justify-content-center">
      <div class="item-slot" id="gloves" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
      <div class="item-slot" id="boots" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
      <div class="item-slot" id="secondary-magic-item" v-on:drop="drop($event)" v-on:dragover="allowDrop($event)"></div>
    </div>
    <div class="bag-container w-100 mx-auto d-flex flex-wrap justify-content-center">
      <div v-for="index in bag.length"
           class="item-slot mx-2"
           :key="index"
           :id="'slot' + index"
           v-on:drop="drop($event)"
           v-on:dragover="allowDrop($event)">
        <img v-if="items[index - 1]" :id="'item' + index" :src="items[index - 1].picture" draggable="true" v-on:dragstart="drag($event)" width="100" height="100">
      </div>
    </div>
  </div>
</template>

<script>
import {Caracter} from "../../static/models/caracter";
import * as ApiUrls from "../../static/ApiUrls";
import {Bag} from "../../static/models/bag";

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
      items: []
    }
  },
  async beforeMount() {
    const res = await this.$axios.$get(ApiUrls.GET_API_ALL_CARACTERS() + '/' + this.id);
    this.caracter = res.data[0];
    const resBag = await this.$axios.$get(ApiUrls.GET_API_ALL_BAGS() + '/' + this.caracter.bag_id);
    this.bag = resBag.data[0];
    this.items.push({picture: this.caracter.picture});
    this.items.push({picture: this.caracter.picture});
  },
  methods: {
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop(ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");
      let ele = document.getElementById(data);
      let targetId = ev.target.getAttribute('id');
      console.log(data, targetId, ele, ev.target.tagName);
      if (ev.target.tagName === "IMG") {
        alert('slot already set');
      } else if (data !== targetId) {
        ev.target.setAttribute('data-item-id', ele.getAttribute('id'));
        ev.target.appendChild(ele);
      } else {
        console.log('do nothing');
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
</style>
