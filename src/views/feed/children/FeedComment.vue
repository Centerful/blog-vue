<!-- feed下每条评论 -->
<template>
  <v-flex xs12 @mouseover="isHover = true" @mouseout="isHover = false">
    <v-layout row align-start>
      <v-menu z-index="30" bottom offset-y v-show="isHover" style="position: absolute;right: 0;">
        <v-icon slot="activator" class="ma-2" :color="theme.icon[theme_style]" style="cursor: pointer;">mdi-dots-horizontal</v-icon>
        <v-list>
        <v-list-tile v-for="(item, i) in ops" :key="i" @click="options(item.code)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
        </v-list>
      </v-menu>
      <v-flex style="max-width: 64px;">
        <v-avatar class="ma-3 elevation-1" :size="32" style="cursor: pointer;user-select: none;">
          <img :src="comment.user.user_avatar" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-layout column align-start>
          <v-flex xs12 d-flex align-baseline pt-2 style="user-select: none;">
            <v-flex subheading font-weight-bold style="cursor: pointer;">{{ comment.user.nick_name }}</v-flex>
            <template v-if="comment.reply">
              <v-flex style="margin: 0 10px;font-size: 13px;">回复</v-flex>
              <v-flex subheading font-weight-bold style="cursor: pointer;">{{ comment.reply_user.nick_name }}</v-flex>
            </template>
            <date-str :datetime="comment.update_time"></date-str>
          </v-flex>
          <v-flex body-1 xs12 class="text-xs-left">{{ comment.content }}</v-flex>
          <v-flex xs12>
            <thumbs v-model="comment.isThumb" :theme_style="theme_style" :thumb="thumb"></thumbs><v-btn class="ma-1" @click="isReply = !isReply" flat icon :color="theme.btn[theme_style][isReply]">
              <v-icon :size="20">mdi-message-reply-text</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 style="width: 100%;" >
            <FeedReply :reply="reply" :theme_style="theme_style" v-model="isReply"></FeedReply>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import FeedReply from '@/views/feed/children/FeedReply.vue'
import Thumbs from '@/components/common/Thumbs.vue'
import DateStr from '@/components/common/DateStr.vue'

export default {
  props: {
    comment: Object,
    feed_id: {
      type: String,
      required: true
    },
    theme_style: {
      type: String,
      default: 'light'
    }
  },
  data: () => ({
    isReply: false,
    isHover: false,
    ops: [
      // 我自己发表的评论，或是feed的主人可以删除评论
      {code: 'del', title: '删除评论'},
    ],
    theme: {
      icon: {
        dark: 'grey lighten-3',
        light: 'grey darken-1'
      },
      btn: {
        dark: {
          true: 'red',
          false: 'grey lighten-3'
        },
        light: {
          true: 'blue',
          false: 'grey darken-1'
        }
      }
    }
  }),
  computed: {
    reply () {
      return {
        seq_id: this.comment._id,
        relation: this.feed_id,
        relation_type: 'COMMENT',
        reply_id: this.comment._id,
        reply_user: this.comment.user._id,
        // 直接回复feed的没有origin，回复comment的都有。
        origin: this.comment.origin || this.comment._id,
      }
    },
    thumb () {
      return {
        relation: this.comment._id,
        relation_type: 'COMMENT',
        thumbs_count: this.comment.thumbs_count,
      }
    }
  },
  methods: {
    options (code) {
      switch (code) {
        case 'del':
          let delObj = {
            title: '删除确认',
            content: '删除评论后无法恢复，请确认是否删除！',
            confirmColor: 'red',
            confirm: this._delComment, // 传递confirm时callback函数。
          }
          this.$bus.emit('confirm', delObj)
          break
      }
    },
    _delComment () {
      this.api.deleteComment((res)=>{
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        this.$emit('delComment', this.comment._id)
      }, this.comment._id)
      
    }
  },
  components: { FeedReply, Thumbs, DateStr }
}
</script>

<style>
  
</style>