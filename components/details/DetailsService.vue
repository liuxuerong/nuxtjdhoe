<template>
  <div class="detailsService">
    <!-- 服务 -->
    <div class="name">服务</div>
    <ul class="serviceItem">
      <li
        v-for="(item ,index) in service"
        :key="index"
        class="border-bottom">
        <em class="dot"/>{{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DetailsService',
  components: {},
  data() {
    return {
      service: [
        '7天无理由退换货',
        '满99元全场包邮',
        '港澳台地区不包邮',
        '48小时极速退款',
        '五星级酒店供应商',
        '国际质量检测标准'
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
  .detailsService
    padding 0 50px
    display flex
    .name
      width 193px
      color #333333
      font-size 40px
      font-weight 600
      line-height 140px
    .serviceItem
      flex 1
      li
        height 140px
        line-height 140px
        color #262626
        font-size 40px
        font-weight normal
        display inline-block
        width 50%
        .dot
          display inline-block
          width 10px
          height 10px
          background-color #BA825A
          border-radius 50%
          vertical-align middle
          margin-right 30px
          margin-top -10px
</style>
