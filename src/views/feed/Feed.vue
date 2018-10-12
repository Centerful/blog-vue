<template>
  <div class="feed">
    <placeholder :marginTop="80"/>
    <div class="feed-send-container">
      <div class="feed-send-left">
        <div class="send-input"><textarea name="" id="" placeholder="Centerful.,分享此刻的想法..."></textarea></div>
        <div class="send-toolbar">
          <div class="send-emoji send-func-btn"><icon style="font-size: 1em" name="smile"/><i class="fa fa--o"></i></div>
          <div class="send-toolbar-right">
            <div class="send-topic send-func-btn">话题</div>
            <!-- 公开,加密,隐私 -->
            <div class="send-type send-func-btn">类型</div>
            <button class="send-btn send-func-btn">发 表</button>
          </div>
        </div>
      </div>
      <div class="send-add-picture">
        <span class="">添加照片</span>
      </div>
    </div>
    <div class="feed-split">
    </div>

    <template v-if="loading">
      <div class="feed-loading"></div>
      <div class="feed-loading"></div>
      <div class="feed-loading"></div>
      <div class="feed-loading"></div>
    </template>
    <FeedItem v-else v-for="feed in feeds" :key="feed.id" :feed="feed"></FeedItem>

  </div>
</template>

<script>
// @ is an alias to /src
import FeedItem from '@/views/feed/children/FeedItem.vue'

export default {
  name: 'feed',
  data () {
    return {
      feeds: [],
      loading: true
    }
  },
  components: {
    FeedItem
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.loading = true
      this.api.getFeeds((resp) => {
        this.loading = false
        this.feeds = resp
        this.$progress.finish()
      })
    }
  }
}
</script>

<style scoped>
  .feed{
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
  .feed-wapper {
    width: 100%;
    max-width: 870px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .feed-send-container {
    width: 90%;
    max-width: 620px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .feed-send-left {
    width: 82%;
  }
  .send-input >textarea {
    width: 95%;
    height: 80px;
  }
  .send-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 95%;
  }
  .send-func-btn {
    margin: 6px 15px;
    font-size: 0.9em;
    cursor: pointer;
  }
  .send-emoji {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    border-radius: 50%;
    margin: 0;
    -webkit-font-smoothing: subpixel-antialiased;
    height: 38px;
    color: #737373;
    width: 38px;
    transition: all 0.3s;
  }
  .send-emoji:hover {
    color: #000;
    transition: all 0.3s;
  }
  .send-toolbar-right {
    display: flex;
    align-items: center;
  }
  .send-topic {

  }
  .send-type {

  }
  .send-btn {

  }
  .feed-send-right {

  }
  .send-add-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    width: 100px;
    height: 100px;
    min-width: 100px;
  }
  .send-add-picture > span {
    cursor: pointer;
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
