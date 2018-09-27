<template>
  <div class="blog">
    <!-- placeholder -->
    <!-- blog- -->
    <placeholder/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Blog!"/>
    <div class="blog-items">
    </div>
    <button @click="test">test</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'blog',
  components: {
    HelloWorld
  },
  methods: {
    test: function () {
      console.log(this.api.getBlogs())
    }
  }
}
</script>
<style scoped>
.blog{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
