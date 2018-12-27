<template>
  <div
    :class="{left:left}"
    class="commonImgPrices"
    @click="goodsDetail (pricesData.id)">
    <div
      v-if="img"
      class="imgContainer">
      <img
        v-lazy="imageUrl+img"
        alt="">
    </div>
    <p class="name">
      {{ pricesData.name }}
    </p>
    <p class="price">¥{{ pricesData.minPrice }}</p>
    <div class="imgBottom">
      <div
        :class="{hideCart:hideCart}"
        class="cart"/>
      <div
        v-if="pricesData.activityLabels&&pricesData.activityLabels.length>0"
        class="promotion">
        <span
          v-for="(item,index) in pricesData.activityLabels"
          :class="{gray:item.color==2}"
          :key="index"
          class="promotionItem">{{ item.labelName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '~/util/config'
// import dsbridge from 'dsbridge'
// import wx from 'weixin-js-sdk'
import { getUrlParam } from '~/util/params'

export default {
  name: 'CommonImgPrices',
  props: {
    pricesData: Object,
    left: {
      type: Boolean,
      default: false
    },
    hideCart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: config.imageUrl,
      img: null
    }
  },
  mounted() {
    if (this.pricesData.goodsPics) {
      this.getImg(this.pricesData.goodsPics)
    } else {
      this.getImg(this.pricesData.goodsImage)
    }
  },
  methods: {
    getImg(img) {
      if (typeof img === 'string') {
        this.img = img.split(',')[0]
      } else {
        this.img = img[0].value
      }
    },
    goodsDetail(goodsId) {
      this.platform = getUrlParam('platform')
      if (this.platform === 'wx') {
        this.$wx.miniProgram.navigateTo({
          url: '../productDetails/productDetails?id=' + goodsId
        })
      } else if (this.platform === 'i' || this.platform === 'a') {
        this.$dsbridge.call('goodsDetail', goodsId, function(v) {
          alert(v)
        })
      } else {
        this.$router.push(`/details/${goodsId}`)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
  .commonImgPrices.left
    text-align left
  .commonImgPrices
    text-align center
    font-size 40px
    width 382px
    font-weight 600
    display inline-block
    .imgContainer
      width 382px
      height 382px
      img
        width 100%
        height 100%
    .name
      height 98px
      line-height 98px
      ellipsis()
      font-size 46px
      color #333
    .price
      height 50px
      line-height 50px
      ellipsis()
      color #333
      font-size 40px
.imgBottom
  display flex
  align-items right
  flex-direction: row-reverse;
.left .promotion
  text-align left
  .promotionItem
    margin 23px 30px 0 0
.cart
  width 72px
  height 72px
  float right
  border 2px solid #C59370
  border-radius 50%
  background url("~/icons/orange_cart.png") no-repeat center center/60% 60%
.hideCart.cart
  display none

.promotion
  flex 1
  font-size 0
  text-align center
  .promotionItem
    font-size 30px
    color #D54B4B
    padding 0px 20px
    border 1px solid #D54B4B
    display inline-block
    height 50px
    line-height 50px
    margin 0 15px
    margin-top 23px
    font-weight normal
  .promotionItem.gray
    background-color  #F5F5F5
    border none
    color #999999
</style>
