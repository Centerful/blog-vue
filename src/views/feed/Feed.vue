<template>
  <div class="feed">
    <placeholder :marginTop="80"/>
    <v-card class="feed-form">
      <v-form ref="feedForm" v-model="valid">
      <v-card-title style="padding-bottom: 0">
        <v-textarea
          v-model="formData.feedContent"
          :rules="rules.feedContent"
          auto-grow
          outline
          label="动态"
          placeholder="这一刻的想法..."
          rows="1"
        ></v-textarea>
      </v-card-title>
      </v-form>
      <v-card-actions style="padding-top: 0">
        <v-menu style="margin-left: 8px;" offset-y transition="slide-y-transition">
          <v-btn flat color="blue-grey" slot="activator">
            颜文字
          </v-btn>
          <EmojiWordPicker :pick="pick"></EmojiWordPicker>
        </v-menu>
        <v-menu offset-y transition="slide-y-transition">
          <v-btn flat icon color="blue-grey" slot="activator">
            <v-icon>mdi-emoticon-outline</v-icon>
          </v-btn>
          <EmojiPicker :pick="pick"></EmojiPicker>
        </v-menu>
        <v-btn flat icon color="blue-grey" @click="openImgInput">
          <v-icon>mdi-camera-image</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="clear" flat>取 消</v-btn>
        <v-btn  color="info" @click="send" style="margin-right: 11px;">发 表</v-btn>
      </v-card-actions>
      <v-container style="padding-top: 0;" grid-list-lg fluid v-show="formData.feedImg.length > 0">
        <v-layout style="justify-content: flex-start;flex-wrap: wrap;align-content: flex-start;width: 100%;margin: 0;" row wrap>
          <v-flex class="img-cell" :key="index" v-for="(img, index) in formData.feedImg">
            <div class="img-minus" @click="deleteImg(index)">
              <v-icon dark small>mdi-minus</v-icon>
            </div>
            <v-card>
              <v-card-media>
                <v-img class="feed-img" @click="changeImg(index)" :src="img" aspect-ratio="1"></v-img>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
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
      imgIndex: null,
      formData: {
        feedContent: '',
        feedImg: [
          // 'http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png',
          // 'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg',
          // 'http://localhost:3000/public/images/db75e90932d9492ed79bb8c1f26373c2.png',
          // 'http://localhost:3000/public/images/97e6e102adec260b5bdb71e6dab73c16.jpg',
          // 'http://localhost:3000/public/images/81d8bb753daff4765be3b1bfcf8d987b.jpeg',
          // 'http://localhost:3000/public/images/4654a20de6ed536dfa374d405f39ae5a.jpg',
          // 'http://localhost:3000/public/images/ea674d14ae732ad0f10da91f5ce9039a.jpg',
          // 'http://localhost:3000/public/images/2534ebc30e3790b0c8a50688ecb92a9f.png',
          // 'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg',
        ],
        topic: '',
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
    // 获取动态信息
    fetchData () {
      this.loading = true
      this.api.getFeeds((resp) => {
        this.loading = false
        this.feeds = resp
        this.$progress.finish()
      })
    },
    // 发表动态
    send () {
      this.api.addFeed((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        // 1.将发表内容清空
        this.clear()
        // 2.重新fetch data
        this.fetchData()
        // 3.提示发表成功
        let snack = {
          content: '发表成功。',
          color: 'SUCCESS',
          y: 'bottom'
        }
        this.$bus.emit('snack', snack)
      }, this.formData)
    },
    clear () {
      this.$refs.feedForm.reset()
      this.formData.feedImg = []
    },
    pick (val) {
      this.formData.feedContent += val
    },
    openImgInput (data) {
      // 最多只能有九幅图片
      if (this.formData.feedImg.length >= 9) {
        this.imgIndex = null
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
    // 更换当前图片
    changeImg (index) {
      this.imgIndex = index
      document.getElementById('imageInput').click()
    },
    // 删除当前图片
    deleteImg (index) {
      this.formData.feedImg.splice(index, 1)
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
        if (this.imgIndex != null) {
          this.$set(this.formData.feedImg, this.imgIndex, res.data.path)
        } else {
          this.formData.feedImg.push(res.data.path)  
        }
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
    position: relative;
    max-width: 180px;
    max-height: 180px;
  }
  .feed-img {
    cursor: pointer;
  }
  .img-minus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50% !important;
    background-color: red;
    position: absolute;
    top: -1px;
    right: -1px;
    z-index: 10;

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
