<template>
  <div class="test-area">
    <v-btn @click="openOne">一张图片</v-btn>
    <v-btn @click="openMany">多张图片</v-btn>
    <v-btn @click="pluginTest">灯箱插件测试一张</v-btn>
    <v-btn @click="pluginTestMany">灯箱插件测试多张</v-btn>
    <div v-if="flag">
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
      <div class="counter" v-if="imgs">
        <span>{{ index + 1 }}</span>/<span>{{ imgs.length }}</span>
      </div>
      <div class="counter" v-else>
        <span>1</span>/<span>1</span>
      </div>
      <div class="image-area">
        <img class="image" :src="currentImg">
      </div>
      <div @click="close" class="fancybox-overlay"></div>
    </div>
    
  </div>
</template>

<script>
export default{
  computed: {
    currentImg () {
      if (this.imgs) return this.imgs[this.index]
      return this.img
    }
  },
  data: () => ({
    flag: false,
    imgs: null,
    index: 0,
    img: null
  }),
  methods: {
    openOne() {
      this.flag = true
      this.img = 'http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png'
    },
    openMany () {
      this.flag = true
      this.imgs = [
        'http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png',
        'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg',
        'http://localhost:3000/public/images/db75e90932d9492ed79bb8c1f26373c2.png',
        'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
        'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
        'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
        'http://localhost:3000/public/images/ea674d14ae732ad0f10da91f5ce9039a.jpg',
      ]
      this.index = 0
    },
    pluginTest () {
      this.$fancyBox.open('http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png',123)
    },
    pluginTestMany () {
      let arr = [
        'http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png',
        'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg',
        'http://localhost:3000/public/images/db75e90932d9492ed79bb8c1f26373c2.png',
        'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
        'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
        'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
        'http://localhost:3000/public/images/ea674d14ae732ad0f10da91f5ce9039a.jpg',
      ]
      this.$fancyBox.open(arr, 0)
    },
    close () {
      this.flag = false
    },
    prev () {
      if (this.imgs) this.index = (this.index === 0) ? (this.imgs.length - 1) : (this.index - 1)
    },
    next () {
      if (this.imgs) this.index = (this.index === this.imgs.length - 1) ? 0 : (this.index + 1)
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