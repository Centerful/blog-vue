import http from '@/api/http'
// 接口统一管理
export default {
  // 登录方法
  login: async (callback, data = {
    user_name: null,
    password: null
  }) => {
    let res = await http.post('/login', data)
    callback(res.data)
  },
  logout: async (callback) => {
    // 可以改成delete
    let res = await http.post('/logout')
    callback(res.data)
  },
  register: async (callback, data = {
    is_email: null,
    user_name: null,
    password: null
  }) => {
    let res = await http.post('/register', data)
    callback(res.data)
  },
  visitor: async (callback, data = {
    user_name: null,
    email: null,
    user_avatar: null
  }) => {
    let res = await http.post('/visitor', data)
    callback(res.data)
  },
  getBlogs: async (callback, query) => {
    let res = await http.fetch('/blogs', query)
    callback(res.data)
  },
  getBlog: async (callback, bolgId) => {
    let res = await http.fetch(`/blogs/${bolgId}`)
    callback(res.data)
  },
  getColumns: async (callback, query) => {
    let res = await http.fetch('/columns', query)
    callback(res.data)
  },
  getColumnDetail: async (callback, columnId) => {
    let res = await http.fetch(`/columns/${columnId}`)
    callback(res.data)
  },
  getColumnBlogs: async (callback, columnId) => {
    let res = await http.fetch(`/columns/${columnId}/blogs`)
    callback(res.data)
  },
  getFeeds: async (callback, query) => {
    let res = await http.fetch('/feeds', query)
    callback(res.data)
  },
  getFeedComments: async (callback, feedId) => {
    let res = await http.fetch(`/feeds/${feedId}/comments`)
    callback(res.data)
  },
  getBooks: async (callback, query) => {
    let res = await http.fetch(`/books`, query)
    callback(res.data)
  },
  getBookBlogs: async (callback, bookId) => {
    let res = await http.fetch(`/books/${bookId}/blogs`)
    callback(res.data)
  },
  addBlog: async (callback, data = {
    title: null,
    books_id: null,
    blog_order: null
  }) => {
    let res = await http.post(`/blogs`, data)
    callback(res.data)
  },
  updateBlog: async (callback, data = {
    id: null,
    blog_img: null,
    title: null,
    content: null
  }) => {
    let res = await http.put(`/blogs/${data.id}`, data)
    callback(res.data)
  },
  getSeq: async callback => {
    let res = await http.post(`/seq`)
    callback(res.data.id)
  }
}
