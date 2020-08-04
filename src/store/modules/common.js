export default {
  namespaced: true,
  state: {
  	documentClientHeight:'',
  	mainTabs:[],
    mainTabsActiveName:'',
    sidebarFold: false, // 侧边栏的折叠状态
    documentClientHeight: '', // 可视区域的高度
    name: '', // 保存登录名
    hasLogin: false, // 表示是否已经登录了
  },
  mutations: {
  	updateMainTabs (state, tabs) {
      state.mainTabs = tabs;
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name;
    },
    updateDocumentClientHeight(state,documentClientHeight){
    	console.log('updateDocumentClientHeight--mutations');
    	state.documentClientHeight = documentClientHeight;
    },
    updateSidebarFold(state, sidebarFold) {
      state.sidebarFold = sidebarFold
    },
    updateDocumentClientHeight(state, documentClientHeight) {
      state.documentClientHeight = documentClientHeight
    },
    updateName(state, name) {
      state.name = name
    },
    updateHasLogin(state, hasLogin) {
      state.hasLogin = hasLogin
    }
  }
}