<template>
  <div class="overflow-auto" v-if="items.length > 0">
    <b-table
    striped
    hover
    bordered
    :items="items"
    :fields="updatedFields"
    class="mx-3">
      <template #cell(actions)="row">
        <div class="d-flex flex-nowrap">
          <b-button variant="info" class="mx-1" :href="redirectDetail.url + '/' + row.item[redirectDetail.id]">
            Details
          </b-button>
          <b-button variant="danger" class="mx-1" @click="console(row)">
            Delete
          </b-button>
        </div>
      </template>
      <template #cell()="data">
        <div class="d-flex justify-content-center align-items-center" v-if="isUrl(data.value)">
          <b-img v-if="data.value" :src="data.value" alt="preview" class="img-fluid" :style="{height: '50px'}"></b-img>
        </div>
        <span v-else>{{data.value}}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "AdminTable",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    redirectDetail: {
      type: {
        url: String,
        id: String
      },
      default: {
        url: '',
        id: ''
      }
    }
  },
  watch: {
    fields() {
      this.updatedFields = this.updatedFields.concat(this.fields);
    }
  },
  data() {
    return {
      updatedFields: [{
        key: 'actions',
        sortable: false
      }],
    }
  },
  methods: {
    isUrl(value) {
      return typeof value === 'string' && value.startsWith('http');
    },
    console(row) {
      console.log('test', row);
    },
  },
}
</script>

<style scoped lang="scss">
</style>
