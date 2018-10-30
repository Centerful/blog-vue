import http from '@/api/http'
// 接口统一管理
export default {
  // 登录方法
  login: async (callback, data = {
    user_name: '',
    password: ''
  }) => {
    let res = await http.post('/login', data)
    callback(res.data)
  },
  register: async (callback, data = {
    is_email: '',
    user_name: '',
    password: ''
  }) => {
    let res = await http.post('/register', data)
    callback(res.data)
  },
  visitor: data => {
    // TODO
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
  getSeq: async callback => {
    let res = await http.post(`/seq`)
    callback(res.data.id)
  }
}
