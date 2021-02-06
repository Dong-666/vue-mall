import { debounce } from "common/utils"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100) //注意不要加括号，否则传入的是函数返回值

    this.itemImgListener = () => {
      this.newRefresh()
      // this.$refs.scroll.refresh()
    }
    
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}