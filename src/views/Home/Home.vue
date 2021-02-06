<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      :titles="['流行', '新款', '精选']" 
      class="tab-control" 
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabfixed"></tab-control>
    <scroll 
    class='wrapper' 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="pulling">
      <home-swiper :banners='banners' @swipeImgLoad="swipeImgLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="backTopShow"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import HomeRecommendView from './childComps/HomeRecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import BackTop from 'components/common/backTop/BackTop.vue'

  import {getHomeMultidata, getHomeGoods} from 'network/home.js'

  //添加scroll插件
  import Scroll from 'components/common/scroll/scroll.vue'
  //防抖操作
  import {debounce} from 'common/utils.js'
  //minin操作
  import {itemListenerMixin} from 'common/mixin.js'

  export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop,
      Scroll
    },
    data () {
      return{
        banners: [],
        recommends: [],
        currentType: 'pop',
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]},
        },
        backTopShow: false,
        tabOffset: 0,
        isTabfixed: false,
        saveY:0,
      }
    },
    mixins: [itemListenerMixin],
    created() {
      this.getHomeMultidata()
      this.getHomeGoodss('pop')
      this.getHomeGoodss('new')
      this.getHomeGoodss('sell')
    },
    mounted() {
      // //图片加载事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 400)

      // //监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh();
      // })


      // this.newRefresh = debounce(this.$refs.scroll.refresh, 500) //注意不要加括号，否则传入的是函数返回值
      // this.itemImgListener = () => {
      //   this.newRefresh()
      //   // this.$refs.scroll.refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)

    },
    destroyed() {
      // console.log('home组件已经销毁')
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,1000)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.toY()

      //取消监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      //首页数据处理
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      //网络分析相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoodss(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
          //完成当前上拉加载更多
          this.$refs.scroll.finishPullUp()
          // //动态刷新
          // this.$refs.scroll.bs.refresh()
        })         
      },

      //回到顶部
      backTopClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      //监听滚动
      contentScroll(position) {
        this.backTopShow = (-position.y) > 1000
        this.isTabfixed = (-position.y) > this.tabOffset //判断是否需要吸顶
      },
      // 上拉加载
      pulling() {
       this.getHomeGoodss(this.currentType)
      },

      //吸顶
      swipeImgLoad() {
        this.tabOffset = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 视口vh viewport height */
    height: 100vh; 
    position: relative;
  }
  .home-nav {
/*  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10; */
    color: white;
    background-color: var(--color-tint);
  }
  .tab-control {
    /* 之前没有用bs的吸顶 */
    position: relative;
    /* top: 43px; */
    z-index: 10; 
    /* 定位情况下z-index才有效 */
  }
  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
/*   .wrapper {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>