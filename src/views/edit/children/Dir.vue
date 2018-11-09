<template>
  <li class="e-dir">
    <span style="cursor: pointer;" v-ripple @mouseover="isHover = true" @mouseout="isHover = false" @click="toggleFold">
      <span class="e-row">
        <span class="e-icon">
          <template v-if="dir.book_type.toLowerCase() === 'book'">
            <v-icon>mdi-book</v-icon>
          </template>
          <template v-else>
            <v-icon>mdi-delete</v-icon>
          </template>
        </span>
        <span class="e-name">{{ dir.book_name }}</span>
      </span>
      <v-menu z-index="30" bottom offset-y v-if="dir.book_type.toLowerCase() != 'trash'">
        <v-btn slot="activator" v-show="isHover" flat icon>
          <v-icon  style="font-size: 18px;">mdi-settings</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in dirOptions" :key="i" @click="dirOps(item.code)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </span>
    <ul :style="{ height:subHeight + 'px' }">
      <li v-if="dir.book_type.toLowerCase() == 'book'">
        <span v-ripple style="cursor: pointer;" @click="addBlog" class="e-create-blog">
          <span class="e-row">
            <span class="e-icon">
              <v-icon>mdi-plus</v-icon>
            </span>
            <span class="e-name">添加文章</span>
          </span>
          <span class="e-btn"></span>
        </span>
      </li>
      <file @deleteblog="deleteBlog" v-for="file in files" :key="file._id" :file="file"></file>
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
      subHeight: 0,
      files: [],
      dirOptions: [
        {code: 'rename', title: '重命名'},
        {code: 'delete', title: '删除文集'}
      ]
    }
  },
  components: { file },
  computed: {
  },
  mounted () {
    if (this.dir.book_type.toLowerCase() == 'trash') {
      this.$bus.on('blogToTrash', this.blogToTrash)
    }
  },
  methods: {
    // 每次打开前发送ajax请求,获得当前文集下blogs信息.
    toggleFold () {
      this.fold = !this.fold
      if (!this.fold) {
        // 展开
        this.api.getBookBlogs((res) => {
          if (res.code != 0) {
            this.$bus.emit('dialog', res.message)
            // 将文集设置为未打开状态.
            this.fold = !this.fold
            return 
          }
          // 插入blogs信息.
          this.files = res.data.sort(this.utils.compare('blog_order'))
        }, this.dir._id)
      } else {
        // 收缩
        this.autoHeight()
      }
    },
    autoHeight () {
      if (this.fold) {
        this.subHeight = 0
      } else {
        this.subHeight = (this.files.length + 1) * 44
      }
    },
    addBlog () {
      let blogInfo = {
        title: this.utils.getYMD(),
        books_id: this.dir._id,
        blog_order: (this.files.length || 0)  + 1
      }
      this.api.addBlog((res) => {
        // 将新增blog添加进files中.
        if (res.code != 0) {
          this.$bus.emit('dialog', res.message)
          return 
        }
        this.files.push(res.data)
      }, blogInfo)
    },
    deleteBlog (blogId) {
      console.log('删除博客：'+blogId)
      // 选出需要移动到trash中的blog。
      let blog = this.files.filter((ele, index) => {
        if (blogId == ele._id) {
          ele.index = index
          return true
        }
        return false
      })[0]
      // 当前文集中删除博客
      this.files.splice(blog.index, 1)
      // 添加进trash中。
      this.$bus.emit('blogToTrash', blog)
    },
    blogToTrash (blog) {
      this.files.push(blog)
    },
    dirOps (code) {
      switch (code) {
        case 'rename':
          alert('rename')
          break;
        case 'delete':
          alert('delete')
          break;
      }
    }
  },
  watch: {
    files () {
      this.autoHeight()
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
  span > div {
    border-radius: 3px;
  }
  .e-dir > span {
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
  ul > li > span {
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
    opacity: 0.55;
  }
  .e-row {
    display: flex;
    align-items: center;
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
  .e-dir > span > .e-row > .e-name {
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
