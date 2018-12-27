<template>
  <div
    v-if="swiperData.length"
    class="detailsCommentSwiper">
    <div
      v-swiper:mySwiper="swiperOption"
      class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item,i) in swiperData"
          :key="item.id"
          class="swiper-slide"
        >
          <div class="imgText">
            <div class="left">
              <p class="name">{{ item.memberName.substr(0, 3) + '****' + item.memberName.substr(7) }}</p>
              <p class="commentText">{{ item.comments }}
              </p>
            </div>
            <div class="commentImg">
              <div class="previewCon">
                <img
                  v-for="(itemImg,index) in list[i]"
                  :src="itemImg.src"
                  :key="itemImg.src"
                  alt=""
                  class="previewer-demo-img"
                  @click="show(i,index)">
                <div v-transfer-dom>
                  <previewer
                    ref="previewer"
                    :list="list[i]"
                    :options="options"/>
                </div>
              </div>
              <div class="commentImgNum">{{ list[i].length }}张</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '~/util/config.js'
import { ImagePreview } from 'vant'
// import { getList } from '@/func/preview'
export default {
  name: 'DetailsCommentSwiper',
  props: {
    goodsComment: Object
  },
  data() {
    return {
      imageUrl: config.imageUrl,
      swiperOption: {
        spaceBetween: 12,
        slidesPerView: 1.2
      },
      list: [],
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[
            index
          ]
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      },
      swiperData: []
    }
  },
  watch: {
    goodsComment(v) {
      console.log(v)
      const commemts = v
      if (commemts.totals) {
        this.swiperData = commemts.list
        this.comments = commemts
        this.list = getList(commemts.list)
      }
    }
  },
  mounted() {
    console.log(this.goodsComment)
    const commemts = this.goodsComment
    if (commemts.totals) {
      this.swiperData = commemts.list
      this.comments = commemts
      // this.list = getList(commemts.list)
    }
  },
  methods: {
    show(i, index) {
      this.$refs.previewer[i].show(index)
    }
  }
}
</script>

<style lang="stylus">
.detailsCommentSwiper
  .swiper-slide
    height 400px
    background rgba(255,255,255,1);
    padding 20px
    width 320px
  .commentImg>.previewCon
    width 100%
    height 100%
    overflow hidden
    img
      height 100%
      width 320px
.pswp__top-bar
  height 100px !important
  line-height 100px !important
.pswp__counter
  font-size 46px !important
  height 100px !important
  line-height 100px !important
.pswp__button--fs
  display none !important
.pswp
  z-index 19998 !important
.pswp__button--close
  display none !important
</style>

<style lang="stylus" scoped>
@import "~assets/styles/mixins.styl";
.detailsCommentSwiper
  height 400px
  padding 0 50px
  margin-bottom 34px
 .imgText
  display flex
  box-shadow 0px 0px 18px rgba(78,78,78,0.15)
  height 320px
  .left
    padding-left 30px
    flex 1
  .commentImg
    height 320px
    position relative
    width 320px
  .name
    font-size 40px
    height 124px
    line-height 124px
    font-weight 600
    color #262626
    width 80%
    ellipsis()
  .commentText
    color #262626
    font-size 36px
    line-height 60px
    ellipsisM()
    -webkit-line-clamp: 3
.commentImgNum
  position absolute
  top 20px
  right 20px
  z-index 30
  width 72px
  height 38px
  background rgba(0,0,0,0.5)
  border-radius 18px
  font-size 18px
  line-height 38px
  text-align center
  color #fff
</style>
