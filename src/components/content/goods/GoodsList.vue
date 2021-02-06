<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    padding: 2px;  

     /* 包裹 */
     flex-wrap: wrap;
     justify-content: space-around;
  }
</style>
