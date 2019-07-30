export default {
  namespaced: true,
  state: {
  	mainTabs:[],
  	mainTabsActiveName:''
  },
  mutations: {
  	updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    }
  }
}