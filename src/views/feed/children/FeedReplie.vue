<template>
  <div class="feed-replies-item">
    <div class="feed-replies-left">
      <div class="feed-replie-avatar" style="background-color: #00BCD4;"></div>
    </div>
    <div class="feed-replies-right">
      <div class="feed-replies-header">
        <div class="feed-replies-name">{{ replie.name }}</div>
        <template v-if="replie.replyId">
          <div class="feed-replies-name-reply">回复</div>
          <div class="feed-replies-name">{{ replie.replyName }}</div>
        </template>
        <div class="feed-replies-time">{{ replie.replieTime }}</div>
      </div>
      <div class="feed-replies-content">{{ replie.words }}</div>
      <div class="feed-replies-footer">
        <div class="feed-footer-bar">
          <div class="feed-footer-zen">
            <div class="feed-footer-icon" @click="toggleThumbs()"><icon class="thumbs" :class="{up: isThumbs}" name="thumbs-up"/></div>
            <div class="feed-footer-number">{{ replie.thumbs }}</div>
          </div>
          <div class="feed-footer-btn" @click="toggleReplie()">回复</div>
        </div>
        <template v-if="isReplie">
          <div class="feed-replie-bar">
            <div class="feed-replie-field">
              <div class="feed-replie-avatar" style="background-color: #00BCD4;"></div>
              <input class="feed-replie-input" type="text" placeholder="添加公开回复..." value="">
            </div>
            <div class="feed-replie-btn">
              <button @click="toggleReplie()">取消</button>
              <button @click="toggleReplie()">回复</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['replie'],
  data () {
    return {
      isThumbs: false,
      isReplie: false
    }
  },
  methods: {
    toggleThumbs () {
      if (this.isThumbs) {
        this.replie.thumbs -= 1
      } else {
        this.replie.thumbs += 1
      }
      this.isThumbs = !this.isThumbs
    },
    toggleReplie () {
      this.isReplie = !this.isReplie
    }
  }
}
</script>

<style scoped>
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
  .feed-replies-item {
    display: flex;
  }
  .feed-replies-left {

  }
  .feed-replies-right {
    margin: 2px;
    width: 100%;
  }
  .feed-replies-header {
    display: flex;
    align-items: baseline;
  }
  .feed-replies-name {
    font-size: 0.9em;
    margin-right: 15px;
    font-weight: bold;
  }
  .feed-replies-name-reply {
    font-size: 0.85em;
    margin-right: 15px;
  }
  .feed-replies-time {
    font-size: 0.7em;
  }
  .feed-replies-content {
    font-size: 0.9em;
    width: 93%;
    max-width: 535px;
    margin: 2px 0 8px 0;
    word-break: break-all;
  }
  .feed-replies-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
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
</style>
