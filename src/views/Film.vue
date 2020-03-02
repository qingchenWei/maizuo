<template>
  <div>
    <div>
      <swiper :key="looplist.length">
        <div class="swiper-slide" v-for="data in looplist" :key="data.imgUrl">
          <img :src="data.imgUrl" alt="">
        </div>
      </swiper>
    </div>
    <div class="mynav">
      <ul>
        <router-link v-for="(item,index) in mylist" :key="index" :to="item[0]" tag="li" activeClass="active"><span>{{item[1]}}</span></router-link>
      </ul>
    </div>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
import swiper from '@/components/Swiper'
import http from '@/util/http'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      mylist: [['/film/nowplaying', '正在热映'], ['/film/comingsoon', '即将上映']],
      looplist: []
    }
  },
  components: {
    swiper
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  mounted () {
    // 引用封装的axios方法
    http.request({
      url: `/gateway?type=2&cityId=${this.cityId}&k=3529285`,
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      if (res.data.data) {
        this.looplist = res.data.data
      }
    })
  }

}
</script>
<style scoped lang="scss">
.swiper-slide{
  img{
    width: 100%;
    height: 212px;
  }
}
.mynav{
  height: 40px;
  position: relative;
  ul{
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content : space-between;
    li{
      width: 48%;
      list-style: none;
      text-align:center;
      line-height: 40px;

    }
    .active{
      color: red;
      span{
        padding: 5px;
        border-bottom: 3px solid red
      }
    }
  }
}
</style>
