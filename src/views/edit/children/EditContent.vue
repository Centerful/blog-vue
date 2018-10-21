<template>
  <div class="edit-container">
    <div class="edit-wapper">
      <div v-if="blogImg">
        <img class="edit-img" :src="blogImg">
      </div>
      <div v-else class="edit-picture">添加题图</div>
      <input class="edit-title" type="text" placeholder="请输入标题(最多30个字)" v-model="blogTitle">
      <div class="edit-title-split"></div>
      <div class="edit-content">
        <Editormd></Editormd>
      </div>
    </div>
  </div>
</template>

<script>
import Editormd from '@/views/edit/children/Editormd.vue'
export default {
  name: 'editContent',
  components: { Editormd },
  data () {
    return {
      blogTitle: null,
      blogImg: null,
      blogId: null
    }
  },
  created () {
    this.eventListener()
  },
  methods: {
    // 添加事件,对外暴露事件
    eventListener () {
      this.$bus.on('addBlog', this.addBlog)
      this.$bus.on('getBlog', this.getBlog)
    },
    // 事件定义
    // 新建文章时触发.
    addBlog () {
      // 去后台拉取一个新的id,将blog题图,title,文章内容清空.
      console.log('addBlog')
      this.blogId = null
      this.api.getBlogId((blogId) => {
        this.blogId = blogId
      })
      this.blogImg = null
      this.blogTitle = null
      this.$bus.emit('clearBlogText')
    },
    // 开打某个blog时触发
    getBlog (id) {
      if (id === this.blogId) {
        return
      }
      this.blogId = id
      this.api.getBlog(this.blogId, (resp) => {
        // 添加题图与title
        this.blogTitle = resp.blogTitle
        this.blogImg = resp.blogImg
        // 添加博客内容
        this.$bus.emit('setBlogText', resp.blogText)
      })
    }
  }

}
</script>

<style scoped>
  .edit-container {
    background-color: #fff;
    padding: 0;
    margin-top: 40px;
    box-shadow: 3px 3px 10px -1px rgba(0,0,0,.2), -3px 3px 10px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .edit-wapper {
    width: 890px;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .edit-img {
    max-width: 660px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 1px -1px rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    margin-bottom: 15px;
  }
  .edit-picture {
    max-width: 660px;
    width: 100%;
    height: 192px;
    background-color: #f7f8f9;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    box-shadow: 0 1px 1px -1px rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    margin-bottom: 15px;
  }
  .edit-title {
    max-width: 660px;
    width: 100%;
    height: 50px;
    margin: 10px 0 0 0;
    padding-left: 5px;
    font-size: 24px;
    font-weight: bold;
    border: 0px;
    outline: none;
  }
  .edit-title-split {
    width: 653px;
    border-top: 1px solid #8282828a;
    margin-bottom: 10px;
  }
  .edit-content {
    max-width: 660px;
    width: 100%;
  }
</style>
