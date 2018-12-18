<template>
  <v-layout class="lab" align-center justify-center column>
    <div class="bars">
      <v-btn @click="currentTab = 'GroundGlass'" color="info">毛玻璃效果</v-btn>
      <v-btn @click="currentTab = 'EmojiPicker'" color="info">eomji picker</v-btn>
      <v-btn @click="currentTab = 'EmojiWordPicker'" color="info">颜文字</v-btn>
      <v-btn @click="currentTab = 'ListMenu'" color="info">v-list测试</v-btn>
      <v-btn @click="currentTab = 'FlexLayout'" color="info">Flex布局</v-btn>
      <v-btn @click="currentTab = 'CardHover'" color="info">CardHover</v-btn>
    </div>
    <compontent :is="currentTab"></compontent>
  </v-layout>
</template>

<script>

import GroundGlass from '@/views/lab/children/GroundGlass.vue'
import EmojiPicker from '@/components/common/EmojiPicker.vue'
import EmojiWordPicker from '@/components/common/EmojiWordPicker.vue'
import ListMenu from '@/views/lab/children/VList_VMenu.vue'
import FlexLayout from '@/views/lab/children/FlexLayout.vue'
import CardHover from '@/views/lab/children/CardHover.vue'

export default {
  data () {
    return {
      currentTab: null
    }
  },
  created () {
    this.$progress.finish()
  },
  components: { GroundGlass, EmojiPicker, EmojiWordPicker, ListMenu, FlexLayout, CardHover }
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
