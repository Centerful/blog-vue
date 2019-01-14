// dir-file数据的存储-edit模块的Dir与File组件。
/**
 * 在博客编辑页面侧边栏显示文集及其博客信息。
 * 文集信息（dir）存储在sidebar组件中，博客信息（file）存储在dir组件中。
 * 侧边栏有很多事件都是跨组件的，比如删除一个博客时需要将事件传递到sidebar中，然后由sidebar在对应dir中删除对应file
 * 侧边栏是一个事件较多功能复杂的组件，目前将数据与事件分布在不同子组件上，难以直观的了解整个组件的功能，并且这种做法很难维护。
 * 这里使用vuex将侧边栏组件中的dir-file数据树抽出，使组件尽可能的变得轻量，且组件中的事件仅作用于组件内部，跨组件事件都变编写到vuex模块中。
 */

import Vue from 'vue'
import blog from '@/api/blog'
import common from '@/api/common'


const vue = Vue.prototype

const state = {
  dirs: [], // 侧边栏数据
  blog: {} // 博客数据
}

const getters = {

}

const mutations = {
  setDirs (state, item) {
    state.dirs = item
  },
  setFiles (state, data = { files: null, dir_id: null }) {
    let dir = state.dirs.find(i => i._id === data.dir_id)
    Vue.set(dir, 'files', data.files)
  },
  pushFile (state, data = { file: null, dir_id: null }) {
    let dir = state.dirs.find(i => i._id === data.dir_id ? i : null)
    dir.files.push(data.file)
  },
  fileToTrash (state, data = { dir_id: null, file_id: null }) {
    // 1.在原dir.files中删除对应file
    // 原file数据
    let dir = state.dirs.find(i => i._id === data.dir_id)
    let index = 0
    let file = dir.files.find((e, i) => {
      index = i
      return e._id === data.file_id ? e : null
    })
    dir.files.splice(index, 1)
    // 2.在垃圾桶dir中push删除的file
    let trash = state.dirs.find(i => i.book_type === 'TRASH')
    file.blog_status= 'DELETE'
    file.book = trash._id
    if (trash.files) {
      trash.files.push(file)  
    }
  },
  // 将file从垃圾桶移动到dir中
  trashToBook (state, data = { dir_id: null, file_id: null }) {
    // 1.在trash中删除file
    let trash = state.dirs.find(i => i.book_type === 'TRASH')
    let index = 0
    let file = trash.files.find((e, i) => {
      index = i
      return e._id === data.file_id ? e : null
    })
    trash.files.splice(index, 1)

    // 2.在book中push删除的file
    let dir = state.dirs.find(i => i._id === data.dir_id)
    file.blog_status= 'DRAFT'
    file.book = dir._id
    if (dir.files) {
      dir.files.push(file)  
    }
  },
  deleteFileFromTrash (state, file_id) {
    let trash = state.dirs.find(i => i.book_type === 'TRASH')
    let index = 0
    let file = trash.files.find((e, i) => {
      index = i
      return e._id === file_id
    })
    trash.files.splice(index, 1)
  },
  filePublish (state, data = { dir_id: null, file_id: null }) {
    let file = state.dirs.find(i => i._id === data.dir_id).files.find(i => i._id === data.file_id)
    file.blog_status = 'PUBLISH'
  },
  fileCancelPub (state, data = { dir_id: null, file_id: null }) {
    let file = state.dirs.find(i => i._id === data.dir_id).files.find(i => i._id === data.file_id)
    file.blog_status = 'DRAFT'
  },
  delBook (state, dir_id) {
    let index = 0
    let dir = state.dirs.find((e, i) => {
      index = i
      return e._id === dir_id
    })
    state.dirs.splice(index, 1)
  },
  renameBookName (state, data = { book_id: null, book_name: null }) {
    let dir = state.dirs.find(i => i._id === data.book_id)
    dir.book_name = data.book_name
  },
  addBook (state, book) {
    // 在垃圾桶前插入一条
    let trash = state.dirs.pop()
    state.dirs.push(book)
    state.dirs.push(trash)
  },
  setBlogInfo (state, data) {
    state.blog = data
    // 发送通知给Editormd.vue组件。
    /**
     * editormd组件封装了一个基于jquery的makedown组件，不支持双向绑定。
     * 跟editormd组件交互通过事件驱动来进行。
     */
    vue.$bus.emit('setBlogContent', state.blog.content)
  },
  setBlogImg (state, path) {
    state.blog.blog_img = path
  },
  // 将blog的title赋值到对应dir-file上
  updateTitle (state, title) {
    let file = state.dirs.find(i => i._id === state.blog.book).files.find(i => i._id === state.blog._id)
    state.blog.title = file.title = title
  },
  // 更新blog内容
  updateContent (state, content) {
    state.blog.content = content
  },
  // 当editContent重新加载时(退出编辑页面在重新进入)清空blog的数据
  cleanRemainBlogInfo (state) {
    state.blog = {}
  }

}

const actions = {

  // 获取当前用户dirs数据
  async fetchBooks ({commit, state}) {
    /*let t = await blog.getBooks()
    let res = await blog.getBooks()*/
    let res = await blog.getBooks()
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    commit('setDirs', res.data.sort(vue.utils.compare('book_order')))
  },

  // 获取dir下files数据
  async fetchFiles ({commit, state}, dir_id) {
    // 1.
    let res = await blog.getBookBlogs(dir_id)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return res.code
    }
    // 2. 插入blogs信息.
    commit('setFiles', {
      files: res.data.sort(vue.utils.compare('book_order')),
      dir_id: dir_id
    })
  },

  // 新增files
  async addFile ({commit, state}, dir_id) {
    let dir = state.dirs.find(i => i._id === dir_id ? i : null)
    let blogInfo = {
      title: vue.utils.getYMD(),
      books_id: dir_id,
      blog_order: (dir.files.length || 0)  + 1
    }
    let res = await blog.addBlog(blogInfo)
    // 将新增blog添加进files中.
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    commit('pushFile', {
      dir_id: dir_id,
      file: res.data
    })
  },

  // 删除file到垃圾桶中
  async deleteToTrash ({commit, state}, data = { dir_id: null, file_id: null }) {
    // 1.调用api将file删除
    let res = await blog.deleteToTrash(data.file_id)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.在state中将file移动到垃圾桶中
    commit('fileToTrash', data)
  },

  // 从垃圾桶中删除博客
  async cleanBlog ({commit, state}, file_id) {
    // 1.通知后端删除该博客
    let res = await blog.cleanBlog(file_id)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.垃圾桶dir删除对应file
    commit('deleteFileFromTrash', file_id)
  },

  // 发布博客
  async toPublish ({commit, state}, data) {
    // 1.通知后端发布此博客
    let res = await blog.publish(data)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.将file状态修改为发布
    commit('filePublish', data)
  },

  // 取消发布博客
  async cancelPublish ({commit, state}, data = { dir_id: null, file_id: null }) {
    // 1.通知后端取消发布博客
    // 解构赋值-data赋值为res
    let res = await blog.cancelPublish(data.file_id)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.
    commit('fileCancelPub', data)
  },

  // 将垃圾桶中的博客恢复到指定文集中
  async removeToBook ({commit, state}, data = { dir_id: null, file_id: null }) {
    // 1.通知后端恢复博客
    let res = await blog.reversion({ 'book_id': data.dir_id , 'blog_id': data.file_id })
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.通知垃圾桶删除当前博客，通知文集添加博客。
    commit('trashToBook', data)
  },

  // 删除文集
  async deleteBook ({commit, state}, dir_id) {
    // 1.
    let res = await blog.deleteBook(dir_id)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.删除当前book
    commit('delBook', dir_id)
  },

  // 重命名文集
  async bookRename ({commit, state}, data = { book_id: null, book_name: null }) {
    // 1.
    let res = await blog.bookRename(data)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.
    commit('renameBookName', data)
  },

  // 添加文集
  async toAddBook ({commit, state}, data = { book_name: null }) {
    // 1.
    let res = await blog.addBook(data)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 2.
    commit('addBook', res.data)
  },

  // 获取博客详细信息
  async getBlog ({commit, state}, blog_id) {
    // 1.两次打开相同博客,return
    if (state.blog._id && state.blog._id === blog_id) {
      return
    }
    // 2.通过api获得博客信息
    let res = await blog.getBlog(blog_id)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return 
    }
    // 3.修改数据
    commit('setBlogInfo', res.data)
  },

  // 上传博客图片 
  async blogImgUpload ({commit, state}, blog_id) {
    let res = await common.imageUpload('imageInput')
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
      return
    }
    commit('setBlogImg', res.data.path)
  },

  // 博客信息保存至后端
  async saveBlog ({commit, state}) {
    let res = await blog.updateBlog(state.blog)
    if (res.code != 0) {
      vue.$bus.emit('prompt', res.message)
    }
    return res.code
  },

}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}