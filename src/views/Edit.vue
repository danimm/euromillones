<template>
  <div>
    <h1>{{ data }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    data: this.$route.params.pathMatch
  }
};
</script>

<style lang="scss" scoped>
</style>