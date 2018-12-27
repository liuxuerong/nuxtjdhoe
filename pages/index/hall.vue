<template>
  <div class="xpHall">
    <common-header>
      体验馆
    </common-header>
    <div
      v-swiper:mySwiper="swiperOption"
      ref="swpierWrap"
      class="swiper-container"
      style="height:75%">
      <div
        class="swiper-wrapper">
        <div
          v-for="(item,index) in swiperData"
          :key="item.id"
          class="swiper-slide"
        >
          <nuxt-link
            :to="'/hallDetails/'+index"
            class="navIndex">
            <img
              :src="imageUrl+item.experienceCoverImage"
              alt=""
              class="swiperImg">
            <div class="infoContainer">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="summary">{{ item.summary }}</div>
              </div>
              <div class="experienceGoods"><img
                src="~static/icons/outsidelabel_icon.png"
                alt="">{{ item.experienceGoods.length }}</div>
            </div>
        </nuxt-link></div>
      </div>
    </div>
  </div>
</template>
<script>
import { EXPERIENCES } from '~/store/mutations-types'
import { mapMutations } from 'vuex'
import { inforSpace } from '~/util/netApi'
import { config } from '~/util/config'
export default {
  name: 'Hall',
  data() {
    return {
      imageUrl: config.imageUrl,
      swiperData: [],
      experienceData: [],
      swiperOption: {
        direction: 'vertical',
        notNextTick: true,
        setWrapperSize: true,
        loopedSlides: 2,
        observeParents: true,
        slidesPerView: 1,
        autoHeight: true,
        loop: true
      }
    }
  },
  async asyncData({ app }) {
    let res = await app.$http(app, inforSpace)
    let experienceData = []
    let swiperData = []
    for (let i = 0; i < res.data.body.length; i++) {
      if (res.data.body[i].status === '1') {
        experienceData.push(res.data.body[i])
        if (res.data.body[i].top === '1') {
          swiperData.push(res.data.body[i])
        }
      }
    }
    return {
      swiperData,
      experienceData
    }
  },
  mounted() {
    this[EXPERIENCES](this.experienceData)
  },
  methods: {
    ...mapMutations([EXPERIENCES])
  },

  head: {
    title: '体验馆'
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
.xpHall
  height 100vh
  padding-top 136px
  padding-bottom 148px
  .swiperImg
    width 100%
    height 100%
    background #fff
  .infoContainer
    position absolute
    top 70px
    padding 50px
    color #fff
    display flex
    width 100%
    .left
      flex 1
      width 80%
      text-align left
      .title
        font-size 46px
        ellipsis()
      .summary
        display none
        ellipsis()
    .experienceGoods
      width 140px
      height 70px
      line-height 70px
      background rgba(255,255,255,0.25)
      border-radius 35px
      font-size 36px
      color #fff
      img
        width 30px
        height 30px
        margin-left 25px
        margin-right 20px
  .swiper-wrapper
    // height 75vh !important
  .swiper-slide
    width 100% !important
    overflow hidden
    .navIndex
      display block
      width 100%
      height 100%
.swiper-container
  width 100%
  overflow visible !important
</style>
<style lang="stylus">
.xpHall
  .swiper-slide-active
    .swiperImg
      transform scale(1.5,1.5)
      transition all 0.4s
    .infoContainer
      top auto
      bottom 0
      background linear-gradient(0deg,rgba(3,0,0,0.75),rgba(0,0,0,0))
    .left
      flex 1
      height 160px
      .title
        font-size 56px !important
        font-weight 600
      .summary
        display block !important
        font-size 36px
        line-height 60px
</style>
