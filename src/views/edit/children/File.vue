<template>
  <li>
    <span v-ripple style="cursor: pointer;" @click="getBlog(file._id)" class="e-create-blog" @mouseover="isHover = true" @mouseout="isHover = false">
      <span class="e-row">
        <span class="e-icon">
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
    <form-confirm-dialog v-model="reversionDialog" :autoClear="true" :confirm="() => removeToBook({ dir_id: bookSelect, file_id: file._id })" title="恢复博客">
      <v-card-text>
        {{ reversionContent }}
        <v-select
          v-model="bookSelect"
          item-text="book_name"
          item-value="_id"
          :items="books"
          :rules="selectRules"
          label="文集"
          placeholder="请选择..."
          required
        ></v-select>
      </v-card-text>
    </form-confirm-dialog>
    <publish-blog-dialog v-model="publishDialog" :blog_id="file._id" :confirm="_toPublish">
    </publish-blog-dialog>
  </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PublishBlogDialog from '@/views/edit/children/PublishBlogDialog.vue'
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
      publishDialog: false,
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
  components: { PublishBlogDialog },
  methods: {
    ...mapActions('edit', 
      ['deleteToTrash', 'cleanBlog', 'toPublish', 'cancelPublish', 'removeToBook', 'getBlog']),
    blogOps (code) {
      switch (code) {
        case 'publish':
        case 'updatePublish':
          this.publishDialog = true
          break
        case 'delete':
          this._delete()
          break
        case 'reversion':
          this._reversion()
          break
        case 'clean':
          this._clean()
          break
        case 'cancelPublish':
          this._cancelPublish()
          break
        case 'history':
          // TODO
          break
      }
    },
    _delete () {
      let deleteObj = {
        title: '删除确认',
        content: `是否删除博客：“${this.file.title}”，删除后博客被移动到垃圾桶！`,
        confirmColor: 'red',
        // 将博客移动到垃圾桶中
        confirm: () => this.deleteToTrash({ dir_id: this.file.book, file_id: this.file._id }) 
      }
      this.$bus.emit('confirm', deleteObj)
    },
    // 恢复到指定文集
    async _reversion () {
      // 获得文集数据
      let res = await this.$blog.getBooks({ only_book: true })
      if (res.code != 0) {
        this.$bus.emit('prompt', res.message)
        return 
      }
      this.books = res.data
      this.reversionContent = `博客“${this.file.title}”恢复至：`
      this.reversionDialog = true
    },
    // 从垃圾桶中删除博客
    _clean () {
      let clean = {
        title: '删除确认',
        content: `是否从垃圾桶中删除博客：“${this.file.title}”，删除后博客无法再恢复！`,
        confirmColor: 'red',
        // 从垃圾桶中删除博客
        confirm: () => this.cleanBlog(this.file._id)
      }
      this.$bus.emit('confirm', clean)
    },
    _cancelPublish () {
      let cancelObj = {
        title: '取消发布',
        content: `是否取消发布博客：“${this.file.title}”，取消发布后博客从专栏上撤回，通过发布功能可以再次发布博客。`,
        confirmColor: 'red',
        // 取消发布
        confirm: () => this.cancelPublish({ dir_id: this.file.book, file_id: this.file._id })
      }
      this.$bus.emit('confirm', cancelObj)
    },
    // 发布或更新博客
    _toPublish (val) {
      this.toPublish({ ...val, blog_id: this.file._id, dir_id: this.file.book, file_id: this.file._id })
    },
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
