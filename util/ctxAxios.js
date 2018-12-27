import { config } from './config.js'
import axios from 'axios'

let baseUrl = config.baseUrl
let headers = {
  'Content-Type': 'application/json',
  Authorization: null
}

export const ctxAxios = (
  opts,
  params,
  authorization = false
) => {
  if (authorization) {
    // 获取token;
    let token = getUrlParam('token')
    let tokenOne = storage.getLocalStorage(accessToken)
    token = token ? `Bearer ${token}` : tokenOne
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
