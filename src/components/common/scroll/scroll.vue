<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        bs: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.bs = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true
      })
      //滚动过程实时监听
      if(this.probeType === 2 || this.probeType === 3) {
        this.bs.on("scroll", (position) => {
          this.$emit('scroll', position)
          
        })        
      }
      //监听滚动到底部
      if(this.pullUpLoad === true) {
        this.bs.on("pullingUp", ()=> {
          this.$emit('pullingUp')
        })        
      }

    },
    methods: {
      //跳转某位置
      scrollTo(x,y,time = 666) {
        this.bs && this.bs.scrollTo(x,y,time)
      },
      //刷新
      refresh() {
        this.bs && this.bs.refresh()  
      },
      //完成底部滚动
      finishPullUp() {
        this.bs && this.bs.finishPullUp()
      },
      //跳转y
      toY() {
        return this.bs ? this.bs.y : 0
      }
    }
  }
</script>

<style scoped>
  
</style>