import Vue from 'vue'
import Router from 'vue-router'
import Columns from '@/views/Columns.vue'
import Blog from '@/views/Blog.vue'
import Talk from '@/views/Talk.vue'
import Welcome from '@/views/Welcome.vue'

import BlogContent from '@/components/BlogContent.vue'
// import Edit from '@/views/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      component: Welcome,
      meta: {
        title: 'Centerful'
      }
    },
    {
      path: '/columns',
      name: 'Columns',
      component: Columns,
      meta: {
        title: 'Centerful'
      }
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
      meta: {
        title: 'Centerful'
      }
    },
    {
      path: '/blog/:id',
      name: 'BlogContent',
      component: BlogContent,
      meta: {
        title: 'Centerful'
      }
    },
    {
      path: '/talk',
      name: 'Talk',
      component: Talk,
      meta: {
        title: 'Centerful'
      }
    }
  ]
})
