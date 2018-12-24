<!-- feed发送区域 -->
<template>
  <v-card class="feed-form">
    <v-form ref="feedForm" v-model="valid">
      <v-card-title style="padding-bottom: 0">
        <v-textarea
          v-model="feedContent"
          :rules="feedContentRule"
          id="feedSend"
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
        <EmojiWordPicker :pick="pickEmoji"></EmojiWordPicker>
      </v-menu>
      <v-menu offset-y transition="slide-y-transition">
        <v-btn flat icon color="blue-grey" slot="activator">
          <v-icon>mdi-emoticon-outline</v-icon>
        </v-btn>
        <EmojiPicker :pick="pickEmoji"></EmojiPicker>
      </v-menu>
      <v-btn flat icon color="blue-grey" @click="addImg">
        <v-icon>mdi-camera-image</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="clear" flat>取 消</v-btn>
      <v-btn  color="info" @click="send" style="margin-right: 11px;">发 表</v-btn>
    </v-card-actions>
    <!-- feed图片展示区域 -->
    <FeedImage ref="imgContainer" v-model="feedImg"></FeedImage>
  </v-card>
</template>

<script>
import FeedImage from '@/views/feed/children/FeedImage.vue'
import EmojiWordPicker from '@/components/common/EmojiWordPicker.vue'
import EmojiPicker from '@/components/common/EmojiPicker.vue'

export default {
  data: () => ({
    valid: false,
    feedContent: '',
    feedImg: [],
    topic: '',
    feed_status: false,
    feedContentRule: [
      v => {
        if (!v) {
          return "动态内容不能为空！"
        }
        return true
      }
    ],
  }),
  components: {
    FeedImage, EmojiWordPicker, EmojiPicker
  },
  methods: {
    // 发表动态
    send () {
      this.api.addFeed((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        // 1.将发表内容清空
        this.clear()
        // 2.提示发表成功
        let snack = {
          content: '发表成功。',
          color: 'SUCCESS',
          y: 'bottom'
        }
        this.$bus.emit('snack', snack)
        // 3.重新fetch data
        this.$emit('sendout')
      }, {
        feedContent: this.feedContent,
        feedImg: this.feedImg,
        topic: this.topic,
        feed_status: this.feed_status
      })
    },
    clear () {
      this.$refs.feedForm.reset()
      this.feedImg = []
    },
    pickEmoji (val) {
      this.feedContent = this.utils.insertSomething('feedSend', this.feedContent, val)
    },
    addImg (data) {
      this.$refs.imgContainer.addImg()
    }
  }
}
</script>

<style scoped>
  .feed-form {
    width: 100%;
    max-width: 620px;
  }
</style>