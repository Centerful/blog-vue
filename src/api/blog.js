import http from '@/api/http'

/**
 * blog模块api接口
 */
export default {
  // 写法1.
  /*getBooks: async (callback, query) => {
    let res = await http.fetch(`/books`, query)
    callback(res.data)
  },*/
  // 写法2.
  /*getBooks: async (query) => {
    let res = await http.fetch(`/books`, query)
    return res.data
  },*/
  // 写法3.
  /*getBooks: async (query) => {
    return (await http.fetch(`/books`, query)).data
  },*/
  // 写法4
  // getBooks: async query => (await http.fetch(`/books`, query)).data,

  getBooks: async query => (await http.fetch(`/books`, query)).data,
  getBookBlogs: async bookId => (await http.fetch(`/books/${bookId}/blogs`)).data,
  // data = {title: null, books_id: null, blog_order: null}
  addBlog: async data => (await http.post(`/blogs`, data)).data,
  deleteToTrash: async blogId => (await http.delete(`/blogs/${blogId}/trash`)).data,
  cleanBlog: async blogId => (await http.delete(`/blogs/${blogId}`)).data,
  publish: async data => (await http.put(`/publishs/${data.blog_id}`, data)).data,
  cancelPublish: async blog_id => (await http.delete(`/publishs/${blog_id}`)).data,
  // data = { blog_id: null, book_id: null }
  reversion: async data => (await http.post(`/blogs/${data.blog_id}/reversion`, data)).data,
  deleteBook: async book_id => (await http.delete(`/books/${book_id}`)).data,
  // data = {book_id: null, book_name: null}
  bookRename: async data => (await http.patch(`/books/${data.book_id}/rename`, data)).data,
  addBook: async data => (await http.post(`/books`, data)).data,
  getBlog: async blogId => (await http.fetch(`/blogs/${blogId}`)).data,
  // data = { id: null, blog_img: null, title: null, content: null }
  updateBlog: async blog => (await http.put(`/blogs/${blog._id}`, blog)).data,
}