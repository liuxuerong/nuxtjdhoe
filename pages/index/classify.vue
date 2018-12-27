<template>
  <div class="xpClassify">
    <common-header :is-scan="false">分类</common-header>
    <div
      ref="xpClassifyWrap"
      class="xpClassifyWrap">
      <ul
        v-if="classfiyData.length"
        class="xpClassifyWrapUl">
        <li
          v-for="(item,index) in classfiyData"
          :key="index"
          :item="item"
          class="xpClassifyWrapli">
          <div
            class="top"
            @click="changeToggle(index)">
            <div class="name">
              <p class="title">{{ item.catName }}</p>
              <p class="subTitle">{{ item.appCode }}</p>
            </div>
            <img
              v-lazy="imageUrl+item.appIcon"
              alt="">
          </div>
          <ul
            :class="{active:showIndex==index}"
            class="classifyDetails">
            <li
              v-for="(goods,innerIndex) in item.children"
              :key="goods.id"
              class="border-bottom">
              <nuxt-link
                :to="`/goods/${index}/${innerIndex}`"
                class="nav">{{ goods.catName }}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { goodsListData } from '~/util/const'
import { GOODSLISTDATA } from '~/store/mutations-types'
import { categoryTree } from '~/util/netApi'
import { config } from '~/util/config.js'
import { storage } from '~/util/storage'
import { mapMutations } from 'vuex'
export default {
  name: 'Classify',
  async asyncData({ app }) {
    let res = await app.$http(app, categoryTree)
    return {
      classfiyData: res.data.body
    }
  },
  data() {
    return {
      imageUrl: config.imageUrl,
      showIndex: 0,
      classfiyData: [],
      date: Date.now()
    }
  },
  serverCacheKey() {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 1000)
  },
  head: {
    title: '分类 - 星品优汇商城'
  },
  mounted() {
    this.scrollInit()
    this[GOODSLISTDATA](this.classfiyData)
  },
  methods: {
    ...mapMutations([GOODSLISTDATA]),
    changeToggle(index) {
      if (index === this.showIndex) {
        this.showIndex = null
      } else {
        this.showIndex = index
      }
      this.scrollInit()
    },
    scrollInit() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.xpClassifyWrap, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
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
  .xpClassify
    padding-top 200px
    height 100vh
    .xpClassifyWrap
      padding 0 50px
      height 100%
    .xpClassifyWrapUl
      padding-bottom 100px
    .xpClassifyWrapli
      width 100%
      margin-bottom 60px
      .top
        width 100%
        height 300px
        background-color #F5F5F5
        display flex
        align-items center
        justify-content space-around
        img
          width 320px
          height 260px
        .name
          min-width 260px
          text-align center
          .title
            color #333333
            font-size 56px
            line-height 80px
          .subTitle
            color #999999
            font-size 46px
            line-height 60px
    .xpClassifyWrapli:nth-child(2n)
      .top
        flex-direction row-reverse
  .classifyDetails
    transform scale(1,0)
    overflow hidden
    height 0
    transition all 0.3s ease
    transform-origin 0 0
    li
      line-height 148px
      font-size 46px
      width 100%
      .nav
        color #333
        width 100%
        position relative
        display inline-block
      .nav:before
        border: solid 0.017778rem #B3B3B3;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 0.177778rem;
        position: absolute;
        transform: translateY(-50%) rotate(45deg);
        width: 0.22444rem;
        height: 0.22444rem;

  .classifyDetails.active
    height auto
    transform scale(1,1)
    transition all 0.3s ease
</style>
