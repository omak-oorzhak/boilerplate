<template>
  <div id="lorem">
    <h2>Lorem.vue component</h2>
    <span>{{ msg }}</span>
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
<style lang="css" scoped>
  div {
    color: #2a7bff;
  }
</style>