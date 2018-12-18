<template>
  <div class="column-open">
    <placeholder></placeholder>
    <div class="columns-form-wapper">
      <!-- <div class="columns-img-pick">
        <div class="columns-img-wapper">
          <img src="" alt="" class="columns-img">
          <div class="columns-img-btn">图片选择</div>
        </div>
      </div> -->
      <v-card class="edit-picture"
        @mouseover="editIconShow = true" 
        @mouseout="editIconShow = false" raised>
          <v-img v-if="formData.column_img" class="edit-picture-wapper" :src="formData.column_img">
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
      <div></div>
      <v-form class="columns-form" ref="columnsForm" v-model="valid">
        <v-text-field 
          class="text-field" 
          v-model="formData.columns_name"
          label="专栏名"
          :rules="columnsNameRules"
          required>
        </v-text-field>
        <v-textarea
          v-model="formData.introduction"
          :rules="introductionRules"
          auto-grow
          label="专栏介绍"
          rows="1"
        ></v-textarea>
        <v-text-field 
          class="text-field" 
          v-model="formData.columns_domain"
          label="专栏域名"
          :rules="columnsDomainRules"
          prefix="www.centerful.org/columns/"
          required>
        </v-text-field>
        <v-combobox
          v-model="tags"
          :items="totalTags"
          label="添加标签"
          chips
          hint="最多添加3个标签"
          persistent-hint
          clearable
          prepend-icon="mdi-tag"
          multiple>
          <template slot="selection" slot-scope="data">
            <v-chip :selected="data.selected" close @input="tags.splice(tags.indexOf(data.item), 1),tags = [...tags]">
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-combobox>
      </v-form>
      <v-layout justify-end row class="columns-form">
        <v-spacer></v-spacer>
        <v-btn @click="back" flat>返 回</v-btn>
        <v-btn 
          color="info" 
          :disabled="!valid"
          @click="open">
          申请开通
        </v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editIconShow: false,
      columnsNameRules: [
        v => {
          if (!v) {
            return "专栏名不能为空"
          }
          if (v.length > 32) {
            return "长度不能大于三十二位"
          }
        }
      ],
      introductionRules: [
        v => {
          if (!v) {
            return "专栏介绍不能为空"
          }
        }
      ],
      columnsDomainRules: [
        v => {
          if (!v) {
            return "域名不能为空"
          }
        }
      ],
      formData: {
        column_img: null,
        columns_name: null,
        columns_type: null,
        introduction: null,
        columns_domain: null
      },
      valid: false,
      tags: [],
      totalTags: []
    }
  },
  created () {
    this.$progress.finish()
  },
  methods: {
    // 开通专栏
    open () {
      // 1.
      if (!this.$refs.columnsForm.validate()) {
        return 
      }
      // img校验
      if (!this.formData.column_img) {
        // snak 弹窗。
        let snack = {
          content: '请上传专栏图片',
          color: 'ERROR',
          y: 'bottom'
        }
        this.$bus.emit('snack', snack)
        return
      }
      // 2.
      // 加载动画
      this._open()
    },
    _open () {
      // 添加标签
      this.formData.tags = this.tags
      console.log(this.formData)
      this.api.addColumn((res) => {
        // 3.
        // 结束动画
        if (res.code == 1) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.$router.push({name: 'Columns'})
      }, this.formData)
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
      this.api.imgUpload((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        //  替换图片URL
        this.formData.column_img = res.data.path
        // 保存博客
        // 
      }, files)
    },
    // 返回路由的上一级
    back () {
      this.$router.go(-1)
      // this.$router.push({ name: 'Columns' })
    }
  },
  watch: {
    tags (val) {
      if (val.length > 3) {
        this.$nextTick(() => this.tags.pop())
      }
    }
  }
}
</script>

<style scoped>
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
    width: 50%;
    margin-top: 40px;
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
