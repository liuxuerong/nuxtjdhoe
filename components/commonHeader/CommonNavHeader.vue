<template>
  <div class="commonNavHeader border-bottom" >
    <div
      class="back"
      @click.stop="goBack"/>
    {{ title }}
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'CommonNavHeader',
  components: {},
  props: {
    title: String
  },

  methods: {
    goBack() {
      if (this.$route.name !== 'HallAtlas') {
        this.$router.go(-1)
      } else {
        this.$router.push('/hall')
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
  .commonNavHeader
    position fixed
    top 0
    height 120px
    line-height 120px
    text-align center
    font-size 56px
    color #262626
    width 100%
    background-color #fff
    z-index 9999
    padding 0 200px
    font-weight 600
    ellipsis()
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

</style>
