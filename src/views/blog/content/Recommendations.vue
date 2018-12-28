<template>
  <v-layout column mt-5 pt-3 pb-4 style="background-color: #EEEEEE;">
    <v-flex style="margin: 0 10%;" font-weight-bold>推荐阅读</v-flex>
    <v-divider style="margin-left: 9%;margin-right: 9%;" class="mt-2 mb-4"></v-divider>
    <v-flex style="overflow: hidden;height: 255px;position: relative;padding: 0 2px;">
      <v-flex class="fab left" v-show="left_btn">
        <v-btn @click="left_btn_click" fab small class="mb-3">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex class="fab right" v-show="right_btn">
        <v-btn @click="right_btn_click" fab small class="mb-3">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-flex>
      <v-layout id="recommendation-scroll" row nowrap style="overflow-x: auto;padding-bottom:20px;padding-top: 5px;">
        <div v-scroll:#recommendation-scroll="onScroll" style="display: inline-flex;padding: 0 10px">
        <!-- 左侧占位 -->
        <!-- <v-flex v-scroll:#recommendation-scroll="onScroll">
          <div style="width: 10px;height: 1px;"></div>
        </v-flex> -->
        <recommendation-card v-for="ele in recommendations" :key="ele" :recommendation="ele"></recommendation-card>
        <!-- 右侧占位 -->
        <!-- <v-flex>
          <div style="width: 10px;height: 1px;"></div>
        </v-flex> -->
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import RecommendationCard from '@/views/blog/content/RecommendationCard.vue'
export default {
  data: () => ({
    recommendations: [1,2,3,4,5,6,7,8,9,10,11],
    left_btn: false,
    right_btn: true,
    fetching: false,
    // scroll在滚动时的偏差值计算，这里是正常屏幕下的，浏览器不同宽度偏差值都不同。
    scrollDeviation: 12, 
    more: false
  }),
  mounted () {
    this.fetchData()
  },
  computed: {
    recommendScroll () {
      return document.getElementById('recommendation-scroll')
    }
  },
  methods: {
    fetchData () {
      if (this.fetching) return
      // 防止重复调用fetchData方法 采用Throttle策略，fetchData时不能再次相应请求
      this.fetching = true
      // 获取数据 this.api.getBlogRecommendations
      // 成功后根据响应会写
      this.fetching = false
      this.more = true
      // 如果fetch后返回null或是空数组，则
      // if () {
      //   this.more = false
      //   this.right_btn = false
      // }
    },
    onScroll (e) {
      // 滚动到最左侧 left_btn隐藏,否则显示left_btn
      if (e.target.scrollLeft <= 0) {
        this.left_btn = false
        return
      } else {
        this.left_btn = true  
      }

      // 没有滚动到最右侧，则显示right_btn
      if (e.target.scrollLeft + e.target.clientWidth < e.target.scrollWidth) {
        this.right_btn = true
        return
      }
      
      // 滚动到最右侧后,如果还有数据没有加载则fetchData,否则隐藏right_btn
      if (this.more) {
        this.fetchData()
      } else {
        this.right_btn = false
      }
    },
    // 滚动条向左滚动
    left_btn_click () {
      this._leftSmoothScroll(this.recommendScroll.clientWidth + this.scrollDeviation)
    },
    right_btn_click () {
      this._rightSmoothScroll(this.recommendScroll.clientWidth - this.scrollDeviation)
    },
    _leftSmoothScroll (scrollLength) {
      if (scrollLength == 0) return
      let targetLength = Math.max(this.recommendScroll.scrollLeft - scrollLength, 0)
      let stepLength = Math.ceil(scrollLength / 20)
      let frontward = null
      frontward = setInterval(() => {
        if (this.recommendScroll.scrollLeft <= targetLength) clearInterval(frontward)
          this.recommendScroll.scrollLeft -= stepLength
      }, 10)
    },
    _rightSmoothScroll (scrollLength) {
      if (scrollLength == 0) return
      let targetLength = Math.min(this.recommendScroll.scrollLeft + scrollLength, this.recommendScroll.scrollLeft.scrollWidth)
      let stepLength = Math.ceil(scrollLength / 20)
      let backward = null
      backward = setInterval(() => {
        if (this.recommendScroll.scrollLeft >= targetLength) clearInterval(backward)
          this.recommendScroll.scrollLeft += stepLength
      }, 10)
    },
  },
  components: { RecommendationCard }
}
</script>

<style>
  .fab {
    position: absolute;
    height: 100%;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    background: linear-gradient(to right,#EEEEEE,rgba(255,255,255,0));
  }
  .fab.left {
    left: 0;
    padding-right: 10px;
  }
  .fab.right {
    right: 0;
    padding-left: 10px;
    background: linear-gradient(to left,#EEEEEE,rgba(255,255,255,0));
  }
</style>