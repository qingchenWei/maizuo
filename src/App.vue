<template>
  <div>
    <tab v-show="isTabshow"></tab>
    <!-- 路由容器(基于slot封装) -->
      <transition name="app" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import tab from '@/components/Tabbar'
import { mapState } from 'vuex'
export default {
  computed: {
    // 从tabbar命名空间中直接找 isTabbarShow
    ...mapState('tabbar', ['isTabshow'])
  },
  components: {
    tab
  }
}
</script>
<style lang="scss">
  *{
    margin:0;
    padding: 0;
  }
  ul{
    list-style:none;
  }
    .app-enter-active {
    animation: aaa .5s;
  }
  .app-leave-active {
    animation: aaa .5s reverse;
  }
  @keyframes aaa {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }}
</style>
