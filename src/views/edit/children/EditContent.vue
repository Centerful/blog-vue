<template>
  <div class="edit-container">
    <div class="edit-wapper">
      <v-card class="edit-picture"
        @mouseover="editIconShow = true" 
        @mouseout="editIconShow = false" raised>
          <v-img v-if="blog.blog_img" class="edit-picture-wapper" :src="blog.blog_img">
          </v-img>
          <transition name="fade">
            <div v-if="editIconShow" @click="openImgInput" class="edit-picture-overlay">
              <v-icon color="blue-grey lighten-2" class="edit-img-icon" large>mdi-camera-image</v-icon>
              <div class="edit-picture-backdrop"></div>
            </div>
          </transition>
          <form id="imgForm" method="post" enctype="multipart/form-data" action="图片上传">
            <input style="display: none;" @change="blogImgUpload('imageInput')" type="file" id="imageInput" accept="image/*">
          </form>
      </v-card>
      <input class="edit-title" type="text" placeholder="请输入标题(最多30个字)" v-model="blogTitle">
      <div class="edit-title-split"></div>
      <div class="edit-content">
        <Editormd @writed="writed" :ref="editorId" :key="editorId" :id="editorId"></Editormd>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Editormd from '@/views/edit/children/Editormd.vue'
export default {
  name: 'editContent',
  components: { Editormd },
  data () {
    return {
      editIconShow: false,
      editorId: 'editorId',
      // MD编辑器发生变更后,触发$emit传递.
      write: false
    }
  },
  computed: {
    ...mapState('edit', ['blog']),
    // 表单中使用vuex的state不是很优美，需要写set方法调用commit进行state更新
    blogTitle: {
      get () {
        return this.blog.title
      },
      set (val) {
        this.write = true
        this.updateTitle(val)
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.loop()
    }, 3000)
  },
  // 由于blog数据存放在vuex上，销毁时vuex中的数据不会消失，所以需要主动清理。
  destroyed () {
    this.cleanRemainBlogInfo()
  },
  methods: {
    ...mapMutations('edit', ['updateTitle', 'updateContent', 'cleanRemainBlogInfo']),
    ...mapActions('edit', ['blogImgUpload', 'saveBlog']),
    // 点击题图后开打input-文件选择框
    openImgInput (data) {
      document.getElementById('imageInput').click()
    },
    // 写入
    writed (content) {
      this.updateContent(content)
      this.write = true
    },
    /**
     * 自动保存博客信息.
     * 当发生input事件后将write改为true,autoSave每3秒检测一次,true-保存.
     * TODO 弄个小组件,每次保存都会提示.
     */
    loop () {
      if (this.write) {
        this._saveBlog()
      }
    },
    async _saveBlog () {
      let res = await this.saveBlog()
      if (res) {
        this.write = false
      }
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
