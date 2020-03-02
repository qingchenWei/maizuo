import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './module/cinemamodule'
import tabbar from './module/tabmodule'
import city from './module/citymodule'
// 持久化
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    reducer (data) {
      return {
        city: data.city
      }
    }
  })],
  state: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    cinema,
    tabbar,
    city
  }
})
export default store
