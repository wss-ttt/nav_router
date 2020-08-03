import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 处理点击重复菜单报错问题
const originalPush = Router.prototype.push // 缓存原型对象上的push方法
Router.prototype.push = function (location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect: '/home'
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/views/login.vue'], resolve)
		},
    {
    	path:'/',
    	name:'main5',
    	component: resolve => require(['@/views/main5.vue'], resolve),
    	children:[
    		{
    			path:'introduce',
    			name:'introduce',
    			meta:{
    				title:'项目介绍',
    				meta:false
    			},
    			component: resolve => require(['@/components/introduce.vue'], resolve),
    		},
    		{
    			path: 'home',
    			name:'home',
    			meta:{
    				title:'首页',
    				isTab:true,   // 首页不需要tab标签
    			},
          component: resolve => require(['@/components/home.vue'], resolve),
    		},
    		{
    			path: 'map',
    			name:'map',
    			meta:{
    				title:'地图',
    				isTab:true,
    			},
          component: resolve => require(['@/components/blog.vue'], resolve),
				},
				{
    			path: 'photo',
    			name:'photo',
    			meta:{
    				title:'相册',
    				isTab:true
    			},
          component: resolve => require(['@/components/photo.vue'], resolve),
    		},
    		{
    			path: 'system',
    			name:'system',
    			meta:{
    				title:'系统管理',
    				isTab:true
    			},
          component: resolve => require(['@/components/news.vue'], resolve),
          children:[
          	{
          		path:'nba',
          		name:'nba',
          		meta:{
          			title:'NBA',
          			isTab:true
          		},
          		component: resolve => require(['@/components/news/nba.vue'], resolve),
          	},
          	{
          		path:'football',
          		name:'football',
          		meta:{
          			title:'足球',
          			isTab:true
          		},
          		component: resolve => require(['@/components/news/football.vue'], resolve),
          	}
          ]
    		}
    	]
    }
  ]
})
