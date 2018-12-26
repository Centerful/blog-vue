<!-- 每条feed -->
<template>
  <v-card  @mouseover="isHover = true" @mouseout="isHover = false" :color="theme.card[theme_style]" style="margin: 3px;" :style="{color: theme.font[theme_style]}">
    <v-layout row align-start>
      <feed-card-btn
        v-show="isHover"
        :type="feed.feed_status" 
        @public="public"
        @del="del"
        style="position: absolute;right: 0;top: 0;"></feed-card-btn>
      <!-- 左侧头像区域 -->
      <v-flex style="max-width: 80px;">
        <v-card-title class="justify-center">
          <v-avatar class="elevation-1" style="cursor: pointer;user-select: none;">
            <img :src="feed.user.user_avatar" alt="avatar">
          </v-avatar>
          <v-tooltip bottom v-if="feed.feed_status === 'PRIVATE'" class="ma-3" color="teal">
            <v-icon small slot="activator" color="grey lighten-3">mdi-lock</v-icon>
            <span>仅自己可见</span>
          </v-tooltip>
        </v-card-title>
      </v-flex>
      <!-- 右侧动态详细信息 -->
      <v-flex>
        <v-layout column align-start py-3 pr-4>
          <!-- 显示名称 -->
          <v-flex xs12 subheading font-weight-bold style="cursor: pointer;user-select: none;">
            {{ feed.user.nick_name }}
          </v-flex>
          <!-- 显示动态时间 -->
          <date-str  :margin="''" :datetime="feed.update_time"></date-str>
          <!-- 动态内容 -->
          <v-flex xs12 my-2 body-1 class="text-xs-left">{{ feed.content }}</v-flex>
          <!-- 视频，图像展示 TODO -->
          <FeedImage v-if="feed.images" ref="imgContainer" :readOnly="true" v-model="feed.images"></FeedImage>
          <!-- 展开/收起动态内容 -->
          <v-flex xs12 text-xs-center v-show="false" style="width: 100%;">
            <span class="readmore" @click="">Read more</span>
          </v-flex>
          <!-- 点赞，回复按钮 -->
          <v-flex xs12>
            <thumbs 
              v-model="feed.isThumb" 
              :thumb="thumb" 
              :theme_style="feed.feed_status === 'PRIVATE' ? 'dark' : 'light'"
              ></thumbs><v-btn @click="isReply = !isReply" class="ma-1" flat icon :color="theme.btn[theme_style][isReply]">
              <v-icon :size="20">mdi-message-reply-text</v-icon>
            </v-btn>
          </v-flex>
          <!-- 进行回复区域 -->
          <v-flex xs12 style="width: 100%;" >
            <FeedReply :theme_style="feed.feed_status === 'PRIVATE' ? 'dark' : 'light'" :reply="reply" v-model="isReply"></FeedReply>
          </v-flex>
          <!-- 查看回复区域 -->
          <v-flex xs12 style="width: 100%;">
            <CommentArea 
              :theme_style="this.feed.feed_status === 'PRIVATE' ? 'dark' : 'light'" 
              :feed_id="feed._id" 
              :comments_count="feed.comments_count"></CommentArea>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import FeedImage from '@/views/feed/children/FeedImage.vue'
import FeedReply from '@/views/feed/children/FeedReply.vue'
import CommentArea from '@/views/feed/children/CommentArea.vue'
import FeedCardBtn from '@/views/feed/children/FeedCardBtn.vue'
import Thumbs from '@/components/common/Thumbs.vue'
import DateStr from '@/components/common/DateStr.vue'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    feed: Object
  },
  model: {
    value: 'value',
    event: 'update'
  },
  data: () => ({
    isReply: false,
    isHover: false,
    theme: {
      card: {
        private: 'grey darken-2',
        light: 'white'
      },
      font: {
        private: 'white',
        light: 'black'
      },
      btn: {
        private: {
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
  methods: {
    readmore () {
      console.log('显示详细信息')
    },
    public () {
      let pubObj = {
        title: '操作确认',
        content: '动态设置为所有人可见后，不能再次设置为私密，请确认操作！',
        confirmColor: 'info',
        confirm: this._pubFeed,
      }
      this.$bus.emit('confirm', pubObj)
    },
    _pubFeed () {
      this.api.feedPublic((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        this.$emit('update', 'NORMAL')
      }, this.feed._id)
    },
    del () {
      let delObj = {
        title: '删除确认',
        content: '删除动态后无法恢复，请确认是否删除！',
        confirmColor: 'red',
        confirm: this._delFeed, // 传递confirm时callback函数。
      }
      this.$bus.emit('confirm', delObj)
    },
    _delFeed () {
      this.api.deleteFeed((res)=>{
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        this.$emit('delFeed', this.feed._id)
      }, this.feed._id)
    }
  },
  computed: {
    theme_style () {
      if (this.feed.feed_status === 'PRIVATE') {
        return 'private'
      } else {
        return 'light'
      }
    },
    reply () {
      return {
        seq_id: this.feed._id,
        relation: this.feed._id,
        relation_type: 'FEED'
      }
    },
    thumb () {
      return {
        relation: this.feed._id,
        relation_type: 'FEED',
        thumbs_count: this.feed.thumbs_count
      }
    }
  },
  components: { FeedImage, FeedReply, CommentArea, FeedCardBtn, Thumbs, DateStr }
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
