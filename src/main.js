import Vue from 'vue'
import App from './App.vue'
import router from './router' // ./router/index
import store from './store'
import '@/util/filter' // 引入全局过滤器
import '@/util/directive' // 引入全局指令
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App) // app根组件
}).$mount('#app')
