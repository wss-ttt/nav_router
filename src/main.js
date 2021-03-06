// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'
// 引入全局的css
import '@/assets/css/global.scss'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('hasLogin')
  if (token) {
    // 有token(也就是已经登录了)
    if(to.path === '/login') {
      // 在已经登录的情况下,再来访问login页面,就直接跳转到首页去
      next({ path: '/'})
    } else {
      // 在已经登录的情况下,访问其他其他页面,就直接进入到其他页面中去
      next()
    }
  } else {
    // 没有token(s)
    if (to.path === '/login') {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 挂载路由
  store, // 注入store
  components: { App },
  template: '<App/>'
})
