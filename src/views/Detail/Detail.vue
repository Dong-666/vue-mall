<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info> 
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="backTopShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import { getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'

  import Scroll from 'components/common/scroll/scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import DetailNavBar from './childComps/DeatilNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import BackTop from 'components/common/backTop/BackTop.vue'

  //防抖操作
  import {debounce} from 'common/utils.js'
  //mixin操作
  import {itemListenerMixin} from 'common/mixin.js'

  //导入vuex的action
  import {mapActions} from 'vuex'

  export default {
    name: 'Detail',
    components: {
      Scroll,
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs:[],
        getThemeTopYs: null,
        currentIndex: 0,
        backTopShow: false,
      }
    },
    mixins: [itemListenerMixin],
    created() {
      //保存传入的id
      this.iid = this.$route.params.iid

      //获取商品数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //获取顶部图片数据
        this.topImages = data.itemInfo.topImages

        //获取商品基本信息数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取商家信息
        this.shop = new Shop(data.shopInfo)

        //获取商品详细数据
        this.detailInfo = data.detailInfo

        //获取商品参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] 
        }
          
      })

      //获取商品推荐数据
      getRecommend().then((res) => {
        this.recommends = res.data.list
        // console.log(res.data.list)
      })

      this.getThemeTopYs = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
          this.themeTopYs.push(Number.MAX_VALUE)
        }, 100)
    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh, 500) //注意不要加括号，否则传入的是函数返回值
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh()
      //   // this.$refs.scroll.refresh()
      // })
    },
    destroyed() {
      this.$bus.$off('itemImageLoad')
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopYs()
      },
      titleClick(index) {
        if(this.themeTopYs.length === 0) {
          alert('还未加载完，请等待一会再点击哦')
        }else {
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
          // console.log(this.$refs.scroll.bs.y)          
        }
      },
      //监听滚动
      contentScroll(position) {
        //返回顶部选项
        this.backTopShow = (-position.y) > 1000

        //1.获取y值
        const positionY = - position.y

        //2.将positionY的值和主题中的值进行对比
        let length = this.themeTopYs.length

        // for(let i = 0; i < length; i++){
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >=  this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        for (var i = 0; i < length - 1; i++) {
          if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      //回到顶部
      backTopClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      //添加购物车
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //mutation
        // this.$store.commit('addToCart', product)
        //actions
        //actions
        // this
        // .$store
        // .dispatch('addCart', product)
        // .then((res) => {
        //   console.log(res)
        // })
        //mapActions 使用toast
        this.addCart(product).then((res) => {
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .wrapper {
    /* 父级元素需要有高度 */
    height: calc(100% - 44px - 58px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>