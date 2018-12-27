<template>
  <div class="xpGoods">
    <div class="xpGoodsWrap">
      <common-nav-search :show-cart="showCart">
        {{ title }}
      </common-nav-search>
      <div
        ref="xpGoodsTop"
        class="xpGoodsTop">
        <div class="xpGoodsTopContent">
          <van-tabs
            v-if="tabbar.length"
            v-model="active"
            :swipe-threshold="2"
            @click="onItemClick" >
            <van-tab
              v-for="(item,index) in tabbar"
              ref="tabItem"
              :selected="index==currentIndex"
              :key="item.id"
              :id="item.id"
              :title="item.catName"
            />
          </van-tabs>
        </div>
      </div>
      <div
        ref="xpStoryContent"
        class="xpStoryContent">
        <div>
          <ul
            v-if="goodsListData.length"
            class="goodsContainer">
            <li
              v-for="item in goodsListData"
              :key="item.id">
              <common-img-prices
                :prices-data="item"
                :left="true" />
            </li>
            <li v-if="(noMore&&goodsListData.length%2!==0)||(goodsListData.length<20&&goodsListData.length>0&&goodsListData.length%2!==0)">
              <div class="moreTip">
                更多新品<br>正在研发中...
              </div>
            </li>
          </ul>
          <common-empty
            v-if="!noMore&&!goodsListData.length"
            :empty-obj="emptyObj" />
          <divider v-if="noMore"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonImgPrices from '~/components/commonImgPrices/CommonImgPrices'
import CommonEmpty from '~/components/commonEmpty/CommonEmpty'
import { goodsListData } from '~/util/const'
import { goodsList } from '~/util/netApi'
import { config } from '~/util/config.js'
import BScroll from 'better-scroll'
import { storage } from '~/util/storage'
export default {
  name: 'Goods',
  components: {
    CommonImgPrices,
    CommonEmpty
  },
  data() {
    return {
      imageUrl: config.imageUrl,
      active: 1,
      tabbar: [],
      title: '',
      goodsListData: [],
      currentList: [],
      page: 1,
      categoryId: '',
      noMore: false,
      showCart: false,
      currentIndex: 1,
      emptyObj: {
        emptyImg: '/images/commentEmptyGoods.png',
        emptyBold: '暂无商品',
        emptyP: '此类商品暂未上架，星品君正在努力挖掘中..',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  head() {
    return {
      title: `${this.title} - 星品优汇商城`
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    onItemClick(index) {
      this.categoryId = this.$refs.tabItem[index].$el.id
      this.page = 1
      this.goodsListData = []
      this.noMore = false
      this.getGoodsList(this.categoryId, this.page)
      this.scroll.refresh()
    },
    getGoodsList(categoryId, page) {
      const param = {
        page: page,
        rows: 20,
        categoryId: categoryId
      }
      this.$http(this, goodsList, param).then(res => {
        this.goodsListData = this.goodsListData.concat(res.data.body.list)
        this.scrollInit()
        if (this.page !== 1 && res.data.body.list.length === 0) {
          this.scroll.finishPullUp()
          this.noMore = true
        }
      })
    },

    scrollInit() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.xpStoryContent, {
          scrollY: true,
          click: true,
          pullUpLoad: {
            threshold: -50,
            moreTxt: '加载更多',
            noMoreTxt: '没有更多数据了'
          },
          bounce: {
            top: false,
            bottom: true
          }
        })
        this.scroll.on('pullingUp', () => {
          this.page++
          this.getGoodsList(this.categoryId, this.page)
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    },
    initData() {
      let data = storage.getLocalStorage(goodsListData)
      let index = this.$route.params.index
      let innerIndex = this.$route.params.innerIndex
      let all = data[index].children[innerIndex]
      this.title = all.catName
      all.catName = '全部'
      this.tabbar.push(all)
      this.currentList = data[index].children[innerIndex].children
      for (let i = 0; i < this.currentList.length; i++) {
        this.tabbar.push(this.currentList[i])
      }
      this.categoryId = this.tabbar[this.currentIndex].id
      this.getGoodsList(this.categoryId, this.page)
    }
  }
}
</script>
<style lang="stylus" scoped>
.xpGoods
  height 100vh
  padding-top 202px
  background #f5f5f5
  .xpGoodsWrap
    height 100%
  .xpGoodsTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 96px
    z-index 999999
    padding 0 50px
    background-color #fff
  .xpStoryContent
    height 100%
    background-color #fff
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
  background-color #fff
  border-top 1px solid #e6e6e6
  li
    padding 100px 0
    flex 1
    text-align center
    border-bottom 1px solid #e6e6e6
  li:nth-child(2n)
    border-left 1px solid #e6e6e6
  .emptyBox
    width 3.395556rem
.border-bottom::before
  z-index 9999
</style>
