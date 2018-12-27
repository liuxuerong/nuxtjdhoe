// import qs from 'qs'
import { config } from '~/util/config.js'
import { accessToken } from '~/util/const.js'
import { getUrlParam } from '~/util/params'
import notice from '~/util/notice'
// http返回码状态判断
let state = (obj, res, noLoading) => {
  if (noLoading) {
    // Loading隐藏
    notice.loadingHide(obj)
  }
  if (res.code === undefined) {
    notice.errorModal(obj, '网络错误', function() {
      notice.loadingHide(obj)
    })
  }
  switch (res.code) {
    case 302:
      notice.errorModal(obj, '302')
      break
    case 400:
      notice.errorModal(obj, '请求参数错误')
      break
    case 401:
      notice.errorModal(obj, '未授权，请重新登录', function() {})
      break
    case 403:
      notice.errorModal(obj, '拒绝访问')
      break
    case 404:
      notice.errorModal(obj, '请求错误,未找到该资源')
      break
    case 405:
      notice.errorModal(obj, '请求方法未允许')
      break
    case 408:
      notice.errorModal(obj, '请求超时')
      break
    case 500:
      notice.errorModal(obj, '服务器端错误')
      break
    case 502:
      notice.errorModal(obj, '服务器异常')
      break
    case 505:
      notice.errorModal(obj, 'http版本不支持该请求')
      break
    case 12000:
      notice.errorModal(obj, '参数错误')
      break
    case 10002:
      notice.errorModal(obj, '未授权，请重新登录', function() {})
      break
  }
}
export default ({ $axios }, inject) => {
  let http = (obj, opts, params, noLoading = false) => {
    let token
    let tokenOne
    // 获取token;
    token = obj.$cookies.get(accessToken)
    if (process.client) {
      tokenOne = getUrlParam('token')
      token = tokenOne ? `Bearer ${tokenOne}` : token
    }
    let baseUrl = config.baseUrl
    let headers = {
      'Content-Type': 'application/json',
      Authorization: token || ''
    }
    if (!noLoading || noLoading === 'undefined') {
      notice.loading(obj)
    }
    let httpDefaultOptions = {}
    httpDefaultOptions = {
      url: baseUrl + opts.version + opts.url,
      method: opts.method,
      timeout: 30000,
      headers,
      params: Array.isArray(params) && opts.join ? {} : params,
      data: Array.isArray(params) && opts.join ? {} : params
    }
    if (
      opts.method === 'GET' ||
      opts.method === 'DELETE' ||
      opts.method === 'HEAD'
    ) {
      delete httpDefaultOptions.data
    } else {
      delete httpDefaultOptions.params
    }
    // 如果参数是连接在url后面的形式
    if (opts.join && Array.isArray(params)) {
      params.forEach(c => {
        httpDefaultOptions.url += '/' + c
      })
    }
    // 响应拦截器即异常处理
    $axios.interceptors.request.use(
      data => {
        return data
      },
      err => {
        console.log(err)
        return Promise.resolve(err)
      }
    )
    $axios.interceptors.response.use(
      response => {
        if (response.status && response.status === 200) {
          state(obj, response.data)
        }
        notice.loadingHide(obj)
        return response
      },
      err => {
        state(obj, err, '')
        return Promise.resolve(err.response)
      }
    )
    return $axios(httpDefaultOptions)
  }
  inject('http', http)
}
