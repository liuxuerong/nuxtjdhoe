<template>
  <div class="loginWrapper">
    <div class="loginTop">
      <span>欢迎回来</span>
      <nuxt-link
        to="/"
        class="backIndex">回到首页</nuxt-link>
    </div>
    <div class="loginInfo">
      <form id="loginInfoForm">
        <div class="loginInput userName border-bottom">
          <i class="loginIcon phoneIcon"/>
          <input
            v-model="username"
            type="text"
            placeholder="手机号码"
            name="phone"
            maxlength="11" >
        </div>
        <div class="loginInput passWord">
          <i class="loginIcon passwordIcon"/>
          <input
            v-model="password"
            type="password"
            autocomplete="new-password"
            placeholder="密码"
            name="password"
            maxlength="12" >
          <router-link
            to="/remberPassword"
            class="passWordOper">忘记密码？</router-link>
        </div>
      </form>
    </div>
    <button
      class="loginBtn"
      @click="loginBtnClick">登录</button>
    <router-link
      to="/phoneCode"
      class="phoneCodeLogin">手机验证码登录</router-link>
    <span class="loginTipText">未注册的手机号码验证后自动创建星品账户</span>
  </div>
</template>

<script type="text/javascript">
import notice from '~/util/notice'
import { getLogin } from '~/util/netApi'
import { http } from '~/util/http'
import { accessToken } from '~/util/const.js'
import qs from 'qs'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginBtnClick() {
      let _this = this
      let param = {
        username: this.username,
        password: this.password,
        type: 1,
        userType: 1
      }
      this.$http(this, getLogin, param).then(response => {
        if (response.data.code === 0) {
          _this.$cookies.set('userId', response.data.body.user_id)
          _this.$cookies.set(
            accessToken,
            'Bearer ' + response.data.body.access_token
          )
          notice.toast(_this, '登录成功')
          _this.$router.push('/')
        } else {
          notice.errorModal(_this, '账号和密码不匹配，请重新输入')
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/styles/mixins.styl'
.loginTop
  height 72px
  line-height 72px
  box-sizing border-box
  padding 100px 44px 0
  span
    font-size 76px
    color #fff
  .backIndex
    float right
    font-size 36px
    color #fff
body,html
    height 100%
    width 100%
    position relative
.loginWrapper
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background url('~/images/loginBg@3x.jpg') no-repeat center center/100% 100%
    overflow hidden
.loginInfo
    width 88%
    height 530px
    background rgba(0,0,0,0.1)
    margin 30% auto 5%
    box-sizing border-box
    padding 0 30px
    .loginInput
        width 100%
        height 265px
        line-height 265px
        .loginIcon
            display inline-block
            width 66px
            height 66px
            margin-right 56px
            margin-left 30px
            vertical-align middle
        .phoneIcon
            bgImage('~/icons/userName')
        .passwordIcon
            bgImage('~/icons/password')
        input
          width 52%
          height 100px
          line-height 100px
          background transparent
          font-size 46px
          color #fff
          outline none
        .passWordOper
            float right
            color #fff
            font-size 36px
.loginBtn
    display block
    width 88%
    height 160px
    line-height 160px
    text-align center
    font-size 46px
    color #fff
    border-radius 4px
    background #C78A5C
    margin 0 auto 5%
.phoneCodeLogin
    display block
    width 100%
    text-align center
    font-size 40px
    height 40px
    line-height 42px
    color #fff
    text-decoration underline
.loginTipText
  display block
  width 100%
  text-align center
  font-size 36px
  color #E6E6E6
  margin-top 20%
::-webkit-input-placeholder {
    color: #fff;
}
::-moz-placeholder {
    color: #fff;
}
:-ms-input-placeholder {
    color: #fff;
}
:-moz-placeholder {
    color: #fff;
}
</style>
