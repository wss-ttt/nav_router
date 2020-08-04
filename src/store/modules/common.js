export default {
  namespaced: true,
  state: {
    documentClientHeight: "", // 可视区域的高度
    mainTabs: [],
    mainTabsActiveName: "",
    sidebarFold: false,
    name: "" // 保存登录名
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
      state.name = name;
    }
  }
};
