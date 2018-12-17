<template>
  <v-layout class="lab" align-center justify-center column>
    <div class="bars">
      <v-btn @click="currentTab = 'GroundGlass'" color="info">毛玻璃效果</v-btn>
    </div>
    <compontent :is="currentTab"></compontent>
  </v-layout>
</template>

<script>

import GroundGlass from '@/views/lab/children/GroundGlass.vue'

export default {
  data () {
    return {
      currentTab: null
    }
  },
  created () {
    this.$progress.finish()
  },
  components: { GroundGlass }
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
