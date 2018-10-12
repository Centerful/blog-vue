<template>
  <div class="blog-content">
    <placeholder :marginTop="60"/>
    <template v-if="loading">
      <div style="display: flex;justify-content: center;align-items: center;padding: 20px;">
        <div style="width: 600px;height: 450px;background-color: #ccc;"></div>
      </div>
    </template>
    <template v-else>
      <div class="blog-wapper">
        <!-- 标题图片,可以是video,audio,gif,img等 -->
        <div class="blog-title-meta">
          <img class="blog-meta-img" :src="blog.blogImg">
        </div>
        <!-- 作者卡 -->
        <div class="blog-auth-card">
          <!-- 作者属性:头像,名称,性别(图标),,个性签名,(被多少人关注,关注按钮--不加入社交所以没有), -->
          <!-- 文章数,获得多少赞,写了多少字-放在hover时的提示框中 -->
          <div class="auth-meta">
            <div class="auth-left-avatar">
              <a class="avatar-wapper">
                <img class="avatar-wapper-img" :src="blog.authImg">
              </a>
            </div>
            <div class="auth-right-info">
              <div class="auth-name"><h4>{{ blog.authName }}</h4></div>
              <span class="auth-autograph">{{ blog.authAutograph }}</span>
            </div>
          </div>
          <!-- 文章相关属性:文章最后编辑时间(hover上去后提示发布时间),字数,阅读数,评论,点赞数. -->
          <div class="blog-meta">
            <!-- 这里应当有hover的提示框 -->
            <span class="blog-meta-time">文章编辑于: {{ blog.blogDate }}</span>
            <span>字数: {{ blog.blogWords }}</span>
            <span>浏览: {{ blog.blogBrowse }}</span>
          </div>
        </div>
        <article class="blog-container">
          <div class="blog-title"><h2>{{ blog.blogTitle }}</h2></div>
          <div class="blog-title-split"></div>
          <div class="blog-html" v-html="blog.blogHtml"></div>
        </article>
        <!-- <div class="blog-reward">
          自定义输入内容
          <span class="reward-words">「作者苦逼学生一只，希望大家能够支持我，买书、旅行，奉献更多的作品，谢谢啦！」</span>
          点击后弹出二维码
          <button class="reward-btn">赞赏</button>
          点击后弹出赞赏明细单
          <span class="reward-counts">48 人已赞赏</span>
        </div> -->
        <!-- 水印样式 -->
        <div class="blog-tags">
          <a v-for="tag in blog.blogTags" :key="tag.code" class="blog-tag">{{ tag.name }}</a>
        </div>
        <!--  -->
        <div class="blog-column">
          <div class="column-title">文章收录于以下专栏</div>
          <div class="column-items">
            <div v-for="column in blog.blogColumns" :key="column.id">
              <BlogColumnItem :blogColumn="column"></BlogColumnItem>
            </div>
          </div>
        </div>
      </div>
      <Recommendations></Recommendations>
    </template>
  </div>
</template>

<script>
import BlogColumnItem from '@/views/blog/children/BlogColumnItem.vue'
import Recommendations from '@/views/blog/children/Recommendations.vue'

export default {
  data () {
    return {
      blog: {},
      loading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.api.getBlogDetails(this.$route.params.id, (resp) => {
        this.blog = resp
        this.loading = false
        this.$progress.finish()
      })
    }
  },
  components: { BlogColumnItem, Recommendations }
}
</script>

<style scoped>
  .blog-content {
    width: 100%;
  }
  .blog-placeholder {
    width: 100%;
    height: 60px;
  }
  .blog-wapper {
    display: flex;
    flex-direction: column;

    width: auto;
    height: auto;
    padding: 0 10%;
  }
  .blog-title-meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    /*box-shadow: 0 1px 1px 1px rgba(0,0,0,0.2);*/
    /*box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);*/
  }
  .blog-meta-img {
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 2px;
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
  }
  .blog-auth-card {
    max-width: 100%;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.1), 0 2px 2px 0 rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.05);
    margin-bottom: 10px;
    padding: 10px;

    display: flex;
    flex-direction: column;
  }
  .auth-meta {
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
  }
  .auth-left-avatar {
  }
  .avatar-wapper-img {
    display: block;
    border-radius: 50%;
    width: 42px;
  }

  .auth-right-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .auth-name > h4 {
    color: #1a1a1a;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .auth-autograph {
    max-width: 88%;
    font-size: 0.8em;
    color: #8d8d8d;
  }
  .blog-meta {
    margin: 8px;
    color: #8e8e8e;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    font-size: 0.8em;
  }
  .blog-meta > span {
    margin: 0 3px;
  }
  .blog-meta-time {
    cursor: default;
  }
  .blog-container {
    padding: 10px;
  }
  .blog-title {
    margin-top: 30px;
  }
  .blog-title > h2 {
    margin: 0;
    color: #383838;
  }
  .blog-title-split {
    margin: 3px 15px 3px 3px;
    border-bottom: 2px solid #8282828a;
    margin-top: 9px;
  }
  .blog-html {
    font-size: 0.965em;
    line-height: 1.5em;
    width: 100%;
    color: #2d2d2d;
  }
  .blog-reward {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .reward-words {
    color: #5d5d5d;
    font-size: 0.88em;
    max-width: 88%;
    margin: 30px 0 10px 0;
  }
  .reward-btn {
    margin: 10px 0;

    cursor: pointer;
  }
  .reward-counts {
    color: #5d5d5d;
    font-size: 0.88em;

    cursor: pointer;
  }
  .blog-tags {
    display: flex;
    align-items: center;
    justify-content: left;
    margin: 20px 0 30px 0;
  }
  .blog-tag {
    color: #4e4e4e;
    font-size: 0.9em;

    margin: 0 10px;
    cursor: pointer;
  }
  .blog-column {

  }
  .column-title {
    font-size: 1.1em;
    font-weight: 550;
    padding-bottom: 10px;
    border-bottom: 1px solid #dadada;
    margin-bottom: 10px;
  }
  .column-items {
    margin-bottom: 30px;
  }
</style>
