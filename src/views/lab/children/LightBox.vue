<template>
  <div id="app">
    <p>Welcome to your Vue.js lightbox!</p>

    <lightbox :id="'qweqwe'" :images="images"></lightbox>
  </div>
</template>

<script>
import Lightbox from 'vue-simple-lightbox'

export default {
  components: {
    Lightbox
  },
  data(){
    return{
      images : [
        {src : 'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg', title : 'Image 2'},
        {src : 'http://localhost:3000/public/images/db75e90932d9492ed79bb8c1f26373c2.png', title : 'Image 2'},
        {src : 'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg', title : 'Image 2'},
        {src : 'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg', title : 'Image 2'},
        {src : 'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg', title : 'Image 2'},
        {src : 'http://localhost:3000/public/images/ea674d14ae732ad0f10da91f5ce9039a.jpg', title : 'Image 2'},
      ],
      options : {
        closeText : 'X'
      }
    }
  }
}
</script>

<style>
  
</style>