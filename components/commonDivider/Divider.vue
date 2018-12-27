<template>
  <div class="divider">
    已经到达最底部
  </div>
</template>
<script>
export default {
  name: 'Divider'
}
</script>
<style lang="stylus" scoped>
  .divider
    width 100%
    height 140px
    line-height 140px
    text-align center
    font-size 36px
    color #E6E6E6
    background-color #F5F5F5
    position relative
  .divider:before,.divider:after
    position absolute
    content ''
    width 36%
    height 2px
    background-color #e6e6e6
    top 69px
  .divider:before
    left 0
  .divider:after
    right 0
</style>
