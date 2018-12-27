<template>
  <div class="commonNavSearch">
    <div
      class="back"
      @click="goBack"/>
    <slot/>
    <router-link
      v-if="showCart"
      to="/cart"
      class="car fr">
      <span
        v-if="count!=0"
        class="num">{{ count }}</span>
    </router-link>
    <router-link
      to="/search"
      class="search fr"/>
  </div>
</template>
<script>
import { http } from '~/util/http'
import { cartNum } from '~/util/netApi'
import { storage } from '~/util/storage'
import { accessToken } from '~/util/const'
export default {
  name: 'CommonNavSearch',
  components: {},
  props: {
    title: String,
    showCart: {
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
    goBack() {
      this.$router.back(-1)
    },
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
  .commonNavSearch
    position fixed
    top 0
    height 120px
    line-height 120px
    text-align center
    text-indent 2.5em
    font-size 56px
    color #262626
    width 100%
    background-color #fff
    z-index 999999
    font-weight 600
    .back
      position absolute
      width 100px
      height 120px
      left 50px
      z-index 99999
    .back:before,.back:after
      width 0
      height 0
      content ''
      position absolute
      border 30px solid transparent
      border-right 30px solid #262626
      left -30px
      top 30px
    .back:after
      border-right 30px solid #fff
      left -24px
    .search
      width 60px
      height 60px
      bgImage("~/icons/search_black")
      vertical-align middle
      margin-top 20px
      margin-right 50px
    .car
      width 83px
      height 83px
      bgImage("~/icons/car")
      margin-top 13px
      position relative
      margin-right 50px
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
        transform translate(50%,-25%)
        right 0
        font-size 36px
</style>
