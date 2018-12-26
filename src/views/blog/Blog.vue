<template>
  <div class="blog">
    <!-- placeholder -->
    <!-- blog- -->
    <placeholder/>
    <div class="search" v-if="search"></div>
    <div class="blog-items">
      <!-- 目前还是使用progress吧，等后面使用骨架屏技术后在弄这些fake
      <template v-if="loading">
          <BlogItemLoad></BlogItemLoad>
          <BlogItemLoad></BlogItemLoad>
          <BlogItemLoad></BlogItemLoad> 
      </template>-->
      
      <BlogDisplayLayer v-if="!loading" :blogs="blogs"></BlogDisplayLayer>
      <v-flex style="text-align: center;" ma-3>
        <v-btn @click="loadmore" v-show="more && !loading" :ripple="false" flat small color="grey darken-2">
          查看更多博客
        </v-btn>
        <h5 v-show="!more && !loading">暂无更多动态</h5>
        <v-progress-circular v-if="loading"
          indeterminate
          :size="24"
          color="info"
          class="ma-2"
        ></v-progress-circular>
      </v-flex>
    </div>
  </div>
</template>

<script>
import BlogDisplayLayer from '@/views/blog/children/BlogDisplayLayer'

export default {
  name: 'blog',
  data: function () {
    return {
      blogs: [],
      loading: true,
      more: true,
      search: true
    }
  },
  components: {
    BlogDisplayLayer
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': {
      handler: 'fetchData',
      immediate: true // 立马执行一次,相当于created中调用一次.
    }
  },
  methods: {
    loadmore () {
      this.more = false
    },
    fetchData () {
      this.loading = true
      this.api.getPublishs((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.loading = false
        this.blogs = res.data
        this.$progress.finish()
      })
    }
  }
}
</script>

<style scoped>
.blog{
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%; */
}
</style>
