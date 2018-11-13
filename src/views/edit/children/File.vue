<template>
  <li>
    <span v-ripple style="cursor: pointer;" @click="getBlog" class="e-create-blog" @mouseover="isHover = true" @mouseout="isHover = false">
      <span class="e-row">
        <span class="e-icon">
          <!-- <icon name="file" :style="{color: '#666'}"/> -->
          <v-icon>mdi-file</v-icon>
        </span>
        <span class="e-name">{{ file.title }}</span>
      </span>
      <v-menu z-index="30" bottom offset-y style="font-size: 16px;">
        <v-btn slot="activator" v-show="isHover" flat icon>
          <v-icon  style="font-size: 18px;">mdi-settings</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in blogOptions" v-if="item.type.indexOf(file.blog_status) != -1" :key="i" @click="blogOps(item.code)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </span>
    <form-confirm-dialog v-model="reversionDialog" :autoClear="true" :confirm="reversion" title="恢复博客">
      <v-card-text>
        {{ reversionContent }}
        <v-select
          v-model="bookSelect"
          item-text="book_name"
          item-value="_id"
          :items="books"
          :rules="selectRules"
          required
        ></v-select>
      </v-card-text>
    </form-confirm-dialog>
  </li>
</template>

<script>
export default {
  props: ['file'],
  data () {
    return {
      isHover: false,
      blogOptions: [
        {code: 'publish', title: '发布博客', type: 'DRAFT'},
        {code: 'delete', title: '删除博客', type: 'DRAFT'},
        {code: 'reversion', title: '恢复博客', type: 'DELETE'},
        {code: 'clean', title: '彻底删除', type: 'DELETE'},
        {code: 'updatePublish', title: '更新发布', type: 'PUBLISH'},
        {code: 'cancelPublish', title: '取消发布', type: 'PUBLISH'},
        {code: 'history', title: '历史版本', type: ['DRAFT', 'PUBLISH']}
      ],
      reversionDialog: false,
      bookSelect: { _id: '', book_name: '' },
      reversionContent: null,
      books: [],
      selectRules: [
        v => {
          if (!v || v._id == '') {
            return '请选择文集'
          }
          if (v && v._id == undefined) {
            return true
          }
          return '请选择文集'
        }
      ]
    }
  },
  methods: {
    getBlog () {
      this.$bus.emit('getBlog', {
        file_id: this.file._id,
        book_id: this.file.book
      })
    },
    blogOps (code) {
      switch (code) {
        case 'publish':
          // TODO
          
          break
        case 'delete':
          let deleteObj = {
            title: '删除确认',
            content: `是否删除博客：“${this.file.title}”， 删除后博客被移动到垃圾桶！`,
            confirmColor: 'red',
            confirm: this.deleteToTrash // 传递confirm时callback函数。
          }
          this.$bus.emit('confirm', deleteObj)
          break
        case 'reversion':
          // 获得文集数据
          this.api.getBooks((res) => {
            if (res.code != 0) {
              this.$bus.emit('prompt', res.message)
              return 
            }
            this.books = res.data
          }, {only_book: true})
          this.reversionContent = `博客“${this.file.title}”恢复至文集：`
          this.reversionDialog = true
          break
        case 'clean':
          let clean = {
            title: '删除确认',
            content: `是否从垃圾桶中删除博客：“${this.file.title}”， 删除后博客无法再恢复！`,
            confirmColor: 'red',
            confirm: this.cleanBlog
          }
          this.$bus.emit('confirm', clean)
          break
        case 'updatePublish':
          // TODO

          break
        case 'cancelPublish':
          // TODO
          break
        case 'history':
          // TODO

          break
      }
    },
    deleteToTrash () {
      this.api.deleteToTrash((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
      // 通知dir，将当前blog移动到trash中。
      this.$emit('deleteToTrash', this.file._id)
      }, this.file._id)
    },
    // 从垃圾桶中删除博客
    cleanBlog () {
      this.api.cleanBlog((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.$emit('cleanblog', this.file._id)
      }, this.file._id)
    },
    publish () {

    },
    // 恢复到指定文集
    reversion () {
      // 在异步方法外边将form表单数据拉取出。可以将formdialog设置为自动清空。
      let data = { blog_id: this.file._id, book_id: this.bookSelect }
      this.api.reversion((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        // 通知垃圾桶删除当前博客，通知文集添加博客。
        data.file = this.file
        data.file.blog_order = res.data.blog_order
        data.file.blog_status = 'DRAFT'
        this.$emit('reversionToBook', data)
      }, data)
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  li > span {
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
  span > div {
    border-radius: 3px;
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
