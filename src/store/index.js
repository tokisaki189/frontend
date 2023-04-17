import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false,
    userID: null,
    isAdmin: false,
  },
  getters: {},
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    setID(state, value) {
      state.userID = value;
    },
    setAdmin(state, value) {
      state.isAdmin = value;
    },
  },
  actions: {},
  modules: {},
});
