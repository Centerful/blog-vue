import http from '@/api/http'

/**
 * comment模块api接口
 */
export default {
  getComments: async (callback, query) => {
    let res = await http.fetch(`/comments`, query)
    callback(res.data)
  },
}