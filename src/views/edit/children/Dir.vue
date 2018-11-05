<template>
  <li class="e-dir">
    <a v-waves @mouseover="isHover = true" @mouseout="isHover = false" @click="toggleFold">
      <span class="e-row">
        <span class="e-icon"><icon :name="dir.book_type.toLowerCase()" :style="{color: '#666'}"/></span>
        <span class="e-name">{{ dir.book_name }}</span>
      </span>
      <div v-waves @click.stop="doCog">
        <span class="e-btn" :class="{ show: isHover }"><icon name="cog" :style="{color: '#666'}"/></span>
      </div>
    </a>
    <ul :style="{ height:subHeight + 'px' }">
      <li v-if="dir.book_type.toLowerCase() == 'book'">
        <a v-waves @click="addBlog" class="e-create-blog">
          <span class="e-row">
            <span class="e-icon"><icon name="plus"/></span>
            <span class="e-name">新建文章</span>
          </span>
          <span class="e-btn"></span>
        </a>
      </li>
      <file v-for="file in dir.files" :key="file.id" :file="file"></file>
    </ul>
  </li>
</template>

<script>
import file from '@/views/edit/children/File.vue'
export default {
  props: ['dir'],
  data () {
    return {
      isHover: false,
      fold: true,
      subHeight: 0
    }
  },
  components: { file },
  computed: {
  },
  methods: {
    doCog () {

    },
    // 每次打开前发送ajax请求,获得当前文集下blogs信息.
    toggleFold () {
      if (!this.dir.files) {
        this.$set(this.dir, 'files', [])
      }
      this.fold = !this.fold
      if (!this.fold) {
        // 展开
        this.api.getBookBlogs((res) => {
          if (res.code == 1) {
            this.$bus.emit('dialog', res.message)
            // 将文集设置为未打开状态.
            this.fold = !this.fold
            return 
          }
          // 插入blogs信息.
          this.$set(this.dir, 'files', res.data.sort(this.utils.compare('blog_order')))
          this.autoHeight()
        }, this.dir.id)
      } else {
        // 收缩
        this.autoHeight()
      }
    },
    autoHeight () {
      if (this.fold) {
        this.subHeight = 0
      } else {
        this.subHeight = (this.dir.files.length + 1) * 44
      }
    },
    addBlog () {
      let blogInfo = {
        title: this.utils.getYMD(),
        books_id: this.dir.id,
        blog_order: (this.dir.files.length || 0)  + 1
      }
      this.api.addBlog((res) => {
        // 将新增blog添加进files中.
        this.dir.files.push(res.data)
        this.autoHeight()
      }, blogInfo)
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
  a > div {
    border-radius: 3px;
  }
  .e-dir > a{
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin: 0 10px 0 10px;
    border-radius: 3px;
    background: #fff;
    transition: background 0.3s ease-in-out;
  }
  ul > li > a {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin: 0 10px 0 30px;
    border-radius: 3px;
    background: #fff;
    transition: background 0.3s ease-in-out;
  }
  .e-dir > ul {
    height:0px;
    padding: 0px;
    overflow: hidden;
    transition: height 0.5s ease 0s;
  }
  .dir-open {
    transition: height 0.5s ease 0s;
  }
  .e-create-blog {
    color: #aaa;
  }
  .e-row {
    display: flex;
  }
  .e-icon {
    padding-right: 15px;
  }
  .e-name {
    word-break: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 180px;
  }
  .e-dir > a > .e-row > .e-name {
    max-width: 200px;
  }
  .e-btn {
    background: inherit;
    padding: 5px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .e-btn.show {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
  .e-btn:hover {
    background: #cecece;
    transition: background 0.25s ease-in-out;
  }
</style>
