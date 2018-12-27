import { config } from './config.js'
import { storage } from './storage.js'
import { accessToken } from './const.js'
// import { getUrlParam } from '~/func/params'
import axios from 'axios'
import notice from './notice'

let baseUrl = config.baseUrl
let headers = {
  'Content-Type': 'application/json',
  Authorization: null
}

// http返回码状态判断
let state = (res, noLoading) => {
  // console.log(res)
  if (noLoading) {
    // Loading隐藏
    notice.loadingHide(obj)
  }
  if (res.code === undefined) {
    notice.errorModal('网络错误', function() {
      notice.loadingHide(obj)
    })
  }
  switch (res.code) {
    case 302:
      notice.errorModal('302')
      break
    case 400:
      notice.errorModal('请求参数错误')
      break
    case 401:
      notice.errorModal('未授权，请重新登录', function() {})
      break
    case 403:
      notice.errorModal('拒绝访问')
      break
    case 404:
      notice.errorModal('请求错误,未找到该资源')
      break
    case 405:
      notice.errorModal('请求方法未允许')
      break
    case 408:
      notice.errorModal('请求超时')
      break
    case 500:
      notice.errorModal('服务器端错误')
      break
    case 502:
      notice.errorModal('服务器异常')
      break
    case 505:
      notice.errorModal('http版本不支持该请求')
      break
    case 12000:
      notice.errorModal('参数错误')
      break
    case 10002:
      notice.errorModal('未授权，请重新登录', function() {})
      break
  }
}

export const http = (
  obj,
  opts,
  params,
  authorization = false,
  noLoading = false
) => {
  if (!noLoading || noLoading === 'undefined') {
    notice.loading(obj)
  }
  if (authorization) {
    // 获取token;
    // let token = getUrlParam('token')
    let token = storage.getLocalStorage(accessToken)
    // token = token ? `Bearer ${token}` : tokenOne
    headers = Object.assign({}, headers, { token })
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
  axios.interceptors.request.use(
    data => {
      return data
    },
    err => {
      console.log(err)
      return Promise.resolve(err)
    }
  )
  axios.interceptors.response.use(
    response => {
      if (response.status && response.status === 200) {
        state(response.data)
      }
      notice.loadingHide(obj)
      return response
    },
    err => {
      state(err, '')
      return Promise.resolve(err.response)
    }
  )
  return new Promise(function(resolve, reject) {
    axios(httpDefaultOptions)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
