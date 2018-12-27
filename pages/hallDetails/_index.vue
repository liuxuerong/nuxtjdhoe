<template>
  <div class="hallDetailsContainer">
    <common-nav-header
      v-if="experienceObj"
      :title="experienceObj.categoryName" />
    <div
      v-if="experienceObj"
      ref="hallDetails"
      class="hallDetails">
      <img
        ref="zoomImg"
        :src="imageUrl+experienceObj.experienceCoverImage"
        alt="">
      <div
        v-for="(item,index) in experienceObj.experienceGoods"
        ref="tag"
        :key="item.goodsId"
        :style="{left:item.left,top:item.top}"
        class="tag"
        @click="showDetails(index)">
        <img
          src="~static/icons/hall_tag_icon.png"
          alt="">
      </div>
    </div>
    <div class="oneGoodsWrap">
      <van-popup
        v-model="showOne"
        position="bottom">
        <router-link
          v-if="itemObj"
          :to="'/details/'+itemObj.goodId">
          <div class="details">
            <img
              :src="imageUrl+itemObj.goodCoverImage"
              alt="">
            <div class="text">
              <span class="name">{{ itemObj.goodName }}</span>
              <span class="price">￥{{ itemObj.minPrice }}起</span>
              <p>{{ itemObj.summary }}</p>
            </div>
          </div>
        </router-link>
      </van-popup>
    </div>
    <div v-if="experienceObj">
      <van-popup
        v-model="show"
        position="bottom"
        class="goodsWrap">
        <div class="titlExa">样板间商品</div>
        <div
          v-for="(itemObj,index) in experienceObj.experienceGoods"
          :key="itemObj.goodId"
          class="details">
          <router-link :to="'/details/'+itemObj.goodId">
            <img
              v-lazy="imageUrl+itemObj.goodCoverImage"
              alt="">
          </router-link>
          <div class="text">
            <p class="name">{{ itemObj.goodName }}</p>
            <div class="priceWrap">
              <span class="price">￥{{ itemObj.minPrice }}起</span>
              <em
                :class="{active:itemObj.collected==='1'}"
                class="collect"
                @click.stop="doCollection(index,itemObj.goodId)" />
            </div>
          </div>
        </div>

      </van-popup>
    </div>
    <div
      v-if="experienceObj"
      class="morePic">
      <nuxt-link
        :to="'/hallAtlas/'+(parseInt(index)+1)"
        class="link">更多图片</nuxt-link> <em @click="showAllDetails()">商品({{ experienceObj.experienceGoods.length }})</em></div>
  </div>
</template>

<script>
import { config } from '~/util/config.js'
import { mapState } from 'vuex'
import { experienceData } from '~/util/const'
import PinchZoom from '~/plugins/pinch-zoom'
import notice from '~/util/notice'

export default {
  name: 'HallDetails',
  components: {},
  data() {
    return {
      imageUrl: config.imageUrl,
      experienceObj: null,
      options: {},
      index: '',
      RealImgWidth: '',
      RealImgHeight: '',
      show: false,
      showOne: false,
      itemObj: null,
      title: '',
      params: {
        collectionType: 1
      }
    }
  },
  computed: mapState({
    experienceData: state => state.hall[experienceData]
  }),
  mounted() {
    this.getExperienceObj()
  },
  head() {
    return {
      title: `${this.title} - 星品优汇商城`
    }
  },
  methods: {
    async getExperienceObj() {
      this.index = this.$route.params.index
      this.experienceObj = await this.experienceData[this.index]
      this.title = this.experienceObj.categoryName
      this.$nextTick(() => {
        this.zoomInit()
        this.doPosition()
      })
    },
    zoomInit() {
      this.zoom = new PinchZoom(this.$refs.hallDetails, this.options)
    },
    doPosition() {
      let imgUrl = this.$refs.zoomImg.src
      let img = new Image()
      img.src = imgUrl
      img.onload = function() {
        this.RealImgWidth = img.width
        this.RealImgHeight = img.height
      }
      let items = this.experienceObj.experienceGoods
      let hallDetails = this.$refs.hallDetails
      let hallDetailsWidth = hallDetails.clientWidth
      let hallDetailsHeight = hallDetails.clientHeight
      for (let i = 0; i < items.length; i++) {
        let locate = items[i].locate.split(',')
        this.experienceObj.experienceGoods[i].left =
          (locate[0] / hallDetailsWidth) * 100 + '%'
        this.experienceObj.experienceGoods[i].top =
          (locate[1] / hallDetailsHeight) * 100 + '%'
      }
    },
    showDetails(index) {
      this.showOne = true
      for (let i = 0; i < this.$refs.tag.length; i++) {
        this.$refs.tag[i].classList.remove('active')
      }
      this.$refs.tag[index].classList.add('active')
      this.itemObj = this.experienceObj.experienceGoods[index]
    },
    showAllDetails() {
      this.show = true
    },
    doCollection(index, goodId) {
      let params = Object.assign({}, this.params, {
        collectionDataId: goodId
      })
      let fnType = Object.prototype.toString
        .call(this.$doCollection(this, params))
        .slice(8, -1)
      if (fnType === 'Promise') {
        this.$doCollection(this, params)
          .then(res => {
            if (res.data.code === 0) {
              this.experienceObj.experienceGoods[index].collected =
                this.experienceObj.experienceGoods[index].collected === '1'
                  ? '0'
                  : '1'
              let message =
                this.experienceObj.experienceGoods[index].collected === '0'
                  ? '取消成功'
                  : '收藏成功'
              notice.toast(this, message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
  .oneGoodsWrap >>> .van-popup--bottom
    background-color #f5f5f5
    z-index: 999999999 !important;
  .hallDetailsContainer
    position absolute
    height 100%
    width 100%
  .hallDetails
    position absolute
  .morePic
    color #fff
    font-size p2r(46)
    position absolute
    bottom 63px
    width 510px
    line-height 100px
    text-align center
    height 100px
    font-size 46px
    background:linear-gradient(-90deg,rgba(172,124,98,1),rgba(220,166,116,1));
    border-radius:50px;
    left 50%
    transform translateX(-50%)
    .link
      color #fff
    em
      border-left 1px solid #B08064
      padding-left 20px
  .tag
    width 300px
    height 300px
    position absolute
    transform translateX(-50%)
    transition all 0.5s
    img
      width 134px
      height 274px
      transform translateX(50%)
   .tag.active
      border 4px solid #fff
      background rgba(248,249,251,0.25)
      border-radius 50%
  .goodsWrap
    max-height 1376px !important
    height auto !important
    overflow-y auto
    background-color #f5f5f5
    padding 0 50px 70px
    border-top-left-radius 20px
    border-top-right-radius 20px
    z-index: 999999999 !important;
    .titlExa
      line-height 145px
      color #262626
      font-size 46px
    .details
      display flex
      margin-bottom 30px
      background-color #fff
      .text
        flex 1
        color #333
        .name
          height 166px
          color #262626
          line-height 166px
          font-size 46px
          font-weight 600
          ellipsis()
          width 90%
          vertical-align middle
        .priceWrap
          display flex
          justify-content space-between
          padding-right 60px
          align-items center
          .price
            font-size 46px
            font-weight 600
            display inline-block
            vertical-align middle
            height 100px
            line-height 100px
          .collect
            width 52px
            height 52px
            // margin-top 20px
            display inline-block
            bgImage("~/icons/Collection_icon")
            &.active
                bgImage("~/icons/Collection_icon_click")
      img
        width 260px
        height 260px
        margin-right 50px
.oneGoodsWrap
  .details
      padding 30px
      display flex
      margin-bottom 200px
      background-color #fff
      z-index: 999999999 !important;
      .text
        flex 1
        color #333
        .name
          display inline-block
          height 166px
          line-height 166px
          font-size 46px
          font-weight 600
          float left
          ellipsis()
          width 60%
          vertical-align middle
        .price
          font-size 40px
          font-weight 600
          display inline-block
          vertical-align middle
          height 166px
          line-height 166px
          float right
        p
          color #808080
          font-size 36px
          line-height 50px
          ellipsisM()
          -webkit-line-clamp: 2
          width 100%
          float left
      img
        width 310px
        height 310px
        margin-right 28px
</style>

<style lang="stylus">
.hallDetailsContainer
  .pinch-zoom-container
    height 100% !important
  .vux-popup-dialog
    background-color rgba(255,255,255,0)
</style>
