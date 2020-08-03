export default {
  namespaced: true,
  state: {
  	documentClientHeight:'',
  	mainTabs:[],
    mainTabsActiveName:'',
    sidebarFold: false, // 侧边栏的折叠状态
    documentClientHeight: '', // 可视区域的高度
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
    }
  }
}