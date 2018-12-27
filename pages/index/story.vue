<template>
  <div class="xpStory">
    <common-header
      ref="commonHeader"
      :is-scan="false">
      故事
    </common-header>
    <van-tabs
      v-model="active"
      @click="onItemClick">
      <van-tab
        v-for="(item,index) in tabbar"
        :key="index"
        :title="item.name" />
    </van-tabs>
    <div
      ref="xpStoryContent"
      class="xpStoryContent">
      <div>
        <!-- 五星推荐 -->
        <common-article-rec
          v-if="storyRecom.length"
          v-show="storyRecomFlag"
          :article-recommends="storyRecom"
          :link-to="linkTo" />
        <!-- 品质生活 -->
        <common-article-rec
          v-if="storySub.length"
          v-show="storySubFlag"
          :article-recommends="storySub"
          :link-to="linkTo" />
        <common-article-rec
          v-if="brandListData.length"
          v-show="brandListDataFlag"
          :article-recommends="brandListData"
          :link-to="brandDetailsLink" />
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '~/util/config'
import { storyRecom, storySub, brandList } from '~/util/netApi'
import BScroll from 'better-scroll'
import CommonArticleRec from '~/components/commonArticleRec/CommonArticleRec'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Story',
  components: {
    CommonArticleRec
  },
  async asyncData({ app }) {
    let [res1, res2, res3] = await Promise.all([
      app.$http(app, brandList),
      app.$http(app, storySub),
      app.$http(app, storyRecom)
    ])
    return {
      brandListData: res1.data.body.articles,
      storySub: res2.data.body.articles,
      storyRecom: res3.data.body.articles
    }
  },
  data() {
    return {
      active: 0,
      imageUrl: config.imageUrl,
      articles: [],
      title: '五星推荐 - 星品优汇商城',
      brandListData: [],
      storyRecom: [],
      storySub: [],
      brandListDataFlag: false,
      storyRecomFlag: true,
      storySubFlag: false,
      linkTo: '/storyDetails/',
      brandDetailsLink: '/brandDetails/',
      tabbar: [
        {
          name: '五星推荐'
        },
        {
          name: '品质生活'
        },
        {
          name: '国际品牌'
        }
      ]
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  computed: mapState({
    token: state => state.login.token
  }),
  mounted() {
    this.scrollInit()
  },
  updated() {
    this.$nextTick(function() {
      let img = this.$refs.xpStoryContent.getElementsByTagName('img')
      let count = 0
      let length = img.length
      if (length) {
        let timer = setInterval(() => {
          if (count === length) {
            this.scrollInit()
            clearInterval(timer)
          } else if (img[count].complete) {
            count++
          }
        }, 16)
      }
    })
  },
  methods: {
    onItemClick(index) {
      this.brandListDataFlag = false
      this.storyRecomFlag = false
      this.storySubFlag = false
      if (index === 0) {
        this.title = '五星推荐 - 星品优汇商城'
        this.storyRecomFlag = true
      } else if (index === 1) {
        this.title = '品质生活 - 星品优汇商城'
        this.storySubFlag = true
      } else if (index === 2) {
        this.title = '国际品牌 - 星品优汇商城'
        this.brandListDataFlag = true
      }
      this.scroll.refresh()
      this.scroll.scrollTo(0, 0, 0)
    },
    scrollInit() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.xpStoryContent, {
          scrollY: true,
          click: true,
          bounce: {
            top: false,
            bottom: true
          }
        })
      } else {
        this.scroll.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.xpStory
  height 100vh
  padding-top 136px
  padding-bottom 148px
  .top
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 136px
    z-index 999999
  .xpStoryContent
    height 100%
  h1.title
    font-size 56px
  .topBgImg
    width 100%
    height 400px
    img
      width 100%
      height 100%
</style>
