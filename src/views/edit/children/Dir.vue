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
        <span v-ripple style="cursor: pointer;" @click="addFile(dir._id)" class="e-create-blog">
          <span class="e-row">
            <span class="e-icon">
              <v-icon>mdi-plus</v-icon>
            </span>
            <span class="e-name">添加文章</span>
          </span>
          <span class="e-btn"></span>
        </span>
      </li>
      <file v-for="file in files" :key="file._id" :file="file"></file>
      <!-- 重命名文集 -->
      <form-confirm-dialog 
        ref="formDialog" 
        v-model="renameDialog" 
        :confirm="() => bookRename({ book_id: dir._id, book_name: renameVal })" 
        title="文集重命名">
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
import { mapState, mapActions } from 'vuex'
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
      dirOptions: [
        {code: 'rename', title: '重命名'},
        {code: 'delete', title: '删除文集'}
      ]
    }
  },
  computed: {
    files () {
      return this.dir.files
    }
  },
  components: { file },
  methods: {
    ...mapActions('edit', ['fetchFiles', 'addFile', 'deleteBook', 'bookRename']),
    // 打开关闭文集.
    async toggleFold () {
      this.fold = !this.fold
      if (!this.fold) {
        let code = await this.fetchFiles(this.dir._id)
        // 如果出现错误则不展开
        if (code) {
          this.fold = !this.fold
        }
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
    // 文集的操作
    dirOps (code) {
      switch (code) {
        case 'rename':
          // 需要用带输入框的文集，利用slot特性。比较复杂 ，将confirm-dialog放到App.vue中通过bus的事件调用。
          // 将错误提示框，写成common组件，注册bus的事件。
          // common组件中props为title，content的参数校验修改下，可以传入null。   
          this.renameDialog = true
          this.renameVal = this.dir.book_name
          break
        case 'delete':
          this._delete()
          break
      }
    },
    // 删除文集
    _delete () {
      if (!this.files || this.files.length === 0) {
        let deleteObj = {
          title: '删除确认',
          content: `是否删除文集：“${this.dir.book_name}”， 删除后文集将无法恢复！`,
          confirmColor: 'red',
          confirm: () => this.deleteBook(this.dir._id)
        }
        this.$bus.emit('confirm', deleteObj)
      } else {
        // snak 弹窗。
        let snack = {
          content: '请先删除文集中的博客！'
        }
        this.$bus.emit('snack', snack)
      }
    },
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
