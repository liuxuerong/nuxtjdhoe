import Vue from 'vue'
import { Toast, Tab, Tabs, Dialog, Popup } from 'vant'
import 'vant/lib/index.css'
Vue.use(Tab)
  .use(Tabs)
  .use(Popup)
export default ({ app }, inject) => {
  inject('Toast', Toast)
  inject('Dialog', Dialog)
}
