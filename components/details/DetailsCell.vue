<template>
  <div class="detailsCell">
    <van-cell
      :title="cellInfo.title"
      :value="cellInfo.value"
      is-link />
  </div>
</template>

<script>
import { Cell } from 'vant'
export default {
  name: 'DetailsCell',
  components: {
    'van-cell': Cell
  },
  props: {
    cellInfo: Object
  }
}
</script>

<style lang="stylus">
  .detailsCell
    height 146px
    padding 0 50px
    .van-cell
      height 100%
      padding 0
    .van-cell__title
      flex none
      span
        margin-right 110px
        display inline-block
        height 146px
        line-height 146px
        font-size 40px
        font-weight 600
    .van-cell__value
      text-align left
      span
        height 146px
        line-height 146px
        display inline-block
        color #262626
        font-size 40px
        font-weight normal
    .van-cell__right-icon
      height 146px
      line-height 146px
    .van-cell__right-icon::before
      border-color #808080
      width: 0.32444rem;
      height: 0.32444rem;
</style>
