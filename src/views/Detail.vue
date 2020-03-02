<template>
  <div class="box" v-if="datalist" >
    <div class="iconfont icon-back btn"  @click="handleClick()"></div>
    <titl v-title="40" @back="handleClick()">
      {{datalist.name}}
    </titl>
    <img :src="datalist.poster" alt="">
    <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{datalist.name}}</span>
            <span>{{datalist.filmType.name}}</span>
          </div>
          <div class="film-grade">
            <span class="grade">{{datalist.grade}}</span>
            <span class="grade-text">分</span>
          </div>
        </div>
        <div class="film-category grey-text">
            {{datalist.category}}
        </div>
        <div class="show">
            {{datalist.premiereAt | dateFilter}}待定
        </div>
        <div class="runtime">
            {{datalist.nation}} | {{datalist.runtime}}分钟
        </div>
        <div :class="isActive?'synopsis':''">
          {{datalist.synopsis}}
        </div>
         <p class="showtext" @click="active()">展开</p>
        <div>
        </div>
        <div class="margin"></div>
      </div>
      <div class="act">
        <p style="padding:10px" >演职人员</p>
        <swiper :kerwindata="{
      slidesPerView: 3,
      spaceBetween: 10,
      freeMode: true
    }" kerwinclass="actor">
      <div class="swiper-slide" v-for="(data,index) in datalist.actors"
      :key="index" >
        <img :src="data.avatarAddress" class="img1"/>
        <p style="text-align:center">{{data.name}}</p>
        <p style="text-align:center">{{data.role}}</p>
      </div>
    </swiper>
     <div class="margin"></div>
     <h4 style="padding:10px" @click="isPhotoShow=true">剧照<span style="float:right">全部({{datalist.photos.length}})</span></h4>
    <swiper :kerwindata="{
      slidesPerView: 2,
      spaceBetween: 10,
      freeMode: true
    }" kerwinclass="photo">
      <div class="swiper-slide" v-for="(data,index) in datalist.photos" :key="data" @click="handlePreview(index)">
        <img :src="data" class="img2">
      </div>
    </swiper>
  </div>
    <photo v-show="isPhotoShow" :list="datalist.photos" @event="handlePreview($event,index)">
      <titl @back="handlePhotoShow">
        剧照 ( {{datalist.photos.length}} )
      </titl>
    </photo>
  </div>
</template>
<script>
import swiper from '@/components/Swiper'
import titl from '@/components/Title'
import http from '@/util/http'
import photo from './Detail/Photo'
import Vue from 'vue'
import { ImagePreview, Dialog } from 'vant'
Vue.use(ImagePreview).use(Dialog)
export default {
  data () {
    return {
      datalist: null,
      isActive: true,
      isPhotoShow: false
    }
  },
  beforeMount () {
    Dialog.confirm({
      title: '该影片没有排期',
      message: '弹窗内容',
      confirmButtonText: '同意',
      cancelButtonText: '拒绝'
    }).then(() => {
      // on confirm
      this.$router.back()
    }).catch(() => {
      // on cancel
    })
  },
  mounted () {
    http.request({
      url: `/gateway?filmId=${this.$route.params.filmId}&k=893882`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.datalist = res.data.data.film
      const nav = document.querySelector('nav')
      nav.style.display = 'none'
    })
  },
  methods: {
    handleClick () {
      this.$router.back()
    },
    active () {
      this.isActive = !this.isActive
      var p = document.querySelector('.showtext')
      p.innerHTML = this.isActive ? '展开' : '上拉'
    },
    handlePhotoShow () {
      this.isPhotoShow = false
    },
    handlePreview (index) {
      console.log('!11')
      ImagePreview({
        images: this.datalist.photos,
        startPosition: index, // 从0
        closeable: true,
        closeIconPosition: 'top-left',
        onClose () {
          // do something
        }
      })
    }
  },
  components: {
    swiper,
    photo,
    titl

  }
}
</script>
<style scoped lang="scss">
  .box{
    .margin{
      height: 20px;
      background: #eee
    }
    .btn{
       border-radius: 50%;
        width: 30px;
        height: 30px;
        background: white;
        opacity: .5;
        position: fixed;
        top: 10px;
        left: 10px;
      img{
        width: 30px;
        height: 30px;
      }
    }
    img{
      width: 100%;
      height: 232px;
    }
    .film-name{
      float: left;
    }
    .film-grade{
      float: right;
    }
    .runtime{
      margin-bottom: 20px
    }
    .synopsis{
      height:35px;
      overflow:hidden;
    }
    .showtext{
      text-align: center;
      line-height: 30px;
      color: rgb(207, 149, 74)
    }
    .swiper-slide{
      .img1{
        padding: 10px;
        width: 85px;
        height: 85px;
      }
      .img2{
         padding: 10px;
        height: 85px;
        width: 150px;
        margin-bottom:30px;
      }
    }
  }

</style>
