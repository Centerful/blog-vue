<template>
  <!-- 查看回复bar -->
  <v-layout column align-start>
    <v-flex xs12 body-1 v-show="comments_count">
      <v-btn @click="toComments" :ripple="false" flat small color="grey darken-2">
        {{ flag ? '隐藏回复' : `查看 ${comments_count} 条回复` }}
        <v-icon>
          {{ flag ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
    </v-flex>
    <!-- 查看回复区域 -->
    <template v-if="fetching">
      <v-flex xs12>
        <v-progress-circular
          v-show="flag"
          indeterminate
          :size="24"
          :width="2"
          color="primary"
          class="ma-3"
        ></v-progress-circular>
      </v-flex>
    </template>
    <template>
      <v-flex xs12 style="width: 100%;" v-show="flag" >
        <FeedComment :comment="comment" v-for="comment in comments" v-key="comment._id"></FeedComment>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import FeedComment from '@/views/feed/children/FeedComment.vue'

export default {
  props: {
    comments_count: {
      type: Number,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    comments: [],
    flag: false,
    fetching: false
  }),
  methods: {
    toComments () {
      this.flag = !this.flag
      if (this.flag) this._fetchComments()
    },
    _fetchComments () {
      if (this.comments && this.comments.length) return
      this.fetching = true
      // TODO
      setTimeout(() => {
        this.comments = [
          {
            _id: 'qweqwe',
            user: {
              "nick_name": 'Asuka.',
              "user_avatar": "http://localhost:3000/public/images/default_user_avater.jpg",
              "_id": "5bf36f27f927530f3005ec7d",
            },
            update_time: '2018-12-20T06:30:48.391Z',
            content: '我怎么觉得很累呢~~~',
            thumbs_count: 2,
            isThumbs: false,
            reply: 'qweqweqweqwe', //回复了那个评论
            reply_user: {
              "nick_name": 'Asuka.',
              "user_avatar": "http://localhost:3000/public/images/default_user_avater.jpg",
              "_id": "5bf36f27f927530f3005ec7d",
            }
          },{
            _id: 'qweeeeee',
            user: {
              "nick_name": 'Asuka.',
              "user_avatar": "http://localhost:3000/public/images/default_user_avater.jpg",
              "_id": "5bf36f27f927530f3005ec7d",
            },
            update_time: '2018-12-20T06:30:48.391Z',
            content: '我怎么觉得很累呢~~~',
            thumbs_count: 2,
            isThumbs: false,
            reply: 'qweqweqweqwe', //回复了那个评论
            reply_user: {
              "nick_name": 'Asuka.',
              "user_avatar": "http://localhost:3000/public/images/default_user_avater.jpg",
              "_id": "5bf36f27f927530f3005ec7d",
            }
          },
        ]
        this.fetching = false
      }, 2000)
    }
  },
  components: { FeedComment }
}
</script>

<style>
  
</style>