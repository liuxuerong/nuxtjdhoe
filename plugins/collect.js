import { accessToken } from '~/util/const.js'
import Vue from 'vue'
import { isCollection, opCollection } from '~/util/netApi'
import axios from 'axios'
import notice from '~/util/notice.js'
import { config } from '~/util/config' // 图片路径
import { getUrlParam } from '~/util/params'
function getToken(obj) {
  let tokenOne
  let token = obj.$cookies.get(accessToken)
  if (process.client) {
    tokenOne = getUrlParam('token')
    token = tokenOne ? `Bearer ${tokenOne}` : token
  }
  return token
}
Vue.prototype.$hasCollection = (obj, params) => {
  if (getToken(obj)) {
    return obj.$http(obj, isCollection, params)
  }
}
Vue.prototype.$doCollection = (obj, params) => {
  if (getToken(obj)) {
    return obj.$http(obj, opCollection, params, 'noLoading')
  } else {
    notice.errorModal(obj, '未授权，请重新登录', function() {
      obj.$router.push({ path: '/login' })
    })
  }
}
Vue.prototype.$uploadPic = e => {
  let ss = e.target.files
  let formData = new FormData()
  formData.append('file', ss[0])
  let cf = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: storage.getLocalStorage(accessToken)
    }
  }
  return axios.post(config.baseUrl + 'file/upload', formData, cf)
}
