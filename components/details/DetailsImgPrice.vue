<template>
  <div class="detailsImgPrice">
    <img
      :src="imageUrl+goods.coverImage"
      alt="">
    <div class="right">
      <div class="name">{{ goods.name }}</div>
      <div class="price">
        <span class="minPrice">￥{{ nowPrice }}</span>
        <del class="marketPrice">市场价￥{{ goods.marketPrice }}</del>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '~/util/config.js'
import { mapState } from 'vuex'
export default {
  name: 'DetailsImgPrice',
  components: {},
  props: {
    goods: Object
  },
  data() {
    return {
      imageUrl: config.imageUrl
    }
  },
  computed: mapState({
    nowPrice: state => state.details.nowPrice
  })
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'

.detailsImgPrice
  padding 50px
  display flex
  img
    width 240px
    height 240px
  .right
    flex 1
    margin-left 53px
    .name
      color #262626
      font-size 46px
      height 120px
      line-height 120px
      font-weight 600
      ellipsis()
    .price
      margin-top 20px
      .minPrice
        color #262626
        font-weight 600
        font-size 56px
        line-height 80px
        margin-right 36px
      del
        text-decoration line-through
        color #CCCCCC
        font-size 30px
</style>
