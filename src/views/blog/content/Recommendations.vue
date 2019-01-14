<template>
  <v-layout v-if="recommendations.length" column mt-5 pt-3 pb-4 style="background-color: #EEEEEE;">
    <v-flex style="margin: 0 10%;" font-weight-bold>推荐阅读</v-flex>
    <v-divider style="margin-left: 9%;margin-right: 9%;" class="mt-2 mb-4"></v-divider>
    <v-flex style="overflow: hidden;height: 279px;position: relative;padding: 0 2px;">
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
          <recommendation-card v-for="ele in recommendations" :key="ele._id" :recommendation="ele"></recommendation-card>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import RecommendationCard from '@/views/blog/content/RecommendationCard.vue'
export default {
  props: {
    blog_id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    recommendations: [],
    left_btn: false,
    right_btn: true,
    fetching: false,
    // scroll在滚动时的偏差值计算，这里是正常屏幕下的，浏览器不同宽度偏差值都不同。
    scrollDeviation: 28, 
    more: false
  }),
  mounted () {
    this.fetchData()
  },
  computed: {
    recommendScroll () {
      return document.getElementById('recommendation-scroll')
    },
    lastDate () {
      if (this.recommendations && this.recommendations.length > 0) {
        return this.recommendations[this.recommendations.length - 1].publish.publish_time
      } else {
        return null
      }
    }
  },
  methods: {
    fetchData () {
      if (this.fetching) return
      // 防止重复调用fetchData方法 采用Throttle策略，fetchData时不能再次相应请求
      this.fetching = true
      this.api.getRecommendations((res)=> {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.fetching = false
        for (let e in res.data.recommendations)
          this.recommendations.push(res.data.recommendations[e])
        this.more = res.data.more
        if (!this.more) 
          this.right_btn = false
      }, {
        publish_time: this.lastDate,
        _id: this.blog_id
      })
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
      this.smoothScroll(-(this.recommendScroll.clientWidth - 2.5 * this.scrollDeviation))
    },
    right_btn_click () {
      this.smoothScroll(this.recommendScroll.clientWidth - this.scrollDeviation)
    },
    smoothScroll (scrollLength) {
      if (scrollLength == 0) return
      let targetLength = Math.min(this.recommendScroll.scrollLeft + scrollLength, this.recommendScroll.scrollWidth)
      let step = 50
      let stepLength = Math.floor(scrollLength / step)
      let remainder = scrollLength % step
      let backward = setInterval(() => {
        if (step <= 0) {
          this.recommendScroll.scrollLeft += remainder
          clearInterval(backward)
        }
        --step
        this.recommendScroll.scrollLeft += stepLength
      }, 10)
    }
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