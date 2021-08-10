<template>
  <div>
    <Nuxt/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far);
Vue.component('font-awesome-icon', FontAwesomeIcon);

export default Vue.extend({})
</script>

<style lang="scss">
  @import "assets/scss/global";
</style>
