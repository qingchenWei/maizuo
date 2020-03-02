
import http from '@/util/http'
const module = {
  namespaced: true,
  state: {
    cinemaList: []
  },
  mutations: {
    setCinema (state, data) {
      state.cinemaList = data
    }
  },
  actions: {
    getCinema (store, id) {
      http.request({
        url: `/gateway?cityId=${id}&ticketFlag=1&k=6798623`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log('影院', res.data.data.cinemas, id)
        store.commit('setCinema', res.data.data.cinemas) // 支持传参
      })
    }
  }

}
export default module
