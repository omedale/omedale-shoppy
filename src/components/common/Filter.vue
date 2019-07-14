<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="filter-item">
          <strong>Color:</strong>
          <div>
            <a-radio-group :size="'small'">
              <a-radio-button value="a">&nbsp; &nbsp;</a-radio-button>
              <a-radio-button value="b">&nbsp; &nbsp;</a-radio-button>
              <a-radio-button value="c">&nbsp; &nbsp;</a-radio-button>
              <a-radio-button value="d">&nbsp; &nbsp;</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="filter-item">
          <strong>Size:</strong>
          <div>
            <a-radio-group size="small">
              <a-radio-button value="a">Hangzhou</a-radio-button>
              <a-radio-button value="b">Shanghai</a-radio-button>
              <a-radio-button value="c">Beijing</a-radio-button>
              <a-radio-button value="d">Chengdu</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="filter-item">
          <strong>Brand:</strong>
          <div>
            <a-select :size="'small'" mode="multiple" :defaultValue="['a1', 'b2']" style="width: 100%" @change="handleBrandChange" placeholder="Please select">
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="filter-item">
          <strong>Price:</strong>
          <div class="price-wrapper">
            <input class="form-control price-input form-control-sm" placeholder="Min" type="number">
            <span class="px-2"> - </span>
            <input class="form-control price-input form-control-sm" placeholder="Max" type="number">
            <a-button type="primary" class="ml-2" icon="filter" :size="'small'">Filter</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter',
  data () {
    return {
    }
  },
  methods: {
    handleBrandChange (value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
<style scoped>
  input {
    border-radius: 12px !important;
  }
</style>
