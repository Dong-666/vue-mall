<template>
  <div>
    <h1>分类</h1>
    <div class="wrapper">
      <ul>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
        <li>🍿</li>
      </ul>
    </div>
  </div>
</template>

<script>
  //添加scroll插件
  import BScroll from 'better-scroll'
  export default {
    name:'Category',
    data() {
      return {
        bs: null
      }
    },
    mounted() {
      this.bs = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true //该属性添加后，probeType的值直接为3（修改成别的也没用）
      })
      this.bs.on('scroll', (position) => {
        console.log(position)
      })
      this.bs.on('pullingUp', ()=> {
        console.log('达到最低了')
        this.bs.finishPullUp()
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 200px;
    background-color: pink;
    overflow: hidden;
  }
</style>