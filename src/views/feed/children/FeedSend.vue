<!-- feed发送区域 -->
<template>
  <v-card :color="theme.card[theme_style]" class="feed-form">
    <v-form ref="feedForm" v-model="valid">
      <v-card-title style="padding-bottom: 0">
        <v-textarea
          :dark='locked'
          v-model="feedContent"
          :rules="feedContentRule"
          id="feedSend"
          auto-grow
          placeholder="这一刻的想法..."
          rows="1"
        ></v-textarea>
      </v-card-title>
    </v-form>
    <v-card-actions style="padding-top: 0">
      <v-menu style="margin-left: 8px;" offset-y transition="slide-y-transition">
        <v-btn flat :color="theme.btn[theme_style]" slot="activator">
          颜文字
        </v-btn>
        <EmojiWordPicker :pick="pickEmoji"></EmojiWordPicker>
      </v-menu>
      <v-menu offset-y transition="slide-y-transition">
        <v-btn flat icon :color="theme.btn[theme_style]" slot="activator">
          <v-icon>mdi-emoticon-outline</v-icon>
        </v-btn>
        <EmojiPicker :pick="pickEmoji"></EmojiPicker>
      </v-menu>
      <v-btn flat icon :color="theme.btn[theme_style]" @click="addImg">
        <v-icon>mdi-camera-image</v-icon>
      </v-btn>
      <v-tooltip bottom>
        <v-btn slot="activator" flat icon :color="theme.btn[theme_style]" @click="toggleLock">
          <v-icon>{{theme.lock_icon[theme_style]}}</v-icon>
        </v-btn>
        <span>{{theme.lock_word[theme_style]}}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn :dark='locked' @click="clear" flat>取 消</v-btn>
      <v-btn :color="theme.send_btn[theme_style]" @click="send" style="margin-right: 11px;">发 表</v-btn>
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
    locked: false,
    feedContent: '',
    feedImg: [],
    topic: '',
    feedContentRule: [
      v => {
        if (!v) {
          return "动态内容不能为空！"
        }
        return true
      }
    ],
    theme: {
      card: {
        private: 'grey darken-2',
        light: 'white'
      },
      btn: {
        private: 'grey lighten-3',
        light: 'blue-grey'
      },
      send_btn: {
        private: 'grey lighten-4',
        light: 'info'
      },
      lock_icon: {
        private: 'mdi-lock',
        light: 'mdi-lock-open'
      },
      lock_word: {
        private: '仅自己可见',
        light: '所有人可见'
      }
    },
  }),
  computed: {
    theme_style () {
      if (this.locked) {
        return 'private'
      } else {
        return 'light'
      }
    }
  },
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
        feed_status: this.locked ? 'PRIVATE' : 'NORMAL'
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
    },
    toggleLock () {
      this.locked = !this.locked
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