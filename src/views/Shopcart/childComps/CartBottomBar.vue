<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="isSelectAll" @click.native = "checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  data() { 
    return {
        
    }
  },
  components:{
      CheckButton
  },
  methods:{
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice() {
      // return '￥' + this.$store.state.cartList.filter(item => item.checked).reduce((preValue, item) => {
      //   return preValue + item.count * item.price
      // }, 0).toFixed(2) 
      return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2) 
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      return !this.$store.state.cartList.filter(item => 
        item.checked === false).length
    }
  }
 }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  } 
</style>