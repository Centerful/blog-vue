<template>
  <div class="maxbox">
    <v-container grid-list-md fluid >
      <v-layout style="justify-content: flex-start;width: 100%;margin: 0;" row wrap>
        <v-flex class="img-cell" v-for="img in imgs">
          <v-card>
            <v-img class="feed-img" @click="changeImg" :src="img" aspect-ratio="1"></v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    imgs: [
      'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg',
      'http://localhost:3000/public/images/db75e90932d9492ed79bb8c1f26373c2.png',
      'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
      'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
      'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
      'http://localhost:3000/public/images/ea674d14ae732ad0f10da91f5ce9039a.jpg',
      'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
      'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
      'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
    ]
  }),
  methods: {
    changeImg () {
      console.log('changeImg')

    }
  }
}
</script>

<style scoped>
.maxbox {
  width: 100%;
  height: 100%;
  border: solid 1px black;
}
.img-cell {
  max-width: 180px;
  max-height: 180px;
}
.feed-img {
  cursor: pointer;
}
</style>
