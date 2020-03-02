import Vue from 'vue'
import VueRouter from 'vue-router' // 路由核心模块

Vue.use(VueRouter) // 注册路由插件
// 路由映射表
const routes = [
  {
    path: '/film',
    component: () => import('@/views/Film'),
    // 重定向
    redirect: '/film/nowplaying',
    children: [
      {
        path: '/film/nowplaying',
        component: () => import('@/views/Nowplaying')
      },
      {
        path: '/film/comingsoon',
        component: () => import('@/views/Comingsoon')
      }
    ]
  },
  {
    path: '/cinema',
    component: () => import('@/views/Cinema')
  },
  {
    path: '/cinema/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/center',
    component: () => import('@/views/Center')
  },
  {
    path: '/film/:filmId',
    component: () => import('@/views/Detail')
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  // 重定向
  {
    path: '/',
    redirect: '/film'
  },
  // 访问路径找不到
  {
    path: '*',
    component: () => import('@/views/ErrorComponent')
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
