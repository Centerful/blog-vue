import axios from 'axios'
// import qs from 'qs'
// 引入data数据.其实应该通过axios发送ajax请求本地json文件,本地需要部署nginx进行反向代理或是提供服务器功能.
import blogData from '@/mock/blogs-data.js'
// 引入blog明细数据
import blogDetailData from '@/mock/blogs-detail-data.js'
// feed数据
import feedData from '@/mock/feed-data.js'
// feed的replie数据
import feedReplieData from '@/mock/feed-replies-data.js'

axios.defaults.withCredentials = true

// 配置各个请求的地址
let base = 'http://192.168.1.110:8081/hhdj/'
let url = {
  login: `${base}login/login.do`,
  codeUrl: `${base}validatecode.jsp`,
  newsList: `${base}news/newsList.do`
}

// 包装各种请求,返回请求数据,并处理请求错误.
const LATENCY = 2000

export default {
  getBlogs: cb => {
    // return axios.post(url.login, qs.stringify(data))
    // cb(blogData)
    setTimeout(function () {
      cb(blogData)
    }, LATENCY)
  },
  getBlogDetails: (blogId, cb) => {
    let blogDetail = blogDetailData.find((e) => {
      if (e.blogID === blogId) {
        return e
      }
    })
    setTimeout(function () {
      cb(blogDetail)
    }, 500)
  },
  getFeeds: cb => {
    setTimeout(function () {
      cb(feedData)
    }, 1200)
  },
  getFeedReplies: (feedId, cb) => {
    let replieData = feedReplieData.find((e) => {
      if (e.feedId === feedId) {
        return e
      }
    })
    setTimeout(function () {
      cb(replieData.replies)
    }, 800)
  },
  getNews: data => {
    return axios.get(url.newsList, {params: data})
  }
}
