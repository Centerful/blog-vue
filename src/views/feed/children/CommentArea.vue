<!-- 查看feed的回复区 -->
<template>
  <!-- 查看回复bar -->
  <v-layout column align-start>
    <v-flex xs12 body-1 v-show="counter">
      <v-btn @click="_openComments" :ripple="false" flat small color="grey darken-2">
        {{ flag ? '隐藏回复' : `查看 ${counter} 条回复` }}
        <v-icon>
          {{ flag ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
    </v-flex>
    <!-- 查看回复区域 -->
    <v-flex xs12 v-show="fetching">
      <v-progress-circular
        v-show="flag"
        indeterminate
        :size="24"
        :width="2"
        color="primary"
        class="ma-3"
      ></v-progress-circular>
    </v-flex>
    <v-flex xs12 style="width: 100%;" v-show="!fetching && flag" >
      <FeedComment :comment="comment" v-for="comment in comments" :feed_id="feed_id" :key="comment._id"></FeedComment>
    </v-flex>
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
    feed_id: {
      type: String,
      required: true
    }
  },
  computed: {
    counter () {
      return this.comments_count + this.tempCount
    }
  },
  data: () => ({
    comments: [],
    tempCount: 0,
    flag: false, // 控制回复bar的显示文字
    fetching: false, // 加载中进度条
    firstFetch: true // 控制只有第一次才能加载
  }),
  mounted () {
    // 每个feed都是不同的unshift事件。
    this.$bus.on(`feedUnshiftComment${this.feed_id}`, this.unshiftComments)
  },
  methods: {
    // 打开评论区
    _openComments () {
      this.flag = !this.flag
      // 加载评论
      if (this.flag) this._fetchComments()
    },
    // 对外暴露的方法,用户添加评论后在comment中unshift该评论，避免重复fetch数据
    unshiftComments (comment) {
      this.tempCount += 1
      this.comments.unshift(comment)
    },
    _fetchComments () {
      if (!this.firstFetch) return 
      this.firstFetch = false
      this.fetching = true
      this.api.getFeedComments((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        // 自己排序下
        this.comments = res.data.comments.sort((x, y) => {
          return x._id < y._id ? 1 : -1
        })
        this.fetching = false
      }, this.feed_id)
    }
  },
  components: { FeedComment }
}
</script>

<style>
  
</style>