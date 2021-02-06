<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit('swipeImgLoad')
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
</style>