<!-- emoji选择器 -->
<template>
  <v-card color="blue-grey" class="white--text emoji-panel">
    <v-card-title>
      <h3>Emoji</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="scroll-y emoji" @click="picked">
      <span>😀</span>
      <span>😇</span>
      <span>😈</span>
      <span>😎</span>
      <span>😐</span>
      <span>😑</span>
      <span>😕</span>
      <span>😗</span>
      <span>😙</span>
      <span>😛</span>
      <span>😟</span>
      <span>😦</span>
      <span>😧</span>
      <span>😬</span>
      <span>😮</span>
      <span>😯</span>
      <span>😴</span>
      <span>😶</span>
      <span>😁</span>
      <span>😂</span>
      <span>😃</span>
      <span>😄</span>
      <span>😅</span>
      <span>😆</span>
      <span>😉</span>
      <span>😊</span>
      <span>😋</span>
      <span>😌</span>
      <span>😍</span>
      <span>😏</span>
      <span>😒</span>
      <span>😓</span>
      <span>😔</span>
      <span>💔</span>
      <span>❤️</span>
      <span>💘</span>
      <span>👍</span>
      <span>👎</span>
      <span>👌</span>
      <span>👊</span>
      <span>✊</span>
      <span>✌️</span>
      <span>👋</span>
      <span>✋</span>
      <span>👐</span>
      <span>☝️</span>
      <span>👇</span>
      <span>👈</span>
      <span>👉</span>
      <span>🙌</span>
      <span>🙏</span>
      <span>👆</span>
      <span>👏</span>
      <span>💪</span>
      <span>🤘</span>
      <span>🖕</span>
      <span>😖</span>
      <span>😘</span>
      <span>😚</span>
      <span>😜</span>
      <span>😝</span>
      <span>😞</span>
      <span>😠</span>
      <span>😡</span>
      <span>😢</span>
      <span>😣</span>
      <span>😤</span>
      <span>😥</span>
      <span>😨</span>
      <span>😩</span>
      <span>😪</span>
      <span>😫</span>
      <span>😭</span>
      <span>😰</span>
      <span>😱</span>
      <span>😲</span>
      <span>😳</span>
      <span>😵</span>
      <span>😷</span>
      <span>😸</span>
      <span>😹</span>
      <span>😺</span>
      <span>😻</span>
      <span>😼</span>
      <span>😽</span>
      <span>😾</span>
      <span>😿</span>
      <span>🙀</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    pick: Function
  },
  methods: {
    picked (val) {
      if (!val) return
      if (val.path[0].nodeName != "SPAN") return
      if (this.pick) this.pick(val.target.innerText)
    }
  }
}
</script>

<style scoped>
  .emoji-panel {
    width: 300px;
  }
  .emoji {
    max-height: 200px;
    font-size: 24px;
    user-select: none;
  }
  .emoji > span {
    cursor: pointer;
  }
  .emoji::-webkit-scrollbar-track-piece {
    background-color:inherit;
  }
  .emoji::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
  }
  .emoji::-webkit-scrollbar {
    width: 5px;
  }
</style>