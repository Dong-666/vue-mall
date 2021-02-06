<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
    class="tab-control-item"
    :class = "{active: index === currentIndex}"
    @click="itemchange(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    components: {
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    props:{
        titles: {
          type: Array,
          default() {
            return []
        }
      }
    },
    methods: {
      itemchange(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>