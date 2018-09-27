<template>
  <div class="columns">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Columns!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'columns',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.columns{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}
</style>
