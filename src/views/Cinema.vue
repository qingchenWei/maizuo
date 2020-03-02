<template>
  <div>
    <div class="title">
      <div class="left" @click="handleChangeCity('/city')">{{cityName}}</div>
      <div>影院</div>
      <div class="right">
        <i class="iconfont icon-search" @click="handleSearch"></i>
      </div>
    </div>
    <div class="select">
      <div @click="isShow=!isShow" :class="isShow?'active':''">{{current}}</div>
      <div>App订票</div>
      <div>最近去过</div>
    </div>
    <div class="area" v-show="isShow">
      <ul>
        <li
          v-for="item in arealist"
          :key="item"
          @click="handleClick(item)"
          :class="item==current?'active2':''"
        >{{item}}</li>
      </ul>
    </div>
    <div class="content" :style="{height:scrollHeight}">
      <ul>
        <li v-for="item in computedDatalist" :key="item.cinemaId">
          <h3>{{item.name}}</h3>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import { Toast } from 'vant'
import vue from 'vue'
import BetterScroll from 'better-scroll'
vue.use(Toast)
export default {
  data () {
    return {
      current: '全城',
      isShow: false,
      scrollHeight: '0px'
    }
  },
  beforeMount () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay: true, // 是否显示背景遮罩层
      duration: 0 // 不会消失
    })
  },
  mounted () {
    this.scrollHeight = document.documentElement.clientHeight - 80 - 50 + 'px'
    // 初始化betterscroll
    // eslint-disable-next-line no-new
    new BetterScroll('.content', {
      scrollbar: {
        fade: true,
        interactive: false // 1.8.0 新增
      },
      click: true // 支持click事件
    })

    // disptch 到 vuex中action
    console.log(this.cityId)
    if (this.cinemaList.length === 0) {
      this.$store.dispatch('cinema/getCinema', this.cityId).then(res => {
        console.log('异步结束，已经存到vuex')
        Toast.clear()
      })
    } else {
      console.log('cinema', '使用缓存')
      Toast.clear()
    }
  },
  computed: {

    // 所有区的计算属性
    ...mapState('city', ['cityName', 'cityId']),
    ...mapState('cinema', ['cinemaList']),
    arealist () {
      // 对象=》里面的某个属性
      var newarr = this.cinemaList.map(item => item.districtName)
      // 用set结构进行数组去重，array.from 吧类数组结构转换成数组加结构
      var arealist = ['全城', ...Array.from(new Set(newarr))]
      return arealist
    },
    // 根据不同地区，过滤出相应区域的影院
    computedDatalist () {
      // eslint-disable-next-line eqeqeq
      if (this.current == '全城') return this.cinemaList
      // eslint-disable-next-line eqeqeq
      return this.cinemaList.filter(item => item.districtName == this.current)
    }
  },
  methods: {
    ...mapActions('cinema', ['getCinema']),
    handleClick (data) {
      this.current = data
      this.isShow = !this.isShow
    },
    handleSearch () {
      this.$router.push('/cinema/search')
    },
    handleChangeCity (path) {
      if (path === '/city') {
        this.setCinema([])
      }
      this.$router.push(path)
    },
    ...mapMutations('cinema', ['setCinema'])
  }
}
</script>
<style lang="scss" scope>
.active {
  color: orange;
}
.active2 {
  border: 1px solid orange !important;
}
.title {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: white;
  line-height: 40px;
  div {
    flex: 1;
    text-align: center;
  }
  .left {
    text-align: left;
    margin-left: 20px;
  }
  .right {
    text-align: right;
    margin-right: 20px;
  }
}
.select {
  display: flex;
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px;
  z-index: 10;
  background: white;
  height: 40px;
  line-height: 40px;
  div {
    flex: 1;
    text-align: center;
  }
}
.content {
  position: absolute;
  top: 90px;
  z-index: 1;
  ul {
    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
.area {
  position: fixed;
  top: 90px;
  padding: 5px;
  background: white;
  width: 100%;
  z-index: 10;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 20%;
      padding: 3px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin: 3px;
    }
  }
}
</style>
