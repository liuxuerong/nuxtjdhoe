<template>
  <div class="commonEmpty">
    <img :src="emptyObj.emptyImg" alt="">
    <p class="bold">{{emptyObj.emptyBold}}</p>
    <p>{{emptyObj.emptyP}}~</p>
    <router-link tag="button" :to="emptyObj.buttonRouter" class="router" v-if="emptyObj.buttonRouter">{{emptyObj.buttonText}}</router-link>
  </div>
</template>
<script>
export default {
  name: 'CommonEmpty',
  components: {},
  data () {
    return {

    }
  },
  props: {
    emptyObj: Object
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  .commonEmpty
    padding-top 300px
    text-align center
    background-color #fff
    height 100%
    img
      width 890px
      height 440px
    .bold
      color #4D4D4D
      font-weight 600
      font-size 46px
     p
      color #999999
      font-size 40px
      line-height 100px
    .router
      border 2px solid #BA825A
      height 120px
      line-height 120px
      font-size 40px
      color #BA825A
      padding 0 60px
      border-radius 4px
      background-color #fff
      // background #F5F5F5
      margin-top 92px
</style>
<style lang="stylus">
  body,html,#app
    width 100%
    height 100%

</style>
