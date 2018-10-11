<template>
  <!-- :class="{ private: feed.isPrivate }" -->
  <div class="talk-show-item" :class="{ private: feed.isPrivate }">
    <div class="talk-item-bar" :class="{ private: feed.isPrivate }">
      <icon class="ellipsis" :class="{private: feed.isPrivate }" name="ellipsis-h"/></div>
    <div class="talk-item-left"></div>
    <div class="talk-item-right">
      <div class="talk-right-header">
        <div class="talk-auth-name">{{ feed.name }}</div>
        <div class="talk-time">{{ feed.talkTime }}</div>
      </div>
      <div class="talk-right-centent" :class="{ private: feed.isPrivate,open: isFold }">
        {{ feed.words }}
      </div>
      <div class="talk-right-footer" :class="{ private: feed.isPrivate }">
        <template v-if="feed.isPrivate">
          <div class="talk-right-footer-btn private" @click="toggleFold()">
            Read more
          </div>
        </template>
        <template v-else>
          <div class="talk-footer-bar">
            <div class="talk-footer-zen">
              <div class="talk-footer-icon" @click="toggleThumbs()"><icon class="thumbs" :class="{up: isThumbs}" name="regular/thumbs-up"/></div>
              <div class="talk-footer-number">{{ feed.thumbs }}</div>
            </div>
            <div class="talk-footer-btn" @click="toggleReplie()">回复</div>
          </div>
          <template v-if="isReplie">
            <div class="talk-replie-bar">
              <div class="talk-replie-field">
                <div class="talk-replie-avatar"></div>
                <input class="talk-replie-input" type="text" placeholder="添加公开回复...">
              </div>
              <div class="talk-replie-btn">
                <button @click="toggleReplie()">取消</button>
                <button @click="toggleReplie()">回复</button>
              </div>
            </div>
          </template>
          <div class="talk-replies-look" v-if="feed.replies">
            <template v-if="feedId">
              <div class="talk-footer-btn inline" @click="toggleReplieArea()">隐藏回复
                <icon class="chevron up" name="chevron-up"/>
              </div>
            </template>
            <template v-else>
              <div class="talk-footer-btn inline" @click="toggleReplieArea()">查看 {{ feed.replies }} 条回复
                <icon class="chevron" name="chevron-down"/>
              </div>
            </template>
          </div>
          <template v-if="feedId">
            <FeedReplie v-for="replie in feedReplies" :key="replie.id" :replie="replie"></FeedReplie>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import FeedReplie from '@/components/FeedReplie'

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
        this.feedId = this.feed.id
        this.api.getFeedReplies(this.feed.id, (resp) => {
          console.log(resp)
          this.feedReplies = resp
        })
      }
    }
  }
}
</script>

<style scoped>
  .talk-show-item {
    width: 90%;
    max-width: 620px;
    display: flex;
    position: relative;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12);
    margin-bottom: 30px;
  }
  .talk-item-left {
    width: 45px;
    height: 45px;
    min-width: 45px;
    min-height: 45px;
    margin: 10px;
    background-color: #afafaf;
    border-radius: 50%;
    cursor: pointer;
  }
  .talk-item-right {
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 100%;
  }
  .talk-right-header {
    display: flex;
    align-items: baseline;
  }
  .talk-auth-name {
    font-weight: bold;
    margin-top: 2px;
    cursor: pointer;
    margin-right: 20px;
  }
  .talk-time {
    font-size: 0.8em;
  }
  .talk-item-bar {
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
  .talk-item-bar.private{
    color: #eee;
  }
  .talk-right-centent {
    font-size: 0.9em;
    width: 93%;
    max-width: 535px;
    margin: 2px 0 8px 0;
    word-break: break-all;
  }
  .talk-right-footer {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
  .talk-footer-bar {
    display: flex;
    margin-bottom: 8px;
    align-items: baseline;
  }
  .talk-footer-btn {
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
  .talk-footer-btn.inline {
    display: inline-block;
  }
  .talk-footer-btn.inline > i {
    font-size: 0.9em;
    margin-left: 6px;
    position: relative;
    top: -1px;
    color: #555;
  }
  .talk-footer-btn.open {
    margin-bottom: 15px;
  }
  .talk-footer-zen {
    margin-right: 25px;
    display: flex;
    align-items: baseline;
  }
  .talk-footer-icon {
    margin-right: 10px;
    cursor: pointer;
  }
  .thumbs {
    font-size: 1em;
  }
  .thumbs.up {
    color: #4a91fd;
  }
  .talk-footer-number {
    font-size: 0.8em;
  }
  .talk-show-item.private {
    background-color: #737373;
    color: #fff;
  }
  .talk-right-centent.private {
    word-break: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: default;
  }
  .talk-right-centent.private.open {
    word-break: break-all;
  }
  .talk-right-footer.private {
    align-items: center;
  }
  .talk-right-footer-btn.private {
    margin-right: 35px;
    font-size: 0.8em;
    cursor: pointer;
    text-decoration: underline;
    font-style: italic;
  }
  .talk-replie-bar {
    display: flex;
    flex-direction: column;
  }
  .talk-replie-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .talk-replie-avatar {
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
    background-color: #afafaf;
    border-radius: 50%;
    margin: 5px;
    margin-right: 10px;
  }
  .talk-replie-input {
    width: 100%;
    height: 25px;
  }
  .talk-replie-btn {
    display: flex;
    justify-content: flex-end;
  }
  .talk-replie-btn > button {
    padding: 3px 10px;
    margin: 5px;
  }
  .talk-centent-picture {
    display: flex;
    margin-bottom: 15px;
    flex-wrap: wrap;
    align-items: center;
  }
  .talk-picture-item {
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
  .talk-picture-item.more {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #acd2ad;
  }
  .talk-centent-video {
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
  .talk-centent-video.open{
    width: 500px;
    height: 309px;
  }
</style>
