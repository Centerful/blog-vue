<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent max-width="670px">
      <v-card>
        <!-- 评论头部 -->
        <v-card-title>
          <span class="subheading font-weight-bold">7,746 条评论</span>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <!-- 评论展示区 -->
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              
            </v-layout>
          </v-container>
        </v-card-text>
        <!-- 评论回复区 -->
        <v-layout pa-2 column>
          <v-flex><v-divider></v-divider></v-flex>
          <v-flex mx-3>
            <v-textarea
              v-model="replyWord"
              id="replyTextArea"
              placeholder="写下你的评论..."
              single-line
              rows="1"
              auto-grow
              :disabled="loading"
            ></v-textarea>
          </v-flex>
          <v-card-actions class="pa-1 mx-2 mr-3">
            <v-menu offset-y top  transition="slide-y-transition">
              <v-btn flat slot="activator">
                颜文字
              </v-btn>
              <EmojiWordPicker :pick="pick"></EmojiWordPicker>
            </v-menu>
            <v-menu class="ml-2" offset-y top transition="slide-y-transition">
              <v-btn flat icon slot="activator">
                <v-icon>mdi-emoticon-outline</v-icon>
              </v-btn>
              <EmojiPicker :pick="pick"></EmojiPicker>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn @click="toReply" :loading="loading" :disabled="disabled || loading" color="info">发布</v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import EmojiWordPicker from '@/components/common/EmojiWordPicker.vue'
import EmojiPicker from '@/components/common/EmojiPicker.vue'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  model: {
    value: 'value',
    event: 'update'
  },
  data: () => ({
    replyWord: '',
    loading: false
  }),
  computed: {
    disabled () {
      return !this.replyWord
    }
  },
  watch: {
    '$route': {
      handler: 'fetchData',
      immediate: true // 立马执行一次,相当于created中调用一次.
    }
  },
  methods: {
    fetchData () {
      this.api.getComments((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        this.comments = res.data
        // 加载完成后，取消滚动条，显示评论
        this.fetching = false
        this.commentFlag = true
      }, {
        relation: this.rela_id,
        start_id: null
      })
    },
    close () {
      this.$emit('update', false)
    },
    pick (val) {
      this.replyWord = this.utils.insertSomething('replyTextArea', this.replyWord, val)
    },
    toReply () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.replyWord = ''
      }, 3000)
    }
  },
  components: { EmojiWordPicker, EmojiPicker }
}
</script>

<style></style>