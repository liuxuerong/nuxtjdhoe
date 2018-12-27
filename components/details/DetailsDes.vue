<template>
  <div class="detailsDes">
    <!-- 商品详情 name 价格 活动标签 -->
    <h6 class="name">{{ goods.name }}</h6>
    <div class="price">
      <span class="minPrice">￥{{ goods.minPrice }}</span>
      <del class="marketPrice">市场价￥{{ goods.marketPrice }}</del>
    </div>
    <div class="activityLabel">
      <span
        v-for="(item,index) in activityLabel"
        :key="index"
        class="activityLabelItem">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsDes',
  props: {
    goods: {
      type: Object,
      default: () => {}
    },
    activityLabel: Array
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.detailsDes
  padding 0 50px
  .name
    font-size 56px
    color #262626
    font-weight 600
    margin-bottom 20px
    line-height 80px
  .price
    margin-bottom 40px
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
  .activityLabel
    span
      display inline-block
      color #D54B4B
      font-size 36px
      height 60px
      line-height 60px
      padding 0 16px
      border 1px solid #D54B4B
      margin-right 20px
</style>
