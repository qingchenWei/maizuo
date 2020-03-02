
const module = {
  namespaced: true,
  state: {
    isTabshow: true
  },
  mutations: {
    show (state) {
      state.isTabshow = true
    },
    hide (state) {
      state.isTabshow = false
    }
  },
  modules: {
  }
}
export default module
