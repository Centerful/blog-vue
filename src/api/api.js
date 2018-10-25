import http from '@/api/http'
// 接口统一管理
export default {
  // 登录方法
  login: data => {
    // TODO
  },
  register: data => {
    // TODO
  },
  visitor: data => {
    // TODO
  },
  getBlogs: async (callback, query) => {
    let resp = await http.fetch('/blogs', query)
    callback(resp.data)
  },
  getBlog: async (callback, bolgId) => {
    let resp = await http.fetch(`/blogs/${bolgId}`)
    callback(resp.data)
  },
  getColumns: async (callback, query) => {
    let resp = await http.fetch('/columns', query)
    callback(resp.data)
  },
  getColumnDetail: async (callback, columnId) => {
    let resp = await http.fetch(`/columns/${columnId}`)
    callback(resp.data)
  },
  getColumnBlogs: async (callback, columnId) => {
    let resp = await http.fetch(`/columns/${columnId}/blogs`)
    callback(resp.data)
  },
  getFeeds: async (callback, query) => {
    let resp = await http.fetch('/feeds', query)
    callback(resp.data)
  },
  getFeedComments: async (callback, feedId) => {
    let resp = await http.fetch(`/feeds/${feedId}/comments`)
    callback(resp.data)
  },
  getBooks: async (callback, query) => {
    let resp = await http.fetch(`/books`, query)
    callback(resp.data)
  },
  getSeq: async callback => {
    let resp = await http.post(`/seq`)
    callback(resp.data.id)
  }
}
