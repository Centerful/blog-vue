<template>
  <div class="edit-side-bar">
    <div class="edit-side-fake" @click="isOpen = true" :class="{ hover: isHover }">
      <section @mouseover="isHover = true" @mouseout="isHover = false"></section>
    </div>
    <div class="edit-container">
      <div class="edit-mask" :class="{ loaded: isOpen }" @click="isOpen = false"></div>
      <div class="edit-side" :class="{ loaded: isOpen }">
        <header>
          <template v-if="isSearch">
            <v-text-field 
              placeholder="Search"
              append-icon="mdi-close"
              :append-icon-cb="closeSearch"
              prepend-inner-icon="mdi-magnify"
              color="white"
              dark
              autofocus
            ></v-text-field>
          </template>
          <template v-else>
            <div title="7篇文章" class="edit-header-number">
              <strong>7</strong>
              <span>文章</span>
            </div>
          </template>
          <div class="edit-header-bar">
            <v-btn v-show="!isSearch" @click="isSearch = !isSearch" flat icon dark>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-menu z-index="30" bottom offset-y>
              <v-btn slot="activator" flat icon dark>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(item, i) in headerOptions" :key="i" @click="headerOps(item.code)">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </header>
        <section class="edit-content">
          <ul>
            <Dir v-for="dir in dirs" :key="dir._id" :ref="dir._id" :dir="dir"></Dir>
          </ul>
        </section>
        <v-btn  
          @click="back" 
          class="white--text edit-footer" 
          large
          color="blue-grey">
          <span>回到首页</span>
          <v-icon right dark>mdi-home</v-icon>
        </v-btn>
      </div>
    </div>
  
    <form-confirm-dialog v-model="addBook" :confirm="toAddBook" title="添加文集">
      <v-text-field 
        v-model="book_name" 
        label="文集名称" 
        :rules="[v => !!v || '名称不能为空']" 
        required 
        autofocus>
      </v-text-field>
    </form-confirm-dialog>
  </div>
</template>

<script>
import Dir from '@/views/edit/children/Dir.vue'
export default {
  name: 'EditSideBar',
  data () {
    return {
      dirs: [],
      isSearch: false,
      isHover: false,
      isOpen: false,
      addBook: false,
      book_name: null,
      headerOptions: [
        {
          title: '添加文集',
          code: 'addBook'
        }
      ]
    }
  },
  created () {
    this.eventListener()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': {
      handler: 'fetchData',
      immediate: true // 立马执行一次,相当于created中调用一次.
    }
  },
  components: { Dir },
  methods: {
    // 添加事件,对外暴露事件
    eventListener () {
      this.$bus.on('titleInput', this.titleInput)
    },
    titleInput (dir) {
      this.$refs[dir.book_id][0].files.filter((file) => {
        if (file._id == dir.file_id) {
          file.title = dir.title
        }
      })
    },
    fetchData () {
      this.api.getBooks((res) => {
        if (res.code != 0) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        this.dirs = res.data.sort(this.utils.compare('book_order'))
      })
    },
    closeSearch () {
      console.log('closeSearch')
      this.isSearch = !this.isSearch
    },
    headerOps (code) {
      switch (code) {
        // 添加文集
        case "addBook":
          this.addBook = true
          break;
      }
    },
    toAddBook () {
      this.api.addBook((res) => {
        if (res.code == 1) {
          this.$bus.emit('prompt', res.message)
          return 
        }
        // 在垃圾桶前插入一条
        let trash = this.dirs.pop()
        this.dirs.push(res.data)
        this.dirs.push(trash)
        this.book_name = null
        this.addBook = false
      }, {book_name: this.book_name})
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .edit-side-bar {
    font-size: 0.95em;
  }
  .edit-side-fake {
    position: fixed;
    top: 0;
    left: -41px;
    height: 100%;
    background-color: #777;
    width: 40px;
    opacity: 0;
    transition: left .15s ease-in-out,opacity .2s ease-in-out;
  }
  .edit-side-fake.hover {
    left: 0px;
    opacity: 1;
    transition: left .15s ease-in-out,opacity .2s ease-in-out;
  }
  .edit-side-fake > section {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 30px;
    opacity: 0;
  }
  .edit-side {
    position: fixed;
    top: 0;
    height: 100%;
    width: 350px;
    background-color: #fff;
    z-index: 20;
    box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);

    left: -360px;
    opacity: 0.8;
    transition: left .15s ease-in-out,opacity .15s ease-in-out;
  }
  .edit-side.loaded {
    left: 0px;
    opacity: 1;
    transition: left .15s ease-in-out,opacity .15s ease-in-out;
  }

  .edit-mask {
    position: fixed;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    /*background: rgba(0,0,0,.4);*/
    background: rgba(255,255,255,0.8);
    z-index: 10;
    /*display: none;*/
    opacity: 0.8;
    display: none;
    transition: opacity .2s ease-in-out;
  }
  .edit-mask.loaded {
    /*display: block;*/
    opacity: 1;
    display: block;
    transition: opacity .2s ease-in-out;
  }

  .edit-side > header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 12px;
    background: #1b82f1;
    transition: background 0.3s;
    box-shadow: 0 6px 12px -3px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #fff;
    z-index: 20;
  }
  .edit-header-number {
    display: flex;
    align-items: baseline;
    cursor: default;
  }
  .edit-header-number > strong{
    font-size: 1.5em;
    font-weight: 400;
    padding: 8px;
  }
  .edit-header-number > span {
    font-size: 0.9em;
    position: relative;
    bottom: 1.5px;
    opacity: 0.8;
  }
  .edit-header-bar {
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .edit-header-bar > button {
    margin: 2px;
  }
  .edit-header-bar > dasd {
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 50%;
    margin: 2px;
    width: 24px;
    height: 24px;
    transition: background-color 0.3s ease-in-out;
  }
  .edit-header-bar > asdasd:hover {
    background-color: #ffffff30;
    transition: background-color 0.3s ease-in-out;
  }
  .edit-content {
    height: 100%;
    overflow-y: scroll;
  }
  /*滚动条凹槽的颜色，还可以设置边框属性*/
  .edit-content::-webkit-scrollbar-track-piece {
    background-color:#fff;
  }
  /*滚动条的宽度*/
  .edit-content::-webkit-scrollbar {
    width:5px;
    /*height: 15px;*/
  }
  /*滚动条的设置*/
  .edit-content::-webkit-scrollbar-thumb {
    background-color: #bbb;
    background-clip: padding-box;
    border-radius: 2px;
    /*min-height: 40px;*/
  }
  /*hover设置*/
  .edit-content::-webkit-scrollbar-thumb:hover {
    background-color:#26A69A;
  }
  .edit-content > ul {
    font-size: 0.9em;
    padding: 10px;
    margin-bottom: 90px;
  }
  .edit-footer {
    margin: 0;
    border-radius: 0;
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .edit-footer > span {
    font-size: 0.97em;
    padding: 10px;
  }

</style>
