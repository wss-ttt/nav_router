import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect: '/introduce'
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
    				isTab:false
    			},
    			component: resolve => require(['@/views/modules/introduce.vue'], resolve)
				},
				{
					path: 'table',
					name: 'table',
					meta: {
						title: 'Table',
						isTab: true
					},
					component: resolve => require(['@/views/modules/table.vue'], resolve)
				},
				{
					path: 'form',
					name: 'form',
					meta: {
						title: 'form',
						isTab: true
					},
					component: resolve => require(['@/views/modules/form.vue'], resolve)
				},
				{
					path: 'notify',
					name: 'notify',
					meta: {
						title: 'notify',
						isTab: true
					},
					component: resolve => require(['@/views/modules/notify.vue'], resolve)
				},
				{
					path: 'echarts',
					name: 'echarts',
					meta: {
						title: 'Echarts',
						isTab: true
					},
					component: resolve => require(['@/views/modules/echarts.vue'], resolve)
				},
    		{
    			path: 'map',
    			name:'map',
    			meta:{
    				title: '地图',
    				isTab: true,
    			},
          component: resolve => require(['@/views/modules/map.vue'], resolve),
				},
				{
					path: 'canvas',
    			name:'canvas',
    			meta:{
    				title: 'canvas',
    				isTab: true,
    			},
          component: resolve => require(['@/views/modules/canvas.vue'], resolve),
				},
    		{
    			path: 'system',
    			name:'system',
    			meta:{
    				title:'系统管理',
    				isTab:true
    			},
          component: resolve => require(['@/views/modules/system.vue'], resolve),
          children:[
          	{
          		path:'other',
          		name:'other',
          		meta:{
          			title:'其他介绍',
          			isTab:true
          		},
          		component: resolve => require(['@/views/modules/other.vue'], resolve),
          	}
          ]
    		}
    	]
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/views/login.vue'], resolve)
		},
		{
			path: '/404',
			name: '404',
			component: resolve => require(['@/views/common/404.vue'], resolve)
		},
		{
			path: '/test',
			name: 'test',
			component: resolve => require(['@/views/common/test.vue'], resolve)
		},
		{
			path: '*',
			redirect: '/404'
		}
  ]
})
