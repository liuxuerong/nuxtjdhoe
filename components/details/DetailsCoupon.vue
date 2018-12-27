<template>
  <div class="couponPop">
    <van-popup
      v-model="coupon.coupponVisible"
      position="bottom"
      @touchmove.prevent>
      <div id="couponinfo">
        <div class="couponScroll">
          <div
            v-for="(item, index) in couponData"
            :key="index"
            class="couponItem">
            <div class="top">
              <div class="left">
                <span v-if="item.type == '1' || item.type == '3'">￥<i>{{ item.subMoney }}</i></span>
                <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 2"><i>{{ parseInt(item.discount.toString().replace(".", "")) }}</i> 折</span>
                <span v-else-if="item.type == '2' && item.discount.toString().replace('.', '').length === 3"><i>{{ item.discount.toString().replace(".", "")/10 }}</i> 折</span>
                <p v-if="item.applyType == '1'">通用券</p>
                <p v-if="item.applyType == '2'">app专享</p>
                <p v-if="item.applyType == '3'">门店专享</p>
              </div>
              <div class="right">
                <h3>{{ item.name }}</h3>
                <div class="displayBtn">
                  <div
                    v-if="item.condMoney != '0'"
                    class="fullSub">
                    <span v-if="item.range == '1'">满 {{ item.condMoney }}.0 可用(限指定商品)</span>
                    <span v-else-if="item.range == '2'">满 {{ item.condMoney }}.0 可用(限指定门店)</span>
                    <span v-else-if="item.range == '3'">满 {{ item.condMoney }}.0 可用(限指定分类)</span>
                    <span v-else-if="item.range == '4'">满 {{ item.condMoney }}.0 可用</span>
                  </div>
                  <div
                    v-else
                    class="fullSub">
                    <span>无门槛</span>
                  </div>
                  <!-- 未使用 -->
                  <div class="cardVoucherOper">
                    <span
                      v-if="item.useStatus == '1'"
                      class="operBtn newReceive"
                      @click.stop="receiveCard(item.id)">立即领取</span>
                    <span
                      v-if="item.useStatus == '2'"
                      class="operBtn noReceive">已领取</span>
                    <span
                      v-if="item.useStatus == '3'"
                      class="operBtn noReceive">领光了</span>
                  </div>
                </div>
                <!-- 未使用 -->
                <div class="activityTime">
                  <!-- 立即领取 可以领取-->
                  <span
                    v-if="item.useStatus == '1'"
                    class="activityTime">领取时限:{{ item.activityStart.split('T')[0].replace(/-/ig,'.') }} - {{ item.activityEnd.split('T')[0].replace(/-/ig,'.') }}</span>
                  <!-- 立即使用  到达使用时间-->
                  <span
                    v-else-if="item.useStatus == '2' && item.display=='2' && item.invalidDay > 0"
                    class="countDown">{{ item.invalidDay }}天后过期</span>
                  <span
                    v-else-if="item.useStatus == '2' && item.display=='2' && item.invalidDay === 0"
                    class="countDown">1天后过期</span>
                  <!-- 立即使用 未到达使用时间 -->
                  <span v-else-if="item.useStatus == '2' && item.display=='1'">使用时限:{{ item.activityStart.split('T')[0].replace(/-/ig,'.') }} - {{ item.activityEnd.split('T')[0].replace(/-/ig,'.') }}</span>
                  <!-- 领光了 -->
                  <span
                    v-if="item.useStatus == '3'"
                    class="activityTime">领取时限:{{ item.activityStart.split('T')[0].replace(/-/ig,'.') }} - {{ item.activityEnd.split('T')[0].replace(/-/ig,'.') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { memberCouponRecord } from '~/util/netApi'
import { mapState } from 'vuex'
export default {
  props: {
    couponData: Array
  },
  data() {
    return {}
  },
  computed: mapState({
    coupon: state => state.coupon
  }),
  methods: {
    // 领取优惠券
    receiveCard(id) {
      let params = {
        couponId: id
      }
      this.$http(this, memberCouponRecord, params)
        .then(response => {
          if (response.data.code === 0) {
            Toast({
              message: '优惠券领取成功',
              position: 'bottom',
              duration: 5000
            })
            this.headleTabsChange(0)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/styles/mixins.styl";
#couponinfo
  box-sizing border-box
  height 960px
  padding 20px 50px
  overflow auto
  .tabWrap
    overflow-y scroll
    height 30vh
  .couponItem
    width 100%
    height 280px
    margin-bottom 30px
    background #fff
    bgImage('/static/images/newCardVouItemBg')
    .left
      float left
      width 300px
      height 280px
      box-sizing border-box
      padding-top 60px
      span
        display block
        width 100%
        height 80px
        line-height 80px
        font-size 40px
        font-weight bold
        text-align center
        color #fff
        i
          display inline-block
          font-size 80px
          color #fff
          font-weight bold
      p
        display block
        width 180px
        height 56px
        text-align center
        font-size 30px
        margin 30px auto 0
        color #FFFFFF
        border 1px solid #fff
    .right
      float left
      width 70%
      box-sizing border-box
      padding 40px 34px 0
      h3
        width 100%
        font-size 40px
        font-weight bold
        color #333333
      .displayBtn
        width 100%
        div
          display inline-block
  .operBtn
    float right
    width 160px
    height 60px
    text-align center
    line-height 60px
    font-size 30px
    border-radius 30px
  .newReceive
    color #BA825A
    border 1px solid #BA825A
  .noReceive
    color #fff
    background #E6E6E6
  .activityTime
    width 100%
    margin-top 30px
    font-size 30px
    color #999999
  .countDown
    color #D54B4B
  .fullSub
    font-size 36px
    color #BA825A
  .cardDetails
    float right
    background #fff
    font-size 30px
    color #666666
  .cardVoucherOper
    float right
</style>

<style lang="stylus">
.couponPop
  .mint-popup
    width 100%
</style>
