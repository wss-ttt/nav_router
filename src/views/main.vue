<template>
	<div class="wrapper">
		<v-header></v-header>
		<div class="sidebar">
			<el-menu class="sidebar-el-menu" 
				background-color="#545c64" 
				text-color="#fff" 
				active-text-color="#ffd04b" 
				:default-active="this.$route.path" 
				router>
				<el-menu-item v-for="(item,index) in items" 
					:index="item.index" 
					:key="item.index">
					<i :class="item.icon"></i>
					<span>{{item.title}}</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="content">
			<!--<router-view></router-view>-->
			<el-tabs v-model="mainTabsActiveName" closable>
				<el-tab-pane v-for="(item,index) in mainTabs" :label="item.title" :name="item.name" :key="item.name">
					<keep-alive>
						<router-view v-if="item.name === mainTabsActiveName"></router-view>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
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
						index: '/home',   // 要和route中的path一样 否则路由匹配不上
						title: '首页',
						name:'shouye'
					},
					{
						icon: 'el-icon-document',
						index: '/photo',
						title: '相册',
						name:'photo'
					},
					{
						icon: 'el-icon-setting',
						index: '/blog',
						title: '博客',
						name:'blog'
					},
					{
						icon: 'el-icon-location',
						index: '/news',
						title: '新闻',
						name:'news'
					},
				]
			}
		},
		watch:{
			$route: 'routeHandle'
		},
		methods:{
			// 监听路由的变化
			routeHandle(route){
				var tab = this.mainTabs.filter(item => item.name === route.name)[0];
				console.log('tab:',tab);
				// 如果不存在tab 就进行添加操作
				if(!tab){
					var tab = {
						name:route.name,       
						title:route.meta.title,
						path:route.path
					};
					this.mainTabs = this.mainTabs.concat(tab);
				}
				this.mainTabsActiveName = tab.name;
			}
		},
		computed:{
			mainTabs: {
		        get () { return this.$store.state.common.mainTabs },
		        set (val) { this.$store.commit('common/updateMainTabs', val) }
		    },
		    mainTabsActiveName: {
		        get () { return this.$store.state.common.mainTabsActiveName },
		        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
		    },
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
		overflow-y: auto;
		padding: 30px;
	}
</style>