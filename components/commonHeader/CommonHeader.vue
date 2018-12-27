<template>
  <div class="header">
    <!-- <div class="scan" v-if="isScan">
    </div> -->
    <router-link
      v-if="!isScan"
      to="/search"
      class="searchLink">
      <div class="search "/>
    </router-link>
    <slot/>
    <router-link
      to="/cart"
      class="car">
      <span
        v-if="count!=0"
        class="num">{{ count }}</span>
    </router-link>
  </div>
</template>
<script>
import { http } from '~/util/http'
import { cartNum } from '~/util/netApi'
import { storage } from '~/util/storage'
import { accessToken } from '~/util/const'
export default {
  name: 'CommonHeader',
  props: {
    isScan: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    if (storage.getLocalStorage(accessToken)) {
      this.getCartNum()
    }
  },
  methods: {
    getCartNum() {
      http(cartNum)
        .then(res => {
          this.count = res.data.body
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
.header
  height 136px
  line-height 100px
  padding 18px 50px
  position fixed
  width 100%
  background-color #fff
  z-index 9999
  top 0
  text-align center
  font-size 56px
  color #333
  border-bottom 1px solid #e6e6e6
  font-weight 600
  .scan
    width 60px
    height 60px
    bgImage("~/icons/scan")
    margin-right 40px
    vertical-align middle
    margin-top 10px
  .searchLink
    position absolute
    left 50px
  .search
    width 60px
    height 60px
    bgImage("~/icons/search_black")
    margin-right 40px
    margin-top 0
    vertical-align middle
    display inline-block
  .car
    width 60px
    top 20px
    right 50px
    height 60px
    bgImage("~/icons/car")
    margin-top 13px
    position absolute
    .num
      position absolute
      min-width 46px
      height 46px
      line-height 46px
      text-align center
      border-radius 50%
      background-color #D54B4B
      color #fff
      top -10px
      transform translate(50%,-25%)
      right -10px
      font-size 36px
</style>
