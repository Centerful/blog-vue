import axios from 'axios'
import qs from 'qs'

// 跨域时cookie不变.
axios.defaults.withCredentials = false
// 设置基础请求URL
const baseUrl = 'http://localhost:3000/v'
axios.defaults.baseURL = baseUrl
// 设置默认超时时间
axios.defaults.timeout = 10000

// axios请求拦截
axios.interceptors.request.use(config => {
  // 发送请求之前做一些处理
  config.headers = {
    // 'Content-Type': 'application/json; charset=utf-8',
    // 配置请求头
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return config
}, err => {
  // 当请求异常时做一些处理
  console.error(err)
  return Promise.reject(err)
})

// axios响应拦截
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  console.error(err.message)
  return Promise.resolve(err.response)
})

export default {
  // get方法
  async fetch (url, query) {
    try {
      let res = await axios.get(url, { params: query })
      return res
    } catch (err) {
      console.error(err)
    }
  },
  // x-www-unlencoded(form)与json两种
  async post (url, data) {
    // TODO 待修改
    try {
      console.log(url)
      let res = await axios.post(url, data)
      return res
    } catch (err) {
      console.error(err)
    }
  },
  async patch () {

  },
  async put () {

  },
  async delete () {

  }
}
