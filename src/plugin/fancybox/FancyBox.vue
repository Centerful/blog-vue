<template>
  <div v-show="flag">
    <v-btn @click="close" class="close-btn" large flat icon color="teal lighten-5">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="navigation">
      <v-btn @click="prev" class="prev-btn" large flat icon color="teal lighten-5">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn @click="next" class="next-btn" large flat icon color="teal lighten-5">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <div class="counter">
      <span>{{ index + 1 }}</span>/<span>{{ imgs ? imgs.length : 0 }}</span>
    </div>
    <div class="image-area">
      <img class="image" :src="currentImg">
    </div>
    <div @click="close" class="fancybox-overlay"></div>
  </div>
</template>

<script>
export default{
  computed: {
    fancybox () {
      return window.FancyBoxDataConnector.params
    },
    currentImg () {
      return this.imgs ? this.imgs[this.index] : null
    },
    flag () {
      return this.fancybox.flag
    },
    imgs () {
      return this.fancybox.imgs
    },
    index () {
      return this.fancybox.index || 0
    }
  },
  methods: {
    close () {
      this.$fancyBox.close()
    },
    prev () {
      if (this.imgs.length > 1) this.$fancyBox.prev()
    },
    next () {
      if (this.imgs.length > 1) this.$fancyBox.next()
    }
  }
}
</script>

<style scoped>
.fancybox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fancybox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  padding: 2px;
  background: rgba(0,0,0,.8);
  display: block;
}
.counter {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 1060;
  color: #000;
  font-size: 1rem;
  color: #E0F2F1;
}
.close-btn {
  position: fixed;
  right: 30px;
  top: 30px;
  z-index: 1060;
  margin-top: -14px;
  margin-right: -14px;
}
.prev-btn {
  position: fixed;
  left: 20px;
  top: 50%;
  margin-top: -22px;
  display: block;
  z-index: 1060;
}
.next-btn {
  position: fixed;
  right: 20px;
  top: 50%;
  margin-top: -22px;
  display: block;
  z-index: 1060;
}
.image-area {
  z-index: 1100;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  max-width: 85%;
  max-height: 90%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.image {
  max-height: 100%;
  max-width: 100%;
}
</style>