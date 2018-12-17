<template>
  <div class="column-content">
    <placeholder></placeholder>
    <div v-if="loading" class="columns-load">
      <div style="width: 100%;"></div>
    </div>

    <div v-else class="columns-cover">
    <v-img class="columns-cover-img" :src="column.column_img"></v-img>
      <div class="columns-cover-bar">
        <div class="cover-bar-inner">
          <div class="cover-bar-left">
            <div class="bar-left-title">{{ column.column_name }}</div>
            <div class="bar-left-summary">{{ column.introduction }}</div>
            <div class="bar-left-footer">
              <div>
                <span v-for="tag in column.tags" :key="tag" class="columns-item-tag">{{ tag }}</span>
              </div>
              <span class="columns-item-article">{{ column.blog_count }} 篇文章</span>
            </div>
          </div>
          <div class="cover-bar-right">
            <div class="right-auth-avatar">
              <img class="auth-avatar-img" :src="column.creater.user_avatar" alt="">
            </div>
            <div class="right-auth-info">
              <div class="right-auth-name">{{ column.creater ? column.creater.nick_name : null }}</div>
              <span class="right-auth-autograph">{{ column.creater ? column.creater.signature : null }}</span>
            </div>
          </div>
        </div>
        <div class="columns-cover-mask"></div>
      </div>
    </div>
    <div class="columns-split-line">
      <span class="columns-split-word">专栏 · 文章</span>
    </div>
    <div class="columns-placeholder"></div>
    <template v-if="BlogLoading">
      <BlogItemLoad></BlogItemLoad>
    </template>
    <div v-else class="blog-items">
      <div v-if="blogs.length != 0">
        <BlogItem v-for="blog in blogs" :key="blog.blogID" v-bind="blog"></BlogItem>
      </div>
      <div v-else>
        <h5>暂无信息！</h5>
      </div>
    </div>
  </div>
</template>

<script>
import BlogItem from '@/views/blog/children/BlogItem.vue'
import BlogItemLoad from '@/views/blog/children/BlogItemLoad.vue'

export default {
  data () {
    return {
      column: {},
      blogs: [],
      loading: true,
      BlogLoading: true
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
      // 查询专栏详细信息
      this.loading = true
      this.api.getColumn((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.column = res.data
        this.$progress.finish()
        this.loading = false
      }, this.$route.params._id)

      // 查询专栏下博客信息
      this.BlogLoading = true
      this.api.getPublishs((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.BlogLoading = false
        this.blogs = res.data
        this.$progress.finish()
      }, { column_id: this.$route.params._id })
    }
  }
}
</script>

<style>
  .columns-load {
    height: 500px;
    margin: 0 30px 40px 30px;
    background-color: #ccc;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 2px;
  }
  .column-content {
    padding: 20px;
    width: 100%;
  }
  .columns-cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 30px 40px;

    position: relative;
  }
  .columns-cover-img {
    display: block;
    width: 800px;
    height: auto;
    max-height: 500px;
    max-width: 100%;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  }
  .columns-cover-bar {
    position: absolute;
    bottom: 0;
    display: flex;
    color: #fff;
    width: 100%;
  }
  .columns-cover-mask{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #989898;
    opacity: 0.83;
    background: linear-gradient(#a2a2a2,#1f1f1f);
    filter: blur(1px);
  }
  .cover-bar-inner {
    z-index: 10;
    display: flex;
    padding: 20px;
    color: #fff;
  }
  .cover-bar-left {
    width: 50%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #AAA;
  }
  .bar-left-title {
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;
  }
  .bar-left-summary {
    font-size: 0.8em;
    margin: 5px 0;
  }
  .bar-left-footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.9em
  }
  .cover-bar-right {
    padding-left: 40px;
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .right-auth-avatar {

  }
  .auth-avatar-wapper {

  }
  .auth-avatar-img {
    display: block;
    margin: 10px;
    border-radius: 50%;
    width: 42px;
    border: 1px solid #9a9a9a;
  }
  .right-auth-info {
    display: flex;
    flex-direction: column;
  }
  .right-auth-name {
    font-size: 1.35em;
    font-weight: bold;
    cursor: pointer;
  }
  .right-auth-autograph {
    font-size: 0.8em;
  }
  .columns-placeholder {
    width: 100%;
    height: 10px;
  }
  .columns-split-line {
    border-bottom: 1px solid #aaa;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
  .columns-split-word {
    font-weight: bold;
  }
  .columns-item-tag {
    margin-right: 10px;
    cursor: pointer;
  }
</style>
