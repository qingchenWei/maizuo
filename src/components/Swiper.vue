<template>
  <div class="swiper-container" :class="kerwinclass">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
  props: ['kerwindata', 'kerwinclass'],
  mounted () {
    // eslint-disable-next-line no-new
    new Swiper('.' + (this.kerwinclass ? this.kerwinclass : 'swiper-container'),
      this.kerwindata)
  }
}

</script>
