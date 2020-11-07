<template>
  <div class="tab-item" @click="change">
    <div v-if="!isActive">
      <slot name="img"></slot>
    </div>
    <div v-else>
      <slot name="img-active"></slot>     
    </div>
    <div :style="activeStyle">
      <slot name='item'></slot>
    </div>

<!--      <div :class="{isred:isActive}">
      <slot name='item'></slot>
    </div> -->
<!--<div class="tab-item">
        <img src="../../assets/image/tabbar/home.svg" alt="">
      <div>首页</div>  
    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props:{
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    methods: {
      change() {
        this.$router.push(this.path)
      }
    },
    data() {
      return {
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} :{}
      }
    }
  }
</script>

<style scoped>
  .tab-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
.tab-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 去除图片底部内容 */
    vertical-align: middle;
    margin-bottom: 2px;
}
/* .isred {
  color: red
} */
</style>