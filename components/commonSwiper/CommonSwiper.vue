<template>
  <div
    v-if="swiperData.length"
    class="xpSwiper">
    <div
      v-swiper:mySwiper="swiperOption"
      ref="swpierWrap"
      class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="item in swiperData"
          :key="item.id"
          class="swiper-slide"
        >
          <img
            :src="imageUrl+item.value"
            alt="">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { config } from '~/util/config.js'
export default {
  name: 'CommonSwiper',
  props: {
    swiperData: Array,
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: config.imageUrl,
      swiperOption: {
        loop: true,
        lazy: {
          loadPrevNext: true
        },
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.xpSwiper
  width 100%
  height 1125px
  margin-bottom 100px
</style>
<style lang="stylus">
.xpSwiper
  .swiper-container
    width 100%
    height 100%
    .swiper-slide
      img
        width 100%
        height 1125px
      .lazyImg[lazy=loading]
        width 400px
        height 400px
        margin 350px auto
        display block
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet
    margin 10px
  .swiper-pagination-bullet
    border-radius 0
    width 23px
    height 6px
    display inline-block
    border-radius 100%
    background #fff
    opacity 0.44

  .swiper-pagination-bullet-active
    background #BA825A
    opacity 1
</style>
