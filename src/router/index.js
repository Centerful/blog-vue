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
import BlogContents from '@/views/blog/content/BlogContents.vue'


import Lab from '@/views/lab/Lab.vue'

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
        { path: 'columns/:_id', name: 'ColumnContent', component: ColumnContent },
        { path: 'columns/open/', name: 'ColumnOpen', component: ColumnOpen },
        { path: 'blog', name: 'Blog', component: Blog },
        { path: 'blog/:_id', name: 'BlogContent', component: BlogContent },
        { path: 'blog/:_id', name: 'BlogContents', component: BlogContents },
        { path: 'feed', name: 'Feed', component: Feed },
        { path: 'lab', name: 'lab', component: Lab }
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
      component: Login
    }
  ]
})
