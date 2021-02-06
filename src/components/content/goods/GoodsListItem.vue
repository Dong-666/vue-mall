<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {

  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      // //解决判断推荐页或首页数据是否需要刷新①
      // if (this.$route.path.indexOf('/home') !== -1) {
      //   this.$bus.$emit('homeItemImageLoad') 
      // }
      // if(this.$route.path.indexOf('/detail' !== -1)){
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-list-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;    
  }

  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
  }

  .goods-info p {
    overflow: hidden;
    /*  显示省略符号来代表被修剪的文本 */
    text-overflow: ellipsis;
    /* 文本不换行 */
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  } 

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }  
</style>
