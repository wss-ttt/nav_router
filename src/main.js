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
  const token = store.state.common.hasLogin
  if (token) {
    next()
  } else {
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
  router,
  store,
  components: { App },
  template: '<App/>'
})
