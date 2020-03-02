<template>
  <nav>
    <ul>
      <router-link v-for="(item,index) in navlist" :key="index" :to="item[0]" tag="li" activeClass="active">
        <!-- 添加图标 -->
        <i class="iconfont" :class="item[2]"></i>
        <span>{{item[1]}}</span>
        </router-link>
    </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      navlist: [['/film/nowplaying', '电影', 'icon-video'], ['/cinema', '影院', 'icon-color'], ['/center', '中心', 'icon-bussinessman']]
    }
  }
}
</script>
<style lang="scss">
  .active{
    color:red;
  }
  nav{
    position: fixed;
    left:0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background: white;
    z-index: 11;
    ul{
      display: flex;
      justify-content : space-between;
      li{
        width:30%;
        line-height:25px;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
