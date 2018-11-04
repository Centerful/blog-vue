import Vue from 'vue'
import Router from 'vue-router'
import Columns from '@/views/column/Columns.vue'
import ColumnContent from '@/views/column/ColumnContent'
import ColumnOpen from '@/views/column/ColumnOpen'
import Blog from '@/views/blog/Blog.vue'
import Feed from '@/views/feed/Feed.vue'
import Edit from '@/views/edit/Edit.vue'
import Layout from '@/views/Layout.vue'
import Login from '@/views/login/Login.vue'
import BlogContent from '@/views/blog/BlogContent.vue'

// 使用vuetify重构组件
import Logintify from '@/views/login/Logintify.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      component: Layout,
      children: [
        { path: '', name: 'welcome', component: Blog },
        { path: 'columns', name: 'Columns', component: Columns },
        { path: 'columns/:id', name: 'ColumnContent', component: ColumnContent },
        { path: 'columns/open/:id', name: 'ColumnOpen', component: ColumnOpen },
        { path: 'blog', name: 'Blog', component: Blog },
        { path: 'blog/:id', name: 'BlogContent', component: BlogContent },
        { path: 'feed', name: 'Feed', component: Feed }
      ],
      meta: {
        title: 'Centerful'
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/login',
      name: 'Login',
      component: Logintify
    }
  ]
})
