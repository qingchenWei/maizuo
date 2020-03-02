<template>
  <div>
    <div>
      <van-search
        v-model="searchVal"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
    <div class="list" v-show="searchVal">
      <ul v-if="countlist.length">
        <li v-for="data in countlist" :key="data.cinemaId" >
          <h4>{{data.name}}</h4>
          <p>{{data.address}}</p>
        </li>
      </ul>
      <div v-else>
        没有找到匹配的影院
      </div>
    </div>
    </div>
    <van-list v-show="!searchVal">
    <van-cell v-for="item in beginlist" :key="item.name" :title="item.name" />
    </van-list>
  </div>
</template>
<script>
import vue from 'vue'
import { Search, List, Cell } from 'vant'
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
vue.use(List)
vue.use(Cell)
vue.use(Search)
export default {
  data () {
    return {
      searchVal: ''
    }
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']),
    ...mapActions('cinema', ['getCinema']),
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    this.hide()
    if (this.cinemaList.length === 0) {
      this.getCinema()
    }
  },
  computed: {
    ...mapState('cinema', ['cinemaList']),
    beginlist () {
      return this.cinemaList.slice(0, 5)
    },
    countlist () {
      return ((this.cinemaList.filter(item => item.name.includes(this.searchVal) || item.name.includes(this.searchVal.toUpperCase()) || item.name.includes(this.searchVal.toLowerCase()) || item.address.includes(this.searchVal) || item.address.includes(this.searchVal.toUpperCase()) || item.address.includes(this.searchVal.toLowerCase()))))
    }
  },
  destroyed () {
    this.show()
  }
}
</script>
<style lang="scss">
.list{
  padding: 20px;
  line-height: 40px;
  padding-top: 0;
  p{
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
}
</style>
