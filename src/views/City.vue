<template>
    <div>
    <van-index-bar :index-list="indexList">
        <div v-for="(data,index) in datalist" :key="index" >
            <van-index-anchor :index="data.index">{{data.index}}</van-index-anchor>
            <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleClick(item)" />
        </div>
    </van-index-bar>
    </div>
</template>
<script>
import vue from 'vue'
import http from '@/util/http'
import { mapMutations, mapState } from 'vuex'
import { IndexBar, IndexAnchor, Cell } from 'vant'
vue.use(IndexBar)
vue.use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      indexList: [],
      datalist: []
    }
  },
  mounted () {
    http.request({
      url: '/gateway?k=6373009',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.dataFilter(res.data.data.cities)
    })
  },
  methods: {
    dataFilter (cities) {
      var newArr = []
      for (var i = 65; i < 91; i++) {
        newArr.push(String.fromCharCode(i))
      }
      console.log(newArr)
      var cityArr = []
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < newArr.length; i++) {
        var temparr = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === newArr[i])
        temparr.length && cityArr.push({
          index: newArr[i],
          list: temparr
        })
        temparr.length && this.indexList.push(newArr[i])
      }
      this.datalist = cityArr
      console.log(this.datalist)
    },
    handleClick (item) {
      this.setcityName(item.name)
      this.setcityId(item.cityId)
      this.$router.back()
      console.log(this.cityId, this.cityName)
    },
    ...mapMutations('city', ['setcityName', 'setcityId'])
  },
  computed: {
    ...mapState('city', ['cityId', 'cityName'])
  }
}
</script>
