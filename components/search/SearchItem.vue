<template>
  <div
    ref="searchItem"
    class="searchItem">
    <div>
      <ul
        v-if="goodsList.length"
        class="goodsContainer">
        <li
          v-for="item in goodsList"
          :key="item.id">
          <common-img-prices :prices-data="item" />
        </li>
        <li class="emptyBox"/>
      </ul>
      <common-empty
        v-else
        :empty-obj="emptyObj"
        class="commonEmpty" />
      <divider v-if="noMore"/>
    </div>
  </div>
</template>

<script>
import CommonImgPrices from '~/components/commonImgPrices/CommonImgPrices'
import CommonEmpty from '~/components/commonEmpty/CommonEmpty'
import BScroll from 'better-scroll'
import { goodsList } from '~/util/netApi'
import { config } from '~/util/config.js'
export default {
  name: 'Story',
  components: {
    CommonImgPrices,
    CommonEmpty
  },
  props: {
    searchHistoryStorage: Array,
    searchVal: ''
  },
  data() {
    return {
      imageUrl: config.imageUrl,
      goodsList: [],
      page: 1,
      noMore: false,
      emptyObj: {
        emptyImg: '/images/commentEmptySearch.png',
        emptyBold: '没有找到相关产品',
        emptyP: '没有找到关键字为“飞机大炮”的产品',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  watch: {
    searchHistoryStorage: {
      handler(val) {
        let searchVal = val[val.length - 1]
        if (searchVal !== val[val.length - 2]) {
          this.getGoodsList(searchVal, 1)
        }
      },
      deep: true
    }
  },
  mounted() {
    let searchName = this.searchHistoryStorage[
      this.searchHistoryStorage.length - 1
    ]
    this.getGoodsList(searchName, 1)
  },
  methods: {
    getGoodsList(searchName, page) {
      const param = {
        page: page,
        rows: 20,
        searchName: searchName
      }
      if (!this.noMore) {
        this.$http(this, goodsList, param).then(res => {
          this.goodsList = [...this.goodsList, ...res.data.body.list]
          this.scrollInit()
          this.emptyObj.emptyP = '没有找到关键字为“' + searchName + '”的产品'
          if (this.page !== 1 && res.data.body.list.length === 0) {
            this.scroll.finishPullUp()
            this.noMore = true
          }
        })
      }
    },
    scrollInit() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.searchItem, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
            bottom: true
          },
          pullUpLoad: {
            threshold: -50,
            moreTxt: '加载更多',
            noMoreTxt: '没有更多数据了'
          }
        })
        let _this = this
        this.scroll.on('pullingUp', function() {
          _this.page++
          let searchName =
            _this.searchHistoryStorage[_this.searchHistoryStorage.length - 1]
          _this.getGoodsList(searchName, _this.page)
          // _this.scrollInit()
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
    font-weight: 600;
.xpGoodsTop>>>.vux-tab-ink-bar
    background transparent
.xpGoodsTop>>>.vux-tab-ink-bar::before
  content ""
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 100%
.xpGoodsTop>>>.vux-tab-container
    height 106px
.xpGoodsTop>>>.vux-tab
    height 106px
.xpGoodsTop>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 46px
.xpGoods
  height 100%
  padding-top 202px
  background #f5f5f5
  .xpGoodsTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 120px
    z-index 9999999
    padding 0 50px
    background-color #fff
  .xpStoryContent
    height calc(100% )
  h1.title
    font-size 56px
  .topBgImg
    width 100%
    height 400px
    img
      width 100%
      height 100%
.goodsContainer
  display flex
  flex-wrap wrap
  justify-content space-around
  padding-top 150px
  background-color #fff
  li
    margin-bottom 250px
.border-bottom::before
  z-index 9999
.commonEmpty
  background-color #fff!important
.emptyBox
  margin 0 !important
  width 3.9rem
.searchItem
  height 100%
</style>
