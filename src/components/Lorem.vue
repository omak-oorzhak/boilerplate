<template>
  <div id="lorem">
    <h2>Lorem.vue component</h2>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: 'lorem',
    data() {
      return {
        msg: 'Hello from Lorem.vue'
      }
    }
  }
</script>
<style lang="scss" scoped>
  div {
    color: #2038ff;
  }
</style>