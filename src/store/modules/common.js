export default {
  namespaced: true,
  state: {
  	documentClientHeight:'',
  	mainTabs:[],
  	mainTabsActiveName:''
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
    }
  }
}