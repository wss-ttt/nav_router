export default {
  namespaced: true,
  state: {
    documentClientHeight: "", // 可视区域的高度
    mainTabs: [],
    mainTabsActiveName: "",
    sidebarFold: false,
    name: sessionStorage.getItem('name') || '' // 保存登录名
  },
  mutations: {
    updateMainTabs(state, tabs) {
      state.mainTabs = tabs;
    },
    updateMainTabsActiveName(state, name) {
      state.mainTabsActiveName = name;
    },
    updateDocumentClientHeight(state, documentClientHeight) {
      state.documentClientHeight = documentClientHeight;
    },
    updateSidebarFold(state, sidebarFold) {
      state.sidebarFold = sidebarFold;
    },
    updateName(state, name) {
      // 解决页面刷新数据丢失问题
      sessionStorage.setItem('name', name)
      state.name = name;
    }
  }
};
