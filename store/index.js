import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)
import login from './modules/login'
import hall from './modules/hall'
import goodsList from './modules/goodsList'
import details from './modules/details'
import cart from './modules/cart'
import coupon from './modules/coupon'
// require('whatwg-fetch')

const store = () =>
  new Vuex.Store({
    modules: {
      login,
      hall,
      goodsList,
      details,
      cart,
      coupon
    }
  })

export default store
