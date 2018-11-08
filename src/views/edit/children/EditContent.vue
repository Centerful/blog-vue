<template>
  <div class="edit-container">
    <div class="edit-wapper">
      <!-- <div v-if="blog.blog_img">
        <img class="edit-img" :src="blog.blog_img">
      </div> -->
      <!-- <div v-else class="edit-picture">添加题图</div> -->
      <v-card class="edit-picture"
        @mouseover="editIconShow = true" 
        @mouseout="editIconShow = false" raised>
          <v-img v-if="blog.blog_img" class="edit-picture-wapper" :src="blog.blog_img">
          </v-img>
          <transition name="fade">
            <div v-if="editIconShow" @click="openImgInput" class="edit-picture-overlay">
              <v-icon class="edit-img-icon" large>mdi-camera-image</v-icon>
              <div class="edit-picture-backdrop"></div>
            </div>
          </transition>
          <form id="imgForm" method="post" enctype="multipart/form-data" action="图片上传">
            <input style="display: none;" @change="imgUpload" type="file" id="imageInput" accept="image/*">
          </form>
      </v-card>
      <input class="edit-title" type="text" placeholder="请输入标题(最多30个字)" v-model="blog.title" @input="titleInput">
      <div class="edit-title-split"></div>
      <div class="edit-content">
        <Editormd @writed="writed"></Editormd>
      </div>
      <div></div>
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
      editIconShow: false,
      blog: {
        title: null,
        blog_img: null,
        content: null
      },
      dir: {
        file_id: null,
        books_id: null
      },
      titleFlag: true,
      // MD编辑器发生变更后,触发$emit传递.
      write: false
    }
  },
  watch: {
  },
  created () {
    this.eventListener()
  },
  mounted () {
    setInterval(() => {
      this.loop()
    }, 3000)
  },
  methods: {
    // 添加事件,对外暴露事件
    eventListener () {
      this.$bus.on('getBlog', this.getBlog)
    },
    // 题图上传
    imgUpload (data) {
      let files = document.getElementById('imageInput').files
      if (!files || files.length < 1) {
        return
      }
      //测试。
      /*console.log(this.blog.blog_img)
      this.blog.blog_img = '/static/img/article-59521bcf81138.jpg'
      return */
      this.api.imgUpload((res) => {
        if (res.code != 0) {
          this.$bus.emit('dialog', res.message)
          return
        }
        //  替换图片URL,由于前段项目与node不再同一域中，这里这里要指定node的地址。
        this.blog.blog_img = 'http://localhost:3000/' + res.data.path
        // 保存博客
        this.saveBlog()
      }, files)
    },
    // 点击题图后开打input-文件选择框
    openImgInput (data) {
      document.getElementById('imageInput').click()
    },
    // 
    writed (content) {
      this.blog.content = content
      this.write = true
    },
    titleInput () {
      // 开打博客时不用保存。
      if (this.titleFlag) {
        this.titleFlag = !this.titleFlag
        return
      }
      this.write = true
      /*
       * 我们需要修改指定dir.vue实例中file.title的值.
       * 因此我们要将事件传递到EditSideBar.vue中,然后通过this.$ref('dir._id')找到对应的dir.vue实例.
       * 然后 
       * let file = this.$refs(dir.books_id).files.filter((file) => {
       *   if (file._id = dir.file_id)
       *     file.title = dir.title
       * })
       *
       * 如果使用vuex-将数据存储在一个对象中.则直接修改对象中BooksTree的数据即可.
       */
      this.$bus.emit('titleInput', {
        file_id: this.dir.file_id,
        books_id: this.dir.books_id,
        title: this.blog.title
      })
    },
    // 事件定义
    // 开打某个blog时触发
    getBlog (data) {
      console.log(`getBlog:${data}`)
      this.dir = data
      this.api.getBlog((res) => {
        // 添加题图与title
        this.blog.title = res.title
        this.blog.blog_img = res.blog_img
        this.blog.content = res.content
        // 添加博客内容
        this.$bus.emit('setBlogContent', res.content)
      }, this.dir.file_id)
    },
    /**
     * 自动保存博客信息.
     * 当发生input事件后将write改为true,autoSave每3秒检测一次,true-保存.
     * TODO 弄个小组件,每次保存都会提示.
     */
    loop () {
      if (this.write) {
        this.saveBlog()
      }
    },
    saveBlog () {
      this.blog._id = this.dir.file_id
      this.api.updateBlog((res) => {
        if (res.code != 0) {
          this.$bus.emit('dialog', res.message)
        } else {
        }
        this.write = false
      }, this.blog)
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
    max-width: 560px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 1px -1px rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    margin-bottom: 15px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .edit-picture {
    position: relative;
    max-width: 560px;
    width: 100%;
    height: 323px;
    background-color: #f7f8f9;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
    /*box-shadow: 0 1px 1px -1px rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);*/
    margin-bottom: 15px;
  }
  .edit-picture-wapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
  }
  .edit-picture-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit-picture-backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .6; 
    background-color: white;
  }
  .edit-img-icon {
    color: #000;
    z-index: 2;
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
