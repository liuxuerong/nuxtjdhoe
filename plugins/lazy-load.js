import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('~/static/images/defaultImg.png'),
  error: require('~/static/images/defaultImg.png')
})
