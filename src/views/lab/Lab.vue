<template>
  <v-layout class="lab" align-center justify-center column>
    <div class="bars">
      <v-btn @click="currentTab = 'GroundGlass'">毛玻璃效果</v-btn>
      <v-btn @click="currentTab = 'EmojiPicker'">eomji picker</v-btn>
      <v-btn @click="currentTab = 'EmojiWordPicker'">颜文字</v-btn>
      <v-btn @click="currentTab = 'ListMenu'">v-list测试</v-btn>
      <v-btn @click="currentTab = 'FlexLayout'">Flex布局</v-btn>
      <v-btn @click="currentTab = 'CardHover'">CardHover</v-btn>
      <v-btn @click="currentTab = 'VueArray'">Vue数组</v-btn>
      <v-btn @click="currentTab = 'GetCursor'">获得文本域光标</v-btn>
      <v-btn @click="currentTab = 'LightBox'">灯箱</v-btn>
      <v-btn @click="currentTab = 'MyLightBox'">我的灯箱</v-btn>
      <v-btn @click="currentTab = 'VueBadges'">Badges</v-btn>
      <v-btn @click="currentTab = 'FeedCardTest'">FeedCard</v-btn>
      <v-btn @click="currentTab = 'RenderTest'">Render函数</v-btn>
      <v-btn @click="currentTab = 'comments'">BLOG评论</v-btn>
    </div>
    <compontent :is="currentTab" :img="'http://localhost:3000/public/images/433fb74ff8299e1d11ac07e3ffbcb237.jpeg'"></compontent>
  </v-layout>
</template>

<script>

import GroundGlass from '@/views/lab/children/GroundGlass.vue'
import EmojiPicker from '@/components/common/EmojiPicker.vue'
import EmojiWordPicker from '@/components/common/EmojiWordPicker.vue'
import ListMenu from '@/views/lab/children/VList_VMenu.vue'
import FlexLayout from '@/views/lab/children/FlexLayout.vue'
import CardHover from '@/views/lab/children/CardHover.vue'
import VueArray from '@/views/lab/children/VueArray.vue'
import GetCursor from '@/views/lab/children/GetCursor.vue'
import LightBox from '@/views/lab/children/LightBox.vue'
import MyLightBox from '@/views/lab/children/MyLightBox.vue'
import VueBadges from '@/views/lab/children/VueBadges.vue'
import FeedCardTest from '@/views/lab/children/FeedCardTest.vue'
import RenderTest from '@/views/lab/children/RenderTest.vue'
import comments from '@/views/lab/children/Comments.vue'

export default {
  data () {
    return {
      currentTab: null
    }
  },
  created () {
    this.$progress.finish()
  },
  components: { GroundGlass, EmojiPicker, EmojiWordPicker, ListMenu, FlexLayout, CardHover, VueArray, GetCursor, LightBox, MyLightBox, VueBadges, FeedCardTest, RenderTest, comments }
}
</script>

<style scoped>
  .lab {
    margin-top: 60px;
    margin: 60px 20px;
    width: 100%;
    height: 100%;
  }
  .bars {
    margin-bottom: 20px;
  }
</style>
