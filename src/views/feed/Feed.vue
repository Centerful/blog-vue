<template>
  <div class="feed">
    <placeholder :marginTop="80"/>
    <v-form class="feed-form" ref="feedForm" v-model="valid">
      <v-card>
        <v-card-title style="padding-bottom: 0">
          <v-textarea
            v-model="formData.feedContent"
            :rules="rules.feedContent"
            auto-grow
            label="专栏介绍"
            rows="1"
          ></v-textarea>
        </v-card-title>
        <v-card-actions style="padding-top: 0">
          <v-menu offset-y transition="slide-y-transition">
            <v-btn flat icon style="margin-left: 5px" color="blue-grey" slot="activator">
              <v-icon>mdi-emoticon-outline</v-icon>
            </v-btn>
            <EmojiPicker :pick="pick"></EmojiPicker>
          </v-menu>
          <v-menu offset-y transition="slide-y-transition">
            <v-btn flat style="margin: 5px" color="blue-grey" slot="activator">
              颜文字
            </v-btn>
            <EmojiWordPicker :pick="pick"></EmojiWordPicker>
          </v-menu>
          <v-btn flat icon color="blue-grey" @click="openImgInput">
            <v-icon>mdi-camera-image</v-icon>
          </v-btn>
          <v-switch style="margin-left: 10px"
            :label="`Switch : ${formData.feed_status.toString()}`"
            v-model="formData.feed_status"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn @click="clear" flat>取 消</v-btn>
          <v-btn color="info" @click="send">发 布</v-btn>
        </v-card-actions>
        <v-container style="padding-top: 0;" grid-list-md fluid >
          <v-layout style="justify-content: flex-start;width: 100%;margin: 0;" row wrap>
            <v-flex class="img-cell" :key="img" v-for="img in formData.feedImg">
              <v-card>
                <v-img class="feed-img" @click="changeImg" :src="img" aspect-ratio="1"></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-form>
    <form style="display: none;" id="imgForm" method="post" enctype="multipart/form-data" action="图片上传">
      <input @change="imgUpload" type="file" id="imageInput" accept="image/*">
    </form>
    <div class="feed-split">
    </div>
    <template v-if="loading">
      <div class="feed-loading"></div>
      <div class="feed-loading"></div>
      <div class="feed-loading"></div>
      <div class="feed-loading"></div>
    </template>
    <FeedItem v-else v-for="feed in feeds" :key="feed._id" :feed="feed"></FeedItem>

  </div>
</template>

<script>
// @ is an alias to /src
import FeedItem from '@/views/feed/children/FeedItem.vue'
import EmojiWordPicker from '@/components/common/EmojiWordPicker.vue'
import EmojiPicker from '@/components/common/EmojiPicker.vue'

export default {
  name: 'feed',
  data () {
    return {
      feeds: [],
      loading: true,
      valid: false,
      formData: {
        feedContent: '',
        feedImg: [
          'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg',
          'http://localhost:3000/public/images/db75e90932d9492ed79bb8c1f26373c2.png',
          'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
          'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
          'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
          'http://localhost:3000/public/images/ea674d14ae732ad0f10da91f5ce9039a.jpg',
          'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
          'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
          'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
        ],
        feed_status: false
      },
      rules: {
        feedContent: [
          v => {
            if (!v) {
              return "动态内容不能为空！"
            }
          }
        ],
      }
    }
  },
  components: {
    FeedItem, EmojiWordPicker, EmojiPicker
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': {
      handler: 'fetchData',
      immediate: true // 立马执行一次,相当于created中调用一次.
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.api.getFeeds((resp) => {
        this.loading = false
        this.feeds = resp
        this.$progress.finish()
      })
    },
    send () {

    },
    clear () {
      this.$refs.feedForm.reset()
    },
    pick (val) {
      this.formData.feedContent += val
    },
    openImgInput (data) {
      // 最多只能有九幅图片
      if (this.formData.feedImg.length >= 9) {
        // snak 弹窗。
        let snack = {
          content: '最多只能选择九张照片',
          color: 'ERROR',
          y: 'bottom'
        }
        this.$bus.emit('snack', snack)
        return
      }
      document.getElementById('imageInput').click()
    },
    changeImg () {
      document.getElementById('imageInput').click()
    },
    // 题图上传
    imgUpload (data) {
      let files = document.getElementById('imageInput').files
      if (!files || files.length < 1) {
        return
      }
      // 图片上传
      this.api.imgUpload((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        // 添加图片URL
        // 判断是新增还是更换已经上传的图片
        this.formData.feedImg.push(res.data.path)
      }, files)
    },
  }
}
</script>

<style scoped>
  .feed-form {
    width: 100%;
    max-width: 620px;
  }
  .img-cell {
    max-width: 180px;
    max-height: 180px;
  }
  .feed-img {
    cursor: pointer;
  }
  .feed{
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
  .feed-wapper {
    width: 100%;
    max-width: 870px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .feed-send-container {
    width: 90%;
    max-width: 620px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .feed-send-left {
    width: 82%;
  }
  .send-input >textarea {
    width: 95%;
    height: 80px;
  }
  .send-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 95%;
  }
  .send-func-btn {
    margin: 6px 15px;
    font-size: 0.9em;
    cursor: pointer;
  }
  .send-emoji {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    border-radius: 50%;
    margin: 0;
    -webkit-font-smoothing: subpixel-antialiased;
    height: 38px;
    color: #737373;
    width: 38px;
    transition: all 0.3s;
  }
  .send-emoji:hover {
    color: #000;
    transition: all 0.3s;
  }
  .send-toolbar-right {
    display: flex;
    align-items: center;
  }
  .send-topic {

  }
  .send-type {

  }
  .send-btn {

  }
  .feed-send-right {

  }
  .send-add-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    width: 100px;
    height: 100px;
    min-width: 100px;
  }
  .send-add-picture > span {
    cursor: pointer;
  }
  .feed-split {
    border-bottom: 1px solid #ccc;
    margin: 30px;
    width: 80%;
  }
  .feed-loading {
    width: 90%;
    max-width: 620px;
    display: flex;
    position: relative;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
    margin-bottom: 30px;
    height: 60px;
    background-color: #ccc;
  }
</style>
