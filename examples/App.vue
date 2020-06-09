<template>
  <div id="app">
    <yz-form-design :height="height" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 500
    }
  },
  mounted() {
    this.height = window.innerHeight
  }
}
</script>
<style lang="scss">
  body {
    margin: 0;
  }
</style>
