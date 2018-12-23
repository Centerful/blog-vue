<template>
  <v-card>
    <v-layout row align-start>
      <!-- 左侧头像区域 -->
      <v-flex style="max-width: 80px;">
        <v-card-title>
          <v-avatar class="elevation-1" style="cursor: pointer;">
            <img :src="feed.creater.user_avatar" alt="avatar">
          </v-avatar>
        </v-card-title>
      </v-flex>
      <!-- 右侧动态详细信息 -->
      <v-flex>
        <v-layout column align-start py-3 pr-4>
          <!-- 显示名称 -->
          <v-flex xs12 subheading font-weight-bold style="cursor: pointer;">
            {{ feed.creater.nick_name }}
          </v-flex>
          <!-- 显示动态时间 -->
          <date-str  :margin="''" :datetime="feed.update_time"></date-str>
          <!-- 动态内容 -->
          <v-flex xs12 my-2 body-1 class="text-xs-left">{{ feed.content }}</v-flex>
          <!-- 展开/收起动态内容 -->
          <v-flex xs12 text-xs-center v-show="feed.isPrivate" style="width: 100%;">
            <span class="readmore" @click="">Read more</span>
          </v-flex>
          <!-- 点赞，回复按钮 -->
          <v-flex xs12>
            <thumbs v-model="feed.isThumbs" :thumbs_count="feed.thumbs_count"></thumbs><v-btn @click="isReply = !isReply" class="ma-1" flat icon :color="isReply ? 'blue' : 'grey darken-1'">
              <v-icon :size="20">mdi-message-reply-text</v-icon>
            </v-btn>
          </v-flex>
          <!-- 进行回复区域 -->
          <v-flex xs12 style="width: 100%;" >
            <FeedReply :reply_id="feed._id" v-model="isReply"></FeedReply>
          </v-flex>
          <!-- 查看回复区域 -->
          <v-flex xs12 style="width: 100%;">
            <CommentArea :_id="feed._id" :comments_count="feed.comments_count"></CommentArea>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import FeedReply from '@/views/feed/children/FeedReply.vue'
import CommentArea from '@/views/feed/children/CommentArea.vue'
import Thumbs from '@/components/common/Thumbs.vue'
import DateStr from '@/components/common/DateStr.vue'

export default {
  props: ['feed'],
  data: () => ({
    isReply: false
  }),
  methods: {
    readmore () {
    },
  },
  components: { FeedReply, CommentArea, Thumbs, DateStr }
}  
</script>

<style scoped>
  .readmore {
    cursor: pointer;
    text-decoration: underline;
    font-style: italic;
    font-size: 13px;
    margin-right: 8%;
  }
  .thumb-count {
    top: 3px;
    position: relative;
    margin-right: 5px;
  }
</style>
