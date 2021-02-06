<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    height: 44px;
    display: flex;
    text-align: center;
    line-height: 44px;
    box-shadow: 0 1px 1px rgba(100,100,100,.1)
  }
  .center {
    flex: 1;
  }
  .right, .left {
    width: 60px;
  }
</style>