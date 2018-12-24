<!-- feed-images -->
<template>
  <v-container pa-1 :class="grid_list" fluid v-show="value.length > 0">
    <v-layout justify-start align-content-start ma-1 row wrap>
      <v-flex class="img-cell" :key="index" v-for="(img, index) in value">
        <div v-show="!readOnly" class="img-minus" @click="_deleteImg(index)">
          <v-icon dark small>mdi-minus</v-icon>
        </div>
        <v-card>
          <v-card-media>
            <v-img style="cursor: pointer;" @click="_clickImg(index)" :src="img" aspect-ratio="1"></v-img>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
    <form v-if="!readOnly" style="display: none;" id="imgForm" method="post" enctype="multipart/form-data" action="图片上传">
      <input @change="_imgUpload" type="file" :id="_id" accept="image/*">
    </form>
  </v-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    _id: {
      type: [String, Number],
      default: "imageInput"
    },
    max: {
      type: Number,
      default: 9
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    grid_list () {
      if (this.readOnly) 
        return 'grid-list-md'
      else 
        return 'grid-list-lg'
    }
  },
  model: {
    value: 'value',
    event: 'update'
  },
  data: () => ({
    imgIndex: null,
    imgArr: []
  }),
  methods: {
    // 对外暴露的文件触发方法
    addImg () {
      // 最多只能有九幅图片
      if (this.value.length >= this.max) {
        this.imgIndex = null
        // snak 弹窗。
        let snack = {
          content: `最多只能选择 ${this.max} 张照片`,
          color: 'ERROR',
          y: 'bottom'
        }
        this.$bus.emit('snack', snack)
        return
      }
      document.getElementById(this._id).click()
    },
    // 根据如果是只读模式，点击img则打开fancyBox显示大图
    _clickImg (index) {
      if (this.readOnly) {
        this._fancyBoxImg(index)
      } else {
        this._changeImg(index)
      }
    },
    // 使用灯箱展示图片
    _fancyBoxImg (index) {
      this.$fancyBox.open(this.value, index)
    },
    // 更换当前(click)图片
    _changeImg (index) {
      this.imgIndex = index
      document.getElementById('imageInput').click()
    },
    // 删除当前图片
    _deleteImg (index) {
      this.imgArr = this.value
      this.imgArr.splice(index, 1)
      this.$emit('update', this.imgArr)
    },
    // 题图上传
    _imgUpload (data) {
      let files = document.getElementById(this._id).files
      if (!files || files.length < 1) {
        return
      }
      // 图片上传
      this.api.imgUpload((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return
        }
        // 判断是新增还是更换已经上传的图片
        this.imgArr = this.value
        if (this.imgIndex != null) {
          this.$set(this.imgArr, this.imgIndex, res.data.path)
          this.imgIndex = null
        } else {
          this.imgArr.push(res.data.path)  
        }
        this.$emit('update', this.imgArr)
      }, files)
    },
  }
}
</script>

<style scoped>
  .img-cell {
    position: relative;
    max-width: 180px;
    max-height: 180px;
  }
  .img-minus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50% !important;
    background-color: red;
    position: absolute;
    top: -1px;
    right: -1px;
    z-index: 10;

    cursor: pointer;
  }
</style>