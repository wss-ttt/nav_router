import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect: '/home'
  	},
    {
    	path:'/',
    	name:'main',
    	component: resolve => require(['@/views/main.vue'], resolve),
    	children:[
    		{
    			path: '/home',
    			name:'home',
    			meta:{
    				title:'首页'
    			},
          component: resolve => require(['@/components/home.vue'], resolve),
    		},
    		{
    			path: '/blog',
    			name:'blog',
    			meta:{
    				title:'博客'
    			},
          component: resolve => require(['@/components/blog.vue'], resolve),
    		},
    		{
    			path: '/news',
    			name:'news',
    			meta:{
    				title:'新闻'
    			},
          component: resolve => require(['@/components/news.vue'], resolve),
    		},
    		{
    			path: '/photo',
    			name:'photo',
    			meta:{
    				title:'相册'
    			},
          component: resolve => require(['@/components/photo.vue'], resolve),
    		},
    	]
    }
  ]
})
