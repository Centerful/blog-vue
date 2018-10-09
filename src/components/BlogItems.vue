<template>
  <div class="blogItems">
    <div class="search" v-if="search"></div>
    <div class="blog-items">
      <!-- <div class="" v-if="loading">
        Loading...
      </div> -->
      <template v-if="loading">
        <BlogItemLoad></BlogItemLoad>
        <BlogItemLoad></BlogItemLoad>
        <BlogItemLoad></BlogItemLoad>
      </template>
      <BlogItem v-for="blog in blogs" :key="blog.blogID" v-bind="blog"></BlogItem>
      <div class="loading" v-if="!loading"><icon name="spinner" pulse/></div>
    </div>
  </div>
</template>

<script>
import BlogItem from '@/components/BlogItem.vue'
import BlogItemLoad from '@/components/BlogItemLoad.vue'

export default {
  name: 'blog',
  data: function () {
    return {
      blogs: [],
      loading: true,
      search: false
    }
  },
  components: {
    BlogItem, BlogItemLoad
  },
  created () {
    // 组件创建完成后获取博客列表数据
    // created 钩子函数被触发时 该组件的data对象已经被 observed 了.
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      console.log('fetchData')
      this.loading = true
      this.api.getBlogs((resp) => {
        this.loading = false
        this.blogs = resp
        this.$progress.finish()
      })
    }
  }
}
</script>

<style scoped>
.blog-items {
  /*height: auto;
  min-height: 500px;
  transition: height 3.5s ease-out;*/
  width: 100%;
}
</style>
