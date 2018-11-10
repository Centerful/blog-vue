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
      <file @deleteToTrash="deleteToTrash" @cleanblog="cleanBlog" v-for="file in files" :key="file._id" :file="file"></file>
      <form-confirm-dialog v-model="renameDialog" :confirm="rename" title="文集重命名">
        <v-text-field 
          v-model="renameVal"
          label="文集名称"
          :rules="[v => !!v || '名称不能为空', v => v != this.dir.book_name || '名称不能相同']"
          required
          autofocus>
        </v-text-field>
      </form-confirm-dialog>
    </ul>
  </li>
</template>

<script>
import file from '@/views/edit/children/File.vue'
export default {
  props: ['dir'],
  data () {
    return {
      renameDialog: false,
      renameVal: this.dir.book_name,
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
  mounted () {
    if (this.dir.book_type.toLowerCase() == 'trash') {
      this.$bus.on('blogToTrash', this.blogToTrash)
    }
  },
  methods: {
    // 打开关闭文集.
    toggleFold () {
      this.fold = !this.fold
      if (!this.fold) {
        // 展开
        this.api.getBookBlogs((res) => {
          if (res.code != 0) {
            this.$bus.emit('prompt', res.message)
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
    // 文集高度计算
    autoHeight () {
      if (this.fold) {
        this.subHeight = 0
      } else {
        this.subHeight = (this.files.length + 1) * 44
      }
    },
    // 添加博客
    addBlog () {
      let blogInfo = {
        title: this.utils.getYMD(),
        books_id: this.dir._id,
        blog_order: (this.files.length || 0)  + 1
      }
      this.api.addBlog((res) => {
        // 将新增blog添加进files中.
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.files.push(res.data)
      }, blogInfo)
    },
    // 删除博客到垃圾桶中
    deleteToTrash (_id) {
      let blog = this._deleteFile(_id)
      this.$bus.emit('blogToTrash', blog)
    },
    // 添加进垃圾桶中。
    blogToTrash (blog) {
      blog.blog_status = 'DELETE'
      this.files.push(blog)
    },
    // 从垃圾桶中删除博客
    cleanBlog (_id) {
      this._deleteFile(_id)
    },
    _deleteFile (_id) {
      // 找到对应file数据
      let blog = this.files.filter((ele, index) => {
        if (_id == ele._id) {
          ele.index = index
          return true
        }
        return false
      })[0]
      // 删除
      this.files.splice(blog.index, 1)
      return blog
    },
    // TODO 文集的操作
    dirOps (code) {
      switch (code) {
        case 'rename':
          // 需要用带输入框的文集，利用slot特性。比较复杂 TODO ，将confirm-dialog放到App.vue中通过bus的事件调用。
          // 将错误提示框，写成common组件，注册bus的事件。
          // common组件中props为title，content的参数校验修改下，可以传入null。   
          this.renameDialog = true
          break
        case 'delete':
          if (!this.files || this.files.length === 0) {
            let deleteObj = {
              title: '删除确认',
              content: `是否删除文集：“${this.dir.book_name}”， 删除后文集将无法恢复！`,
              confirm: this.deleteBook // 传递confirm时callback函数。
            }
            this.$bus.emit('confirm', deleteObj)
          } else {
            // snak 弹窗。
            let snack = {
              content: '请先删除文集中的博客！'
            }
            this.$bus.emit('snack', snack)
          }
          break
      }
    },
    // 重命名文集
    rename () {
      // TODO
      console.log('修改后文集名称：'+this.renameVal)
    },
    // 删除文集
    deleteBook () {
      // TODO
      console.log('文集已被删除！')
    }
  },
  watch: {
    // 当文集的files发送变化后自动变更高度
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
