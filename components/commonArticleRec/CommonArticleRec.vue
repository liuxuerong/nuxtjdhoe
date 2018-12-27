<template>
  <div class="commonArticleRec">
    <ul>
      <li
        v-for="item in articleRecommends"
        :key="item.id">
        <router-link
          :to="linkTo+item.id"
          class="routerDetailes">
          <img
            v-lazy="imageUrl+item.articleCoverImage"
            alt=""
            class="lazyImg">
          <p class="title">{{ item.title }} <em v-if="item.subTitle">|</em> {{ item.subTitle }}</p>
          <slot/>
          <div
            v-if="item.summary"
            class="summary">{{ item.summary }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { config } from '~/util/config.js'
export default {
  name: 'CommonArticleRec',
  props: {
    linkTo: String,
    articleRecommends: Array
  },
  data() {
    return {
      imageUrl: config.imageUrl
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
.commonArticleRec
  padding-top 118px
  padding-bottom 0.888889rem
  li
    min-height 750px
    .routerDetailes
      display inline-block
      width 100%
    img
      width 100%
      height 600px
     .title
      font-size 56px
      font-weight 600
      line-height 80px
      padding 40px 50px 30px
      color #333
      -webkit-line-clamp 2
      ellipsisM()
      margin-bottom 30px
    .summary
      color #808080
      font-size 36px
      line-height 50px
      padding 0 50px 80px
  .lazyImg[lazy=loading]
    width 400px
    height 400px
    margin 100px auto
    display block
</style>
