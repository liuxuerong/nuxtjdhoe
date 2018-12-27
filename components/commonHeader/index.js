import CommonHeader from './CommonHeader.vue'
import CommonNavHeader from './CommonNavHeader.vue'
import CommonNavSearch from './CommonNavSearch.vue'
const commonHeader = {
  install(Vue) {
    Vue.component(CommonHeader.name, CommonHeader)
    Vue.component(CommonNavHeader.name, CommonNavHeader)
    Vue.component(CommonNavSearch.name, CommonNavSearch)
  }
}

export default commonHeader
