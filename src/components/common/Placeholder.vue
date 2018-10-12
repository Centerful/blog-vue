<template>
  <div :style="{marginTop: marginTop + 'px'}">
  </div>
</template>

<script>
export default {
  name: 'placeholder',
  props: {
    marginTop: {
      default: 50
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
/*.placeholder {
  : 60px;
}*/
</style>
