import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    loggedInUser: {
      id: "",
      username: "",
      nickname: "",
      profilePicture: ""
    },
  },
  mutations: {
    authenticate(state){
      state.isAuthenticated = true;
    },
    setLoggedUser(state, payload){
      state.loggedInUser = payload.user;
    }
  },
  actions: {
    authenticate(context){context.commit("authenticate");},
    setLoggedUser(context, payload){
        context.commit("setLoggedUser", payload);
    }
  },
  modules: {

  },
  getters: {
    nickname(state){
      return state.loggedInUser.nickname;
    },
    profilePicture(state){
      return state.loggedInUser.profilePicture;
    }
  }
})
