<!-- blog的回复,feed的回复,评论的回复 -->
<template>
  <v-flex v-if="value" style="text-align: center;">
    <v-progress-circular v-if="inReply"
      indeterminate
      :size="24"
      :width="2"
      color="primary"
      class="ma-2"
    ></v-progress-circular>
    <template v-else>
      <v-layout row align-start>
        <v-flex ma-3 style="max-width: 32px;">
          <v-avatar class="elevation-1" :size="32">
            <img :src="user_avatar" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex>
          <v-text-field :id="reply.seq_id" :rules="reply_content_rule" v-model="reply_content" placeholder="添加回复..." autofocus></v-text-field>
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
        <v-btn color="info" @click="toReply">回复</v-btn>
      </v-card-actions>
    </template>
  </v-flex>
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
    reply: {
      seq_id: {
        type: String,
        required: true
      },
      relation: {
        type: String,
        required: true
      },
      relation_type: {
        type: String,
        required: true
      },
      reply_id: String,
      reply_user: String,
      origin: String
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
    // 对feed或评论或blog进行回复
    toReply () {
      this.inReply = true
      // 新增评论
      this.api.addComment((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        // 发布成功后
        this.inReply = false
        this.reply_content = ''
        // 调用unshift事件，在评论中添加自己的评论
        this.$bus.emit(`unshiftComment${this.reply.relation}`, res.data)
        this.$emit('update', false)
      }, {
        relation: this.reply.relation,
        relation_type: this.reply.relation_type,
        origin: this.reply.origin,
        reply: this.reply.reply_id,
        reply_user: this.reply.reply_user,
        content: this.reply_content
      })
    },
    pick (val) {
      this.reply_content = this.utils.insertSomething(this.reply.seq_id, this.reply_content, val)
    }
  }
}
</script>

<style>
  
</style>