<template>
  <div v-show="value">
    <template v-if="inReply">
      <v-progress-circular
        indeterminate
        :size="24"
        :width="2"
        color="primary"
      ></v-progress-circular>
    </template>
    <template v-else>
      <v-layout row align-start>
        <v-flex ma-3 style="max-width: 32px;">
          <v-avatar class="elevation-1" :size="32">
            <img :src="user_avatar" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex>
          <v-text-field :id="reply_id" :rules="reply_content_rule" v-model="reply_content" placeholder="添加回复..." autofocus></v-text-field>
        </v-flex>
      </v-layout>
      <v-card-actions class="pa-1">
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
        <v-spacer></v-spacer>
        <v-btn flat @click="cancel">取消</v-btn>
        <v-btn color="info" @click="reply">回复</v-btn>
      </v-card-actions>
    </template>
  </div>
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
    reply_id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    reply_content: '',
    inReply: false,
    reply_content_rule: [
      v => {
        if (!v) {
          return "回复不能为空！"
        }
        return true
      }
    ],
  }),
  computed: {
    user_avatar () {
      // TODO
      return "http://localhost:3000/public/images/default_user_avater.jpg"
    }
  },
  model: {
    value: 'value',
    event: 'update'
  },
  components: {
    EmojiWordPicker, EmojiPicker
  },
  methods: {
    cancel () {
      this.reply_content = ''
      this.$emit('update', false)
    },
    reply () {
      // 回复动态 TODO
      // this.api.reply()
      this.inReply = true
      setTimeout(() => {
        this.inReply = false
        this.reply_content = ''
        this.$emit('update', false)
      }, 2200)
    },
    pick (val) {
      this.reply_content = this.utils.insertSomething(this.reply_id, this.reply_content, val)
    }
  }
}
</script>

<style>
  
</style>