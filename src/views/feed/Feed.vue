<template>
  <div class="feed">
    <placeholder :marginTop="80"/>
    <FeedSend @sendout="fetchData"></FeedSend>
    <div class="feed-split">
    </div>
    <FeedCard 
      class="ma-2" 
      v-model="feed.feed_status" 
      v-for="feed in feeds" 
      :key="feed._id" 
      :feed="feed" 
      style="width: 80%;max-width: 620px;"
      @delFeed="delFeed"
      ></FeedCard>
    <v-flex ma-3>
      <v-btn @click="loadmore" v-show="more && !loading" :ripple="false" flat small color="grey darken-2">
        查看更多动态
      </v-btn>
      <h5 v-show="!more && !loading">暂无更多动态</h5>
      <v-progress-circular
        v-show="loading"
        indeterminate
        :size="24"
        :width="2"
        color="primary"
        class="ma-3"
      ></v-progress-circular>
    </v-flex>
  </div>
</template>

<script>
import FeedSend from '@/views/feed/children/FeedSend.vue'
import FeedCard from '@/views/feed/children/FeedCard.vue'

export default {
  name: 'feed',
  data () {
    return {
      feeds: [],
      loading: true,
      more: true
    }
  },
  components: {
    FeedSend, FeedCard
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': {
      handler: 'fetchData',
      immediate: true // 立马执行一次,相当于created中调用一次.
    }
  },
  methods: {
    delFeed (feed_id) {
      let index = null
      this.feeds.find((e, i) => {
        console.log(this)
        if (e._id === feed_id) {
          index = i
          return e
        }
      })
      this.feeds.splice(index, 1)
    },
    // 获取动态信息
    fetchData () {
      this.loading = true
      this.api.getFeeds((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        this.loading = false
        this.feeds = res.data
        this.$progress.finish()
      })
    },
    loadmore () {
      this.loading = true
      this.api.getFeeds((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        this.loading = false
        if (!res.data || res.data.length <= 0) {
          this.more = false
          return 
        }
        for (let e in res.data)
          this.feeds.push(res.data[e])
      }, {
        _id: this.feeds[this.feeds.length - 1]._id
      })
    }
  }
}
</script>

<style scoped>
  .feed {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
  }
  .feed-split {
    border-bottom: 1px solid #ccc;
    margin: 30px;
    width: 80%;
  }
  .feed-loading {
    width: 90%;
    max-width: 620px;
    display: flex;
    position: relative;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
    margin-bottom: 30px;
    height: 60px;
    background-color: #ccc;
  }
</style>
