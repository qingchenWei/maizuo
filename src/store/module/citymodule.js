const module = {
  namespaced: true,
  state: {
    cityName: '北京',
    cityId: '110100'
  },
  mutations: {
    setcityName (state, name) {
      state.cityName = name
    },
    setcityId (state, id) {
      state.cityId = id
    }
  },
  actions: {

  }

}
export default module
