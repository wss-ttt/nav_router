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
			<el-tabs v-model="mainTabsActiveName" closable @tab-remove="removeTab" @tab-click="selectedTabHandle">
				<el-tab-pane v-for="(item,index) in mainTabs" :label="item.title" :name="item.name" :key="item.name">
					<el-card>
						<router-view></router-view>
					</el-card>
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
		mounted(){
			console.log(this.$route);
			var tab={
				name:this.$route.name,
				title:this.$route.meta.title,
				path:this.$route.path
			};
			this.mainTabs = this.mainTabs.concat(tab);
			this.mainTabsActiveName = tab.name;
			 this.$router.push({name:'home'});
		},
		methods:{
			// 监听路由的变化
			routeHandle(route){
				console.log('111');
				// debugger;
				var tab = this.mainTabs.filter(item => item.name === route.name)[0];
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
			},
			// 单击tab标签 实现内容的切换
			selectedTabHandle(tab){
				tab = this.mainTabs.filter(item => item.name === tab.name);
				if (tab.length >= 1) {
		          this.$router.push({ name: tab[0].name });
		        }
			},
			removeTab(targetName){
				// console.log(targetName);   // 输出的name属性值  
				let tabs = this.mainTabs;
				let activeName = this.mainTabsActiveName;   // 当前活动的面板
				// 如果删除的是当前激活的tab,需要让其后一个tab进行active或者前一个
				if(activeName === targetName){
					tabs.forEach((tab,index)=>{
						if(tab.name === targetName){
							let nextTab = tabs[index+1]||tabs[index-1];
							if(nextTab){
								activeName = nextTab.name;
							}
						}
					})
				}
				// 删除tab标签页
				this.mainTabs = tabs.filter(tab=>tab.name!==targetName);
				// 设置active的tab
				this.mainTabsActiveName = activeName;
				this.$router.push({name:activeName});
			},
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
		padding: 55px 30px 30px;
		overflow-y: auto;
	}
</style>