<template>
  <div class="talk-replies-item">
    <div class="talk-replies-left">
      <div class="talk-replie-avatar" style="background-color: #00BCD4;"></div>
    </div>
    <div class="talk-replies-right">
      <div class="talk-replies-header">
        <div class="talk-replies-name">{{ replie.name }}</div>
        <template v-if="replie.replyId">
          <div class="talk-replies-name-reply">回复</div>
          <div class="talk-replies-name">{{ replie.replyName }}</div>
        </template>
        <div class="talk-replies-time">{{ replie.replieTime }}</div>
      </div>
      <div class="talk-replies-content">{{ replie.words }}</div>
      <div class="talk-replies-footer">
        <div class="talk-footer-bar">
          <div class="talk-footer-zen">
            <div class="talk-footer-icon" @click="toggleThumbs()"><icon class="thumbs" :class="{up: isThumbs}" name="thumbs-up"/></div>
            <div class="talk-footer-number">{{ replie.thumbs }}</div>
          </div>
          <div class="talk-footer-btn" @click="toggleReplie()">回复</div>
        </div>
        <template v-if="isReplie">
          <div class="talk-replie-bar">
            <div class="talk-replie-field">
              <div class="talk-replie-avatar" style="background-color: #00BCD4;"></div>
              <input class="talk-replie-input" type="text" placeholder="添加公开回复..." value="">
            </div>
            <div class="talk-replie-btn">
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
  .talk-replies-item {
    display: flex;
  }
  .talk-replies-left {

  }
  .talk-replies-right {
    margin: 2px;
    width: 100%;
  }
  .talk-replies-header {
    display: flex;
    align-items: baseline;
  }
  .talk-replies-name {
    font-size: 0.9em;
    margin-right: 15px;
    font-weight: bold;
  }
  .talk-replies-name-reply {
    font-size: 0.85em;
    margin-right: 15px;
  }
  .talk-replies-time {
    font-size: 0.7em;
  }
  .talk-replies-content {
    font-size: 0.9em;
    width: 93%;
    max-width: 535px;
    margin: 2px 0 8px 0;
    word-break: break-all;
  }
  .talk-replies-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
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
</style>
