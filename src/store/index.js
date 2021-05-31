import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, setToken, clearToken} from '../utils/auth'
import {getUserInfo, setUserInfo, clearUserInfo} from '../utils/user'
import {logout} from '../api/status'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: getToken(),
    userInfo: getUserInfo()
  },
  getters: {
    getToken: state => state.token,
    getUserInfo: state => state.userInfo
  },
  mutations: {
    setToken(state, {token, rememberMe}) {
      state.token = token
      setToken(token, rememberMe)
    },
    clearToken(state) {
      state.token = ''
      clearToken()
    },
    setUserInfo(state, {userInfo, rememberMe}) {
      state.userInfo = userInfo
      setUserInfo(userInfo, rememberMe)
    },
    clearUserInfo() {
      clearUserInfo()
    }
  },
  actions: {
    login(ctx, {token, userInfo, rememberMe}) {
      ctx.commit('setToken', {token, rememberMe})
      ctx.commit('setUserInfo', {userInfo, rememberMe})
    },
    logout(ctx) {
      logout(getToken())
      ctx.commit('clearToken')
      ctx.commit('clearUserInfo')
    }
  }
})

export default store
