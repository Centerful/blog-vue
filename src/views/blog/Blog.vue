<template>
  <div class="blog">
    <!-- placeholder -->
    <!-- blog- -->
    <placeholder/>
    <div class="search" v-if="search"></div>
    <div class="blog-items">
      <template v-if="loading">
        <BlogItemLoad></BlogItemLoad>
        <BlogItemLoad></BlogItemLoad>
        <BlogItemLoad></BlogItemLoad>
      </template>
      <BlogItem v-for="blog in blogs" :key="blog._id" v-bind="blog"></BlogItem>
      <div class="loading" v-if="!loading"><icon name="spinner" pulse/></div>
    </div>
  </div>
</template>

<script>
import BlogItem from '@/views/blog/children/BlogItem.vue'
import BlogItemLoad from '@/views/blog/children/BlogItemLoad.vue'

export default {
  name: 'blog',
  data: function () {
    return {
      blogs: [],
      loading: true,
      search: true
    }
  },
  components: {
    BlogItem, BlogItemLoad
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': {
      handler: 'fetchData',
      immediate: true // 立马执行一次,相当于created中调用一次.
    }
  },
  methods: {
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
  -webkit-font-smoothing: antialiased;
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
  width: 100%;
}
.blog-items {
  /*height: auto;
  min-height: 500px;
  transition: height 3.5s ease-out;*/
  width: 100%;
}
</style>
