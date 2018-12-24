<template>
  <!-- :class="{ private: feed.isPrivate }" -->
  <div class="feed-show-item" :class="{ private: feed.isPrivate }">
    <div class="feed-item-bar" :class="{ private: feed.isPrivate }">
      <icon class="ellipsis" :class="{private: feed.isPrivate }" name="ellipsis-h"/></div>
    <div class="feed-item-left">
      <v-avatar :tile="tile" :size="avatarSize" color="grey lighten-4">
        <img :src="feed.user.user_avatar" alt="avatar">
      </v-avatar>
    </div>
    <div class="feed-item-right">
      <div class="feed-right-header">
        <div class="feed-auth-name">{{ feed.user.nick_name }}</div>
        <div class="feed-time">{{ utils.dateFmt(new Date(feed.update_time), 'MM-dd hh:mm') }}</div>
      </div>
      <div class="feed-right-centent" :class="{ private: feed.isPrivate,open: isFold }">
        {{ feed.content }}
      </div>
      <div class="feed-right-footer" :class="{ private: feed.isPrivate }">
        <template v-if="feed.isPrivate">
          <div class="feed-right-footer-btn private" @click="toggleFold()">
            Read more
          </div>
        </template>
        <template v-else>
          <div class="feed-footer-bar">
            <div class="feed-footer-zen">
              <div class="feed-footer-icon" @click="toggleThumbs()"><icon class="thumbs" :class="{up: isThumbs}" name="regular/thumbs-up"/></div>
              <div class="feed-footer-number">{{ feed.thumbs_count }}</div>
            </div>
            <div class="feed-footer-btn" @click="toggleReplie()">回复</div>
          </div>
          <template v-if="isReplie">
            <div class="feed-replie-bar">
              <div class="feed-replie-field">
                <div class="feed-replie-avatar"></div>
                <input class="feed-replie-input" type="text" placeholder="添加公开回复...">
              </div>
              <div class="feed-replie-btn">
                <button @click="toggleReplie()">取消</button>
                <button @click="toggleReplie()">回复</button>
              </div>
            </div>
          </template>
          <div class="feed-replies-look" v-if="feed.comments_count">
            <template v-if="feedId">
              <div class="feed-footer-btn inline" @click="toggleReplieArea()">隐藏回复
                <icon class="chevron up" name="chevron-up"/>
              </div>
            </template>
            <template v-else>
              <div class="feed-footer-btn inline" @click="toggleReplieArea()">查看 {{ feed.comments_count }} 条回复
                <icon class="chevron" name="chevron-down"/>
              </div>
            </template>
          </div>
          <template v-if="feedId">
            <FeedReplie v-for="replie in feedReplies" :key="replie._id" :replie="replie"></FeedReplie>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import FeedReplie from '@/views/feed/children/FeedReplie'

export default {
  props: ['feed'],
  data () {
    return {
      // 展开与收起私密动态的评论.
      isFold: false,
      // 是否点赞
      isThumbs: false,
      // 是否回复feed
      isReplie: false,
      // 是否显示回复
      showReplies: false,
      // feedId 如果赋值,回复栏会加载出来.如果为null,回复栏会隐藏
      feedId: null,
      // feedReplies 当前feed的回复信息 -> 数组,单次只加载10条.
      feedReplies: []
    }
  },
  components: { FeedReplie },
  watch: {
  },
  created () {
    // feed -> isThumbs.
  },
  methods: {
    // 展开或隐藏私密feed
    toggleFold () {
      this.isFold = !this.isFold
    },
    // 点赞或取消点赞
    toggleThumbs () {
      if (this.isThumbs) {
        this.feed.thumbs -= 1
      } else {
        this.feed.thumbs += 1
      }
      this.isThumbs = !this.isThumbs
    },
    // 进行回复或取消回复.
    toggleReplie () {
      this.isReplie = !this.isReplie
    },
    // 显示隐藏回复
    toggleReplieArea () {
      if (this.feedId) { // 如果feedId被赋值了则需要隐藏.
        this.feedId = null
      } else {
        this.feedId = this.feed._id
        this.api.getFeedComments((res) => {
          this.feedReplies = res
        }, this.feed._id)
      }
    }
  }
}
</script>

<style scoped>
  .feed-show-item {
    width: 90%;
    max-width: 620px;
    display: flex;
    position: relative;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
    margin-bottom: 30px;
  }
  /*.feed-item-left {
    width: 45px;
    height: 45px;
    min-width: 45px;
    min-height: 45px;
    margin: 10px;
    background-color: #afafaf;
    border-radius: 50%;
    cursor: pointer;
  }*/
  .feed-item-right {
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 100%;
  }
  .feed-right-header {
    display: flex;
    align-items: baseline;
  }
  .feed-auth-name {
    font-weight: bold;
    margin-top: 2px;
    cursor: pointer;
    margin-right: 20px;
  }
  .feed-time {
    font-size: 0.8em;
  }
  .feed-item-bar {
    color: #555;
    cursor: pointer;
    margin: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .ellipsis {
    font-size: 0.9em;
  }
  .ellipsis.private {
    color: #fff;
  }
  .feed-item-bar.private{
    color: #eee;
  }
  .feed-right-centent {
    font-size: 0.9em;
    width: 93%;
    max-width: 535px;
    margin: 2px 0 8px 0;
    word-break: break-all;
  }
  .feed-right-footer {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
  .feed-footer-bar {
    display: flex;
    margin-bottom: 8px;
    align-items: baseline;
  }
  .feed-footer-btn {
    margin-right: 30px;
    font-size: 0.9em;
    cursor: pointer;
    display: flex;
    align-items: baseline;
  }
  .chevron {
    font-size: 0.8em;
    position: relative;
    top: 2px;
    margin-left: 5px;
  }
  .chevron.up {
    top: 1px;
  }
  .feed-footer-btn.inline {
    display: inline-block;
  }
  .feed-footer-btn.inline > i {
    font-size: 0.9em;
    margin-left: 6px;
    position: relative;
    top: -1px;
    color: #555;
  }
  .feed-footer-btn.open {
    margin-bottom: 15px;
  }
  .feed-footer-zen {
    margin-right: 25px;
    display: flex;
    align-items: baseline;
  }
  .feed-footer-icon {
    margin-right: 10px;
    cursor: pointer;
  }
  .thumbs {
    font-size: 1em;
  }
  .thumbs.up {
    color: #4a91fd;
  }
  .feed-footer-number {
    font-size: 0.8em;
  }
  .feed-show-item.private {
    background-color: #737373;
    color: #fff;
  }
  .feed-right-centent.private {
    word-break: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: default;
  }
  .feed-right-centent.private.open {
    word-break: break-all;
  }
  .feed-right-footer.private {
    align-items: center;
  }
  .feed-right-footer-btn.private {
    margin-right: 35px;
    font-size: 0.8em;
    cursor: pointer;
    text-decoration: underline;
    font-style: italic;
  }
  .feed-replie-bar {
    display: flex;
    flex-direction: column;
  }
  .feed-replie-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .feed-replie-avatar {
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
    background-color: #afafaf;
    border-radius: 50%;
    margin: 5px;
    margin-right: 10px;
  }
  .feed-replie-input {
    width: 100%;
    height: 25px;
  }
  .feed-replie-btn {
    display: flex;
    justify-content: flex-end;
  }
  .feed-replie-btn > button {
    padding: 3px 10px;
    margin: 5px;
  }
  .feed-centent-picture {
    display: flex;
    margin-bottom: 15px;
    flex-wrap: wrap;
    align-items: center;
  }
  .feed-picture-item {
    width: 80px;
    height: 80px;
    margin: 10px;
    background-color: #a0bfa1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 0px -2px rgba(0,0,0,.2), 0 1px 2px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
  }
  .feed-picture-item.more {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #acd2ad;
  }
  .feed-centent-video {
    width: 130px;
    height: 80px;
    margin: 10px;
    margin-bottom: 25px;
    background-color: #ffda66;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 0px -2px rgba(0,0,0,.2), 0 1px 2px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
  }
  .feed-centent-video.open{
    width: 500px;
    height: 309px;
  }
</style>
