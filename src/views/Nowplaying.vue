<template>
  <div>
    <ul class="box1">
      <li v-for="data in datalist" :key="data.filmId" @click="handleClick(data)">
        <img :src="data.poster" alt="">
        <div>
          <h3>{{data.name}}</h3>
          <p>观众评分：<span>{{data.grade}}</span></p>
          <p>主演：<span>{{data.actors | namefilter}}</span></p>
          <p>{{data.nation}} | {{data.runtime}} 分钟</p>
        </div>
      </li>
      <div>2223333333333333</div>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      datalist: []
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  mounted () {
    fetch(`https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=888988`, {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1582359998270582939824","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => res.json()).then(res => {
      this.datalist = res.data.films
      const nav = document.querySelector('nav')
      nav.style.display = 'block'
    })
  },
  methods: {
    handleClick (data) {
      this.$router.push('/film/' + data.filmId)
    }
  }
}
</script>
<style scoped lang="scss">
  .box1{
    li{
      margin-top:20px;
      height: 140px;
      width: 100%;
    }
    img{
      float: left;
      width: 79px;
      height: 120px;
      margin-left: 10px;
    }
    div{
      float: right;
      width: 267px;
      overflow: hidden;
      h3{
        line-height: 30px;
      }
      p{
        line-height: 20px;
        font-size: 16px;
      }
    }

  }

</style>
