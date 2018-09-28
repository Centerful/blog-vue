<template>
  <div class="blog">
    <!-- placeholder -->
    <!-- blog- -->
    <placeholder/>
    <div class="blog-items">
      <BlogItem v-for="blog in blogs" :key="blog.blogID" v-bind="blog"></BlogItem>
      <div class="loading" v-if="loading">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import BlogItem from '@/components/BlogItem.vue'

export default {
  name: 'blog',
  data: function () {
    return {
      blogs: [
      ],
      loading: true
    }
  },
  components: {
    BlogItem
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
  height: auto;
  transition: height 3.5s ease-out;
}
</style>
