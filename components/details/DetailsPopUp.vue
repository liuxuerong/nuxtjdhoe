<template>
  <div class="detailsPopUp">
    <van-popup
      v-model="details.popupVisible"
      position="bottom"
      @touchmove.prevent>
      <DetailsImgPrice :goods="goods" />
      <div class="cutOffLine"/>
      <div id="goodsinfo">
        <div
          ref="num"
          class="num">
          <span
            :class="{disable:subDisabled}"
            class="sub fl"
            @click="subCount">_</span>
          <input
            v-model="cartCount"
            type="text"
            class="fl">
          <span
            ref="add"
            :class="{disable:addDisabled}"
            class="add fr"
            @click="addCount">+</span>
        </div>
        <div
          ref="tabWrap"
          class="tabWrap">
          <div
            v-for="(item,index) in sku.keys"
            :key="index"
            class="tabContent">
            <div class="tabContentName">{{ item.name }}</div>
            <input
              v-for="(citem,cindex) in item.value"
              :class="{notClick:citem.notClick,active:citem.isActiveC}"
              :attr_id="citem.id"
              :value="citem.cname"
              :key="cindex"
              type="button"
              class="skuItem"
              @click="tabInfoChange(index,cindex,citem.id,$event)" >
          </div>
        </div>
      </div>
      <div
        v-if="from==1"
        class="goodsInfoBottm border-top">
        <span
          v-if="!goodsEmpty&&goodsStatus==1"
          class="buy"
          to="/createOrder"
          @click="buy()">立即购买</span>
        <span
          v-if="!goodsEmpty&&goodsStatus==1"
          class="addCart"
          @click="addCart()">
          加入购物车
        </span>
        <div
          v-if="goodsEmpty||goodsStatus!=1"
          class="goodsEmpty">暂无可售商品</div>
      </div>
      <div
        v-else-if="from==2"
        class="goodsInfoBottm border-top">
        <div
          class="addSure"
          @click="addCart()">确认加入</div>
      </div>
      <div
        v-else
        class="goodsInfoBottm border-top">
        <span
          class="addSure"
          @click="buy()">确认下单</span>
  </div></van-popup></div>
</template>

<script>
import { storage } from '~/util/storage'
import { goodsInfo } from '~/util/const.js'
import { Popup, Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { addCart } from '~/util/netApi'
import DetailsImgPrice from './DetailsImgPrice'
export default {
  name: 'DetailsPopUp',
  components: {
    'mt-popup': Popup,
    DetailsImgPrice
  },
  props: {
    sku: Object,
    goods: Object,
    goodsStatus: Number
  },
  data() {
    return {
      SKUResult: {},
      cartCount: 1,
      type: 1,
      goodsItemsId: '',
      coverImage: '',
      name: '',
      goodsId: '',
      newHaveChangedId: '',
      goodsEmpty: false,
      subDisabled: false,
      addDisabled: false
    }
  },
  watch: {
    cartCount(v) {
      this.changeStyle(v)
      if (this.cartCount >= this.maxCount) {
        Toast({
          message: '数量超出库存范围',
          position: 'center',
          duration: 500
        })
        if (this.maxCount === 0) {
          return
        }
        this.cartCount = this.maxCount
      }
      if (this.cartCount < 2) {
        this.cartCount = 1
        Toast({
          message: '不能再少了',
          position: 'center',
          duration: 500
        })
      }
    },
    maxCount() {
      this.changeStyle(this.cartCount)
    }
  },
  computed: mapState({
    details: state => state.details,
    maxCount: state => state.details.maxCount,
    from: state => state.cart.from
  }),
  methods: {
    ...mapMutations(['changeNowPrice', 'changeMaxCount', 'changePopupVisible']),
    addCount() {
      this.cartCount++
    },

    subCount() {
      this.cartCount--
    },
    changeStyle(v) {
      if (v >= this.maxCount) {
        this.addDisabled = true
      } else {
        this.addDisabled = false
      }
      if (v === 1) {
        this.subDisabled = true
      } else {
        this.subDisabled = false
      }
    },
    isAllCheck() {
      const tabWrapChild = this.$refs.tabWrap.childNodes
      let allFlag = true

      for (let i = 0; i < tabWrapChild.length; i++) {
        let input = this.children(tabWrapChild[i], 'input')
        let flag = false
        for (let j = 0; j < input.length; j++) {
          if (input[j].classList.contains('active')) {
            flag = true
            break
          }
        }
        if (!flag) {
          allFlag = false
          break
        }
      }
      if (!allFlag) {
        Toast({
          message: '请选择商品属性',
          position: 'bottom',
          duration: 500
        })
        return false
      } else {
        if (!tabWrapChild.length) {
          this.goodsItemsId = this.sku.data[''].goodsItemsId
        }
        return true
      }
    },
    buy() {
      if (this.isAllCheck()) {
        let goodsObj = {
          key: '',
          shippingMethod: '',
          favorableId: ''
        }
        goodsObj.goodsItems = []
        goodsObj.goodsItems[0] = {
          goodsId: this.goodsId,
          goodsItemId: this.goodsItemsId,
          num: this.cartCount
        }
        storage.setLocalStorage(goodsInfo, goodsObj)
        this.$router.push('/createOrder')
      }
    },
    addCart() {
      if (this.isAllCheck()) {
        const params = {
          goodsItemId: this.goodsItemsId,
          num: this.cartCount
        }
        this.$http(this, addCart, params)
          .then(res => {
            if (res.data.code === 0) {
              Toast({
                message: '添加购物车成功',
                position: 'bottom',
                duration: 500
              })
              this.changePopupVisible(false)
            } else {
              Toast({
                message: res.data.message,
                position: 'bottom',
                duration: 500
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    isContained(a, b) {
      if (!(a instanceof Array) || !(b instanceof Array)) return false
      if (a.length !== b.length) return false
      let aStr = a.toString()
      for (let i = 0, len = b.length; i < len; i++) {
        if (aStr.indexOf(b[i]) === -1) return false
      }
      return true
    },
    children(curEle, tagName) {
      let nodeList = curEle.childNodes
      let ary = []
      if (/MSIE(6|7|8)/.test(navigator.userAgent)) {
        for (let i = 0; i < nodeList.length; i++) {
          let curNode = nodeList[i]
          if (curNode.nodeType === 1) {
            ary[ary.length] = curNode
          }
        }
      } else {
        ary = Array.prototype.slice.call(curEle.children)
      }

      // 获取指定子元素
      if (typeof tagName === 'string') {
        for (let k = 0; k < ary.length; k++) {
          let curTag = ary[k]
          if (curTag.nodeName.toLowerCase() !== tagName.toLowerCase()) {
            ary.splice(k, 1)
            k--
          }
        }
      }

      return ary
    },
    /* 商品详情数据 */
    queryDGoodsById() {
      this.initSKU() // 初始化，得到SKUResult
      /* 根据SKUResult得到初始化的时候哪些不能点击 */
      for (let i = 0; i < this.sku.keys.length; i++) {
        for (let j = 0; j < this.sku.keys[i].value.length; j++) {
          if (this.SKUResult[this.sku.keys[i].value[j].id] == null) {
            this.sku.keys[i].value[j].notClick = true
          }
        }
      }
    },
    // 获得对象的key
    getObjKeys(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object')
      let keys = []
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          keys[keys.length] = key
        }
      }
      return keys
    },

    // 把组合的key放入结果集SKUResult
    add2SKUResult(combArrItem, sku) {
      let key = combArrItem.join(';')
      if (this.SKUResult[key]) {
        // SKU信息key属性·
        this.SKUResult[key].count += sku.count
        this.SKUResult[key].prices.push(sku.price)
        this.SKUResult[key].goodsItemsId = sku.goodsItemsId
        this.SKUResult[key].pic = sku.pic
        this.SKUResult[key].name = sku.name
      } else {
        this.SKUResult[key] = {
          count: sku.count,
          prices: [sku.price],
          goodsItemsId: sku.goodsItemsId,
          pic: sku.pic,
          name: sku.namepic
        }
      }
    },

    // 初始化得到结果集
    initSKU() {
      let i = this.getObjKeys(this.sku.data)
      let j = this.getObjKeys(this.sku.data)
      let skuKeys = this.getObjKeys(this.sku.data)
      for (i = 0; i < skuKeys.length; i++) {
        let skuKey = skuKeys[i] // 一条SKU信息key
        let sku = this.sku.data[skuKey] // 一条SKU信息value
        let skuKeyAttrs = skuKey.split(';') // SKU信息key属性值数组
        skuKeyAttrs.sort(function(value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })

        // 对每个SKU信息key属性值进行拆分组合
        let combArr = this.combInArray(skuKeyAttrs)
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku)
        }

        // 结果集接放入SKUResult
        this.SKUResult[skuKeyAttrs.join(';')] = {
          count: sku.count,
          prices: [sku.price],
          goodsItemsId: sku.goodsItemsId,
          pic: sku.pic,
          name: sku.name
        }
      }
    },

    /**
     * 从数组中生成指定长度的组合
     * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
     */
    combInArray(aData) {
      if (!aData || !aData.length) {
        return []
      }

      let len = aData.length
      let aResult = []

      for (let n = 1; n < len; n++) {
        let aaFlags = this.getCombFlags(len, n)
        while (aaFlags.length) {
          let aFlag = aaFlags.shift()
          let aComb = []
          for (let i = 0; i < len; i++) {
            aFlag[i] && aComb.push(aData[i])
          }
          aResult.push(aComb)
        }
      }
      return aResult
    },

    /**
     * 得到从 m 元素中取 n 元素的所有组合
     * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
     */
    getCombFlags(m, n) {
      if (!n || n < 1) {
        return []
      }

      let aResult = []
      let aFlag = []
      let bNext = true
      let i, j, iCnt1

      for (i = 0; i < m; i++) {
        aFlag[i] = i < n ? 1 : 0
      }

      aResult.push(aFlag.concat())

      while (bNext) {
        iCnt1 = 0
        for (i = 0; i < m - 1; i++) {
          if (aFlag[i] === 1 && aFlag[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              aFlag[j] = j < iCnt1 ? 1 : 0
            }
            aFlag[i] = 0
            aFlag[i + 1] = 1
            let aTmp = aFlag.concat()
            aResult.push(aTmp)
            if (
              aTmp
                .slice(-n)
                .join('')
                .indexOf('0') === -1
            ) {
              bNext = false
            }
            break
          }
          aFlag[i] === 1 && iCnt1++
        }
      }
      return aResult
    },
    /* 商品条件筛选 */
    tabInfoChange(index, cindex, cid, e) {
      // let orderInfo = this.keys /* 所有规格 */
      let orderInfoChild = this.sku.keys[index]
        .value /* 当前点击的规格的所有子属性内容 */
      // 选中自己，兄弟节点取消选中
      if (orderInfoChild[cindex].notClick !== true) {
        if (orderInfoChild[cindex].isActiveC === true) {
          orderInfoChild[cindex].isActiveC = false
        } else {
          for (let i = 0; i < orderInfoChild.length; i++) {
            orderInfoChild[i].isActiveC = false
          }
          orderInfoChild[cindex].isActiveC = true
        }
      }

      // 已经选择的节点
      let haveChangedId = []
      for (let i = 0; i < this.sku.keys.length; i++) {
        for (let j = 0; j < this.sku.keys[i].value.length; j++) {
          if (this.sku.keys[i].value[j].isActiveC === true) {
            haveChangedId.push(this.sku.keys[i].value[j].id)
          }
        }
      }

      if (haveChangedId.length) {
        for (let key in this.SKUResult) {
          let keyArr = key.split(';')
          if (this.isContained(keyArr, haveChangedId)) {
            this.newHaveChangedId = keyArr
          }
        }
        // 获得组合key价格及数量
        this.newHaveChangedId.sort(function(value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })
        let len = this.newHaveChangedId.length
        let prices = this.SKUResult[this.newHaveChangedId.join(';')].prices
        let name = this.SKUResult[this.newHaveChangedId.join(';')].name
        let pic = this.SKUResult[this.newHaveChangedId.join(';')].pic
        if (!name) {
          name = this.name
        }
        const nowCount = this.SKUResult[this.newHaveChangedId.join(';')].count
        this.goodsItemsId = this.SKUResult[
          this.newHaveChangedId.join(';')
        ].goodsItemsId

        this.changeMaxCount(nowCount)
        if (this.cartCount > nowCount) {
          this.cartCount = nowCount
        }
        let maxPrice = Math.max.apply(Math, prices)
        let minPrice = Math.min.apply(Math, prices)
        this.changeNowPrice(
          maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice
        )
        this.goods.name = name
        this.goods.coverImage = pic
        // this.nowPrice =
        //     maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice /* 筛选价格 */

        // 用已选中的节点验证待测试节点
        let daiceshi = [] // 待测试节点
        let daiceshiId = []
        for (let i = 0; i < this.sku.keys.length; i++) {
          for (let j = 0; j < this.sku.keys[i].value.length; j++) {
            if (
              this.sku.keys[index].value[cindex].id !==
              this.sku.keys[i].value[j].id
            ) {
              daiceshi.push({
                index: i,
                cindex: j,
                id: this.sku.keys[i].value[j].id
              })
              daiceshiId.push(this.sku.keys[i].value[j].id)
            }
          }
        }
        for (let i = 0; i < this.newHaveChangedId.length; i++) {
          let indexs = daiceshiId.indexOf(this.newHaveChangedId[i])
          if (indexs > -1) {
            daiceshi.splice(indexs, 1)
          }
        }
        for (let i = 0; i < daiceshi.length; i++) {
          let testAttrIds = [] // 从选中节点中去掉选中的兄弟节点
          let siblingsId = ''
          for (
            let m = 0;
            m < this.sku.keys[daiceshi[i].index].value.length;
            m++
          ) {
            if (this.sku.keys[daiceshi[i].index].value[m].isActiveC === true) {
              siblingsId = this.sku.keys[daiceshi[i].index].value[m].id
            }
          }
          if (siblingsId !== '') {
            for (let j = 0; j < len; j++) {
              this.newHaveChangedId[j] !== siblingsId &&
                testAttrIds.push(this.newHaveChangedId[j])
            }
          } else {
            testAttrIds = this.newHaveChangedId.concat()
          }
          testAttrIds = testAttrIds.concat(
            this.sku.keys[daiceshi[i].index].value[daiceshi[i].cindex].id
          )
          testAttrIds.sort(function(value1, value2) {
            return parseInt(value1) - parseInt(value2)
          })
          if (!this.SKUResult[testAttrIds.join(';')]) {
            this.sku.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].notClick = true
            this.sku.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].isActiveC = false
          } else {
            this.sku.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].notClick = false
          }
        }
      } else {
        // 设置属性状态
        for (let i = 0; i < this.sku.keys.length; i++) {
          for (let j = 0; j < this.sku.keys[i].value.length; j++) {
            if (this.SKUResult[this.sku.keys[i].value[j].id]) {
              this.sku.keys[i].value[j].notClick = false
            } else {
              this.sku.keys[i].value[j].notClick = true
              this.sku.keys[i].value[j].isActiveC = false
            }
          }
        }
      }
    }
  },
  created() {
    this.queryDGoodsById()
  },
  mounted() {
    this.coverImage = this.goods.coverImage
    this.name = this.goods.name
    this.goodsId = this.goods.id
    console.log(this.sku.data)
    if (typeof this.maxCount === 'number') {
      this.changeStyle(1)
      if (this.maxCount === 0) {
        this.goodsEmpty = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#goodsinfo
  box-sizing border-box
  padding 50px 0px 150px 50px
  .tabWrap
    overflow-y scroll
    height 30vh
  .num
    height 100px
    line-height 100px
    width 400px
    color #262626
    font-size 46px
    border 1px solid #CCCCCC
    margin-bottom 100px
    span
      display inline-block
      width 100px
      height 92px
      line-height 92px
      font-size 80px
      text-align center
      color #808080
    .sub
      margin-top -36px
    .add
      margin-top 6px
    span.disable
      color #ccc
    input
      width 190px
      border-left 1px solid #CCCCCC
      border-right 1px solid #CCCCCC
      height 92px
      margin-top 2px
      outline none
      text-align center
.tabContentName
  color #262626
  font-size 40px
  height 135px
  line-height 135px
  font-weight 300
.skuItem
  background none
  outline none
  border 1px solid #CCCCCC
  padding 2px 50px
  margin-right 50px
  height 120px
  line-height 120px
  margin-bottom 50px
  color #262626
  font-size 40px
.skuItem.active
  border 4px solid #BA825A
.skuItem.notClick
  border 1px dotted #CCCCCC
  color #CCCCCC
.goodsInfoBottm
  height 145px
  display flex
  font-size 46px
  position absolute
  bottom 0
  width 100%
  z-index 99999
  .buy
    display inline-block
    flex 1
    text-align center
    line-height 145px
    height 145px
    color #BA825A
    vertical-align top
  .addCart
    flex 1
    display inline-block
    text-align center
    line-height 145px
    height 145px
    color #BA825A
    background-color #F0F0F0
.goodsInfoBottm
  .addSure
    width 100%
    height 145px
    line-height 145px
    background-color #F0F0F0
    text-align center
    color #BA825A
    font-size 46px
.goodsEmpty
  flex 1
  height 145px
  line-height 145px
  text-align center
  background-color #F0F0F0
  font-size 46px
  color #CCCCCC
</style>

<style lang="stylus">
.detailsPopUp
  .van-popup--bottom
    z-index 999999999 !important
</style>
