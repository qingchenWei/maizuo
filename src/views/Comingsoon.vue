<template>
  <div>
    <ul class="box">
      <li v-for="data in datalist" :key="data.filmId" @click="handleClick(data)">
        <img :src="data.poster" alt="">
        <div>
          <h3>{{data.name}}</h3>
          <p>主演：<span>{{data.actors | namefilter }}</span></p>
          <p>上映时间：<span>{{data.premiereAt | dateFilter}}</span></p>
        </div>
      </li>
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
  mounted () {
    fetch(`https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=2887697`, {
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
  },
  computed: {
    ...mapState('city', ['cityId'])
  }
}
</script>
<style scoped lang="scss">
  .box{
    li{
      margin-top: 20px;
      overflow: hidden;
      img{
            float: left;
            width: 80px;
            height: 120px;
            margin-left: 10px;
          }
      div{
        float: left;
        width: 267px;
        p{
          margin-top: 10px;
          line-height: 20px;
          width: 250px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }
      }

      }
    }

</style>
