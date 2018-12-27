<template>
  <div class="detailsOperate border-top">
    <div class="operateLeft">
      <span
        class="udesk"
        @click="contactService"/>
      <span
        :class="{active:collect}"
        class="collect"
        @click="doCollection(params)"/>
      <nuxt-link
        to="/cart"
        class="cart">
        <i
          v-show="cartNum != 0"
          class="num">{{ cartNum }}</i>
      </nuxt-link>
    </div>
    <ul class="operateRight">
      <li
        :class="{disabled:goodsStatus!=1}"
        class="border-left"
        @click="popUpShowBuy">立即购买</li>
      <li
        :class="{disabled:goodsStatus!=1}"
        class="border-left active"
        @click="popUpShow">加入购物车</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { cartNum, customerService } from '~/util/netApi'
import { storage } from '~/util/storage'
import { accessToken } from '~/util/const'
export default {
  name: 'DetailsOperate',
  props: {
    goodsItems: Array,
    goodsStatus: Number
  },
  data() {
    return {
      collect: false,
      params: null
    }
  },
  computed: mapState({
    details: state => state.details,
    maxCount: state => state.details.maxCount,
    cartNum: state => state.cart.cartNum,
    popupVisible: state => state.details.popupVisible
  }),
  watch: {
    $route(to, from) {
      if (to.name === 'Details') {
        this.$router.go(0)
      }
    },
    popupVisible: function(curval) {
      if (storage.getLocalStorage(accessToken)) {
        this.getCartNum()
      }
    }
  },
  mounted() {
    this.params = {
      collectionType: 1,
      collectionDataId: this.$route.params.goodsId
    }
    this.hasCollection(this.params)
    if (this.$cookies.get(accessToken)) {
      this.getCartNum()
    }
  },
  methods: {
    ...mapMutations(['changePopupVisible', 'changeCartNum', 'changeFrom']),
    hasCollection(params) {
      let fnType = Object.prototype.toString
        .call(this.$hasCollection(this, params))
        .slice(8, -1)
      if (fnType === 'Promise') {
        this.$hasCollection(this, params)
          .then(res => {
            this.collect = res.data.body
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    doCollection(params) {
      this.$doCollection(this, params)
        .then(res => {
          let message = this.collect ? '取消成功' : '收藏成功'
          Toast({
            message: message,
            position: 'bottom',
            duration: 1000
          })
          this.hasCollection(params)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCartNum() {
      this.$http(this, cartNum)
        .then(res => {
          this.changeCartNum(res.data.body)
        })
        .catch(err => {
          console.log(err)
        })
    },
    popUpShow() {
      if (this.goodsStatus === 1) {
        this.changeFrom(2)
        this.changePopupVisible(true)
      }
    },
    popUpShowBuy() {
      if (this.goodsStatus === 1) {
        this.changeFrom(3)
        this.changePopupVisible(true)
      }
    },
    // 联系客服
    contactService() {
      window.location.href = customerService
    }
  }
}
</script>

<style lang="stylus" scoped>
.detailsOperate
  height 146px
  line-height 146px
  display flex
  .operateLeft
    display flex
    width 485px
    .udesk
      flex 1
      background: url('~/icons/udesk_icon.png') no-repeat center center/38% 38%
    .collect
      flex 1
      background: url('~/icons/collection_icon.png') no-repeat center center/40% 40%
    .cart
      flex 1
      background: url('~/icons/cart_icon.png') no-repeat center center/36% 40%
      position relative
      .num
        position absolute
        width 46px
        height 46px
        line-height 46px
        text-align center
        border-radius 50%
        background-color #D54B4B
        color #fff
        top 0
        transform translate(-50%,50%)
        right 0
    .collect.active
      background: url('~/icons/collection_icon_active.png') no-repeat center center/40% 40%
  .operateRight
    flex 1
    display flex
    li
      flex 1
      font-size 46px
      color #BA825A
      text-align center
    li.active
      background-color #F0F0F0
    li.disabled
      color #CCCCCC
</style>
