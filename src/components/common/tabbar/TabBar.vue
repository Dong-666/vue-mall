<template>
    <div class="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'TarBar'
}
</script>
<style scoped>
.tab-bar {
  display: flex;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #C7C7C7;
  box-shadow: 0, -1px, 1px, rgba(216, 214, 214, 0.1)
}

</style>