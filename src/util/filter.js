import vue from 'vue'
import moment from 'moment'
// 过滤数组对象中的电影主演
vue.filter('namefilter', (data) => {
  return data.map(item => item.name).join(' ')
})

vue.filter('dateFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
