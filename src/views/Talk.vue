<template>
  <div class="talk">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Talk!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'talk',
  components: {
    HelloWorld
  },
  created () {
    setTimeout(() => {
      this.$progress.finish()
    }, 2000)
  }
}
</script>

<style scoped>
.talk{
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
