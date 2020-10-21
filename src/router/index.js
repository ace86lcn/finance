import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Out from './modules/out'       //外部模块
import Inside from './modules/inside' //内部模块

Vue.use(VueRouter)

/**
 * hidden:              不在侧边栏 显示 meta里还有一个hidden
 * noLogin：            不需要登录
 * type:                inside
 * defaulNeedrefresh:   需要更新meta里的defaultActive
 * defaultActive
 */
const routes = [
  { path: '/login', name: 'login', hidden: true, meta: { title: '登录', noLogin: true }, component: () => import('../views/Login') },
  { path: '/forget-pwd/index', name: 'forget-pwd', hidden: true, meta: { title: '忘记密码', noLogin: true }, component: () => import('../views/ForgetPwd') },
  { path: '/404', name: '404', hidden: true, meta: { title: '404', noLogin: true }, component: () => import('../views/404') },
  { path: '*', hidden: true, redirect: { path: '/404' } },
  ...Out,
  ...Inside
]

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.hidden && to.meta.defaulNeedrefresh) {
    to.meta.defaultActive = from.fullPath
  }
  next()
  if(!store.state.token && !to.meta.noLogin) {
      alert('请您先登录')
      next('/login')
  } else {
      next()
  }
})

router.afterEach((to, from) => {
  let title = to.meta.title
  if (title) document.title = title
})

export default router
