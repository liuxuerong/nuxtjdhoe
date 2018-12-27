<template>
  <div class="hallAtlas">
    <common-nav-header :title="title" />
    <div
      ref="xpAtlasTop"
      class="xpAtlasTop border-bottom">
      <div
        ref="xpAtlasTopContent"
        class="xpAtlasTopContent">
        <van-tabs
          v-if="hallAtlasData.length>1"
          v-model="active"
          @click="onItemClick">
          <van-tab
            v-for="(item,i) in hallAtlasData"
            ref="tabItem"
            :title="item.name"
            :key="i"
            :id="i">
            <div
              ref="xpHallContent"
              class="xpHallContent">
              <div>
                <ul
                  v-if="imgsList.length"
                  class="goodsContainer">
                  <li
                    v-for="item in imgsList"
                    :key="item.index">
                    <nuxt-link :to="'/hallDetails/'+item.index">
                      <img
                        :src="imageUrl+item.img"
                        alt="">
                    </nuxt-link>
                  </li>
                  <li class="emptyBox"/>
                </ul>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '~/util/config.js'
import { mapState } from 'vuex'
import { experienceData } from '~/util/const'
export default {
  name: 'HallAtlas',
  data() {
    return {
      title: '图集',
      imageUrl: config.imageUrl,
      imgsList: [],
      hallAtlasData: [
        {
          name: '全部',
          experienceCategoryId: '全部',
          list: []
        }
      ],
      active: 0
    }
  },
  computed: mapState({
    experience: state => state.hall[experienceData]
  }),
  mounted() {
    this.index = this.$route.params.index
    this.active = this.index
    this.initHallAtlasData(this.index)
  },
  methods: {
    initHallAtlasData(index) {
      let id = this.experience[index - 1].experienceCategoryId
      for (let i = 0; i < this.experience.length; i++) {
        let flag = true
        for (let j = 0; j < this.hallAtlasData.length; j++) {
          if (
            this.hallAtlasData[j].experienceCategoryId ===
            this.experience[i].experienceCategoryId
          ) {
            this.hallAtlasData[j].list.push({
              img: this.experience[i].experienceCoverImage,
              index: i
            })
            flag = false
            break
          }
        }
        if (flag) {
          this.hallAtlasData.push({
            name: this.experience[i].categoryName,
            experienceCategoryId: this.experience[i].experienceCategoryId,
            list: [
              {
                img: this.experience[i].experienceCoverImage,
                index: i
              }
            ]
          })
        }
        this.hallAtlasData[0].list.push({
          img: this.experience[i].experienceCoverImage,
          index: i
        })
      }
      this.hallAtlasData.forEach((value, index) => {
        if (value.experienceCategoryId === id) {
          this.getImgsList(index)
        }
      })
    },
    onItemClick(index) {
      this.index = index
      this.getImgsList(index)
    },
    getImgsList(i) {
      this.imgsList = this.hallAtlasData[i].list
      this.index = i
    }
  }
}
</script>
<style lang="stylus" scoped>
.hallAtlas
  height 100%
  padding-top 202px
  .xpAtlasTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 120px
    z-index 9999999
    padding 0 50px
    background-color #fff
.xpHallContent
  ul
    display flex
    flex-wrap wrap
    padding-top 128px
    justify-content space-between
    height 100%
    li
      width 488px
      height 450px
      margin-bottom 50px
      img
        width 488px
        height 450px
    .emptyBox
      width 488px
      height 0
</style>
