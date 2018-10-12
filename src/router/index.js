import Vue from 'vue'
import Router from 'vue-router'
import Columns from '@/views/Columns.vue'
import Blog from '@/views/Blog.vue'
import Talk from '@/views/Talk.vue'
import Edit from '@/views/Edit.vue'
import Normal from '@/views/Normal.vue'
import Login from '@/views/Login.vue'

import BlogContent from '@/components/BlogContent.vue'
import ColumnContent from '@/components/ColumnContent'
import ColumnOpen from '@/components/ColumnOpen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      component: Normal,
      children: [
        { path: '', name: 'Blog', component: Blog },
        { path: 'columns', name: 'Columns', component: Columns },
        { path: 'columns/:id', name: 'ColumnContent', component: ColumnContent },
        { path: 'columns/open/:id', name: 'ColumnOpen', component: ColumnOpen },
        { path: 'blog', name: 'Blog', component: Blog },
        { path: 'blog/:id', name: 'BlogContent', component: BlogContent },
        { path: 'talk', name: 'Talk', component: Talk }
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
