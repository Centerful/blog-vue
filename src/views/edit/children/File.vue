<template>
  <li>
    <span v-ripple style="cursor: pointer;" @click="getBlog" class="e-create-blog" @mouseover="isHover = true" @mouseout="isHover = false">
      <span class="e-row">
        <span class="e-icon">
          <!-- <icon name="file" :style="{color: '#666'}"/> -->
          <v-icon>mdi-file-document-outline</v-icon>
        </span>
        <span class="e-name">{{ file.title }}</span>
      </span>
      <v-menu z-index="30" bottom offset-y style="font-size: 16px;">
        <v-btn slot="activator" v-show="isHover" flat icon>
          <v-icon  style="font-size: 18px;">mdi-settings</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in blogOptions" v-if="item.type == file.blog_status" :key="i" @click="blogOps(item.code)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </span>
    <simpleDialog :title="title" :content="conten"></simpleDialog>
    <!-- 是否删除博客：“{{file.title}}”， 删除后博客被移动到垃圾桶 -->
  </li>
</template>

<script>
import simpleDialog from '@/components/common/SimpleDialo.vue'
export default {
  props: ['file'],
  data () {
    return {
      title: null,
      content: null,
      isHover: false,
      deleteBlogFlag: false,
      blogOptions: [
        {code: 'publish', title: '发布博客', type: 'DRAFT'},
        {code: 'delete', title: '删除博客', type: 'DRAFT'},
        {code: 'reversion', title: '恢复博客', type: 'DELETE'},
        {code: 'clean', title: '彻底删除', type: 'DELETE'},
        {code: 'updatePublish', title: '更新发布', type: 'PUBLISH'},
        {code: 'cancelPublish', title: '取消发布', type: 'PUBLISH'}
      ],
    }
  },
  components: { simpleDialog },
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
          alert('发布')
          break
        case 'delete':
          this.deleteBlogFlag = true
          break
        case 'reversion':

          break
        case 'clean':

          break
        case 'updatePublish':

          break
        case 'cancelPublish':

          break
      }
    },
    deleteBlog () {
      this.deleteBlogFlag = false
      this.api.deleteBlogById((res) => {
        if (res.code != 0) {
          this.$bus.emit('dialog', res.message)
          return 
        }
      // 通知dir，将当前blog移动到trash中。
      this.$emit('deleteblog', this.file._id)
      }, this.file._id)
    },
    publish () {

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
