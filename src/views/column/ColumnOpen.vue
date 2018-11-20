<template>
  <div class="column-open">
    <placeholder></placeholder>
    <div class="columns-form-wapper">
      <div class="columns-img-pick">
        <div class="columns-img-wapper">
          <!-- 黄金比例,或白金比例 -->
          <img src="" alt="" class="columns-img">
          <div class="columns-img-btn">图片选择</div>
        </div>
      </div>
      <v-card class="edit-picture"
        @mouseover="editIconShow = true" 
        @mouseout="editIconShow = false" raised>
          <v-img v-if="column_img" class="edit-picture-wapper" :src="column_img">
          </v-img>
          <transition name="fade">
            <div v-if="editIconShow" @click="openImgInput" class="edit-picture-overlay">
              <v-icon color="blue-grey lighten-2" class="edit-img-icon" large>mdi-camera-image</v-icon>
              <div class="edit-picture-backdrop"></div>
            </div>
          </transition>
          <form id="imgForm" method="post" enctype="multipart/form-data" action="图片上传">
            <input style="display: none;" @change="imgUpload" type="file" id="imageInput" accept="image/*">
          </form>
      </v-card>
      <!-- 表单是 Material Design风格-->
      <form class="columns-form" action="">
        <div class="form-columns">
          <span class="form-label">专栏名</span>
          <input type="text" class="columns-name-input">
        </div>
        <div class="form-columns">
          <span class="form-label">专栏类别</span>
          <div class="columns-type-slip">哈利波特 +</div>
        </div>
        <div class="form-columns">
          <span class="form-label">专栏介绍</span>
          <textarea class="columns-summary-input" name="" id=""></textarea>
        </div>
        <div class="form-columns">
          <span class="form-label">专栏域名</span>
          <div class="columns-domain-input">
            <span>zhuanlan.centerful.org/</span>
            <input type="text" class="">
          </div>
        </div>
        <div class="form-columns-bar">
          <!-- 阻止默认事件 -> 阻止form进行onsubmit事件,却无参数可以提交-然后在#号前边存在问号的问题. -->
          <button class="columns-bar-back" @click.prevent="back()">返回</button>
          <button class="columns-bar-submit" @click.prevent="open()">申请开通</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editIconShow: false,
      column_img: null
    }
  },
  created () {
    this.$progress.finish()
  },
  methods: {
    // 开通专栏
    open () {

    },
    openImgInput (data) {
      document.getElementById('imageInput').click()
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
          this.$bus.emit('prompt', res.message)
          return
        }
        //  替换图片URL
        this.blog.blog_img = res.data.path
        // 保存博客
        this.saveBlog()
      }, files)
    },
    // 返回路由的上一级
    back () {
      this.$router.go(-1)
      // this.$router.push({ name: 'Columns' })
    }
  }
}
</script>

<style>
  .column-open {
    padding: 20px;
    width: 100%;
  }
  .columns-form-wapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .columns-img-pick {
    max-width: 500px;
    max-height: 309px;
    margin-bottom: 30px;
  }
  .columns-img-wapper {
    width: 500px;
    height: 309px;
    background-color: #E0E0E0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 2px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  }
  .columns-img {

  }
  .columns-img-btn {
    position: absolute;
    bottom: 10px;
    color: #a2a2a2;
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
  .columns-form {
  }
  .form-columns {
    display: flex;
    align-items: baseline;
    margin: 40px 5px;
  }
  .form-label {
    font-weight: bold;
    color: #222;
    width: 100px;
    text-align: right;
    margin-right: 50px;
  }
  .form-columns-type {

  }
  .columns-type-slip {

  }
  .columns-summary-input {
    width: 340px;
  }
  .columns-domain-input {

  }
  .columns-domain-input span {
    font-size: 0.95em;
    color: #171717;
    vertical-align: middle;
  }
  .form-columns-bar {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    margin: 80px 5px 40px 0;
  }
  .columns-bar-submit {

  }
  .columns-bar-back {
    margin-right: 20px;
  }
</style>
