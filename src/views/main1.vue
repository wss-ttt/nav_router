<template>
	<div class="wrapper">
		<v-header></v-header>
		<div class="sidebar">
			<el-menu class="sidebar-el-menu"
			 background-color="#545c64"
			 text-color="#fff"
			 active-text-color="#ffd04b"
			 :default-active="this.$route.name"
			 router>
				<!--循环的是items中的数据-->
				<!--<el-menu-item v-for="(item,index) in items" 
					:index="item.index" 
					:key="item.index">
					<i :class="item.icon"></i>
					<span>{{item.title}}</span>
				</el-menu-item>-->
				<!--循环路由表中的数据-->
				<el-menu-item v-for="(item,index) in $router.options.routes[1].children"
				 :index="item.path"
				 :key="item.path">
					<i class="el-icon-location"></i>
					<span>{{item.meta.title}}</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import vHeader from './Header.vue'
	export default {
		name: '',
		data() {
			return {
				items: [{
						icon: 'el-icon-menu',
						index: '/home', // 要和route中的path一样 否则路由匹配不上
						title: '首页',
						name: 'shouye'
					},
					{
						icon: 'el-icon-document',
						index: '/photo',
						title: '相册',
						name: 'photo'
					},
					{
						icon: 'el-icon-setting',
						index: '/blog',
						title: '博客',
						name: 'blog'
					},
					{
						icon: 'el-icon-location',
						index: '/news',
						title: '新闻',
						name: 'news'
					},
				]
			}
		},
		mounted(){
			console.log(this.$route.path);
		},
		components:{
			vHeader
		}
	}
</script>
<style>
	.sidebar {
		/*width: 250px;*/
		position: absolute;
		top: 50px;
		left: 0;
		bottom: 0;
		border: 1px solid #ddd;
	}
	
	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}
	
	.content {
		position: absolute;
		top: 50px;
		left: 250px;
		right: 0;
		bottom: 0;
		padding: 30px;
		background-color: #ccc;
		padding: 55px 30px 30px;
		overflow-y: auto;
	}
</style>