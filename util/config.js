let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://api.test.jdhoe.com/' // 开发
  // baseUrl = 'http://192.168.1.112:8888/' // 开发
} else if (process.env.NODE_ENV === 'testing') {
  baseUrl = 'https://api.test.jdhoe.com/' // 测试
} else if (process.env.NODE_ENV === 'preview') {
  baseUrl = 'https://api.pre.jdhoe.com/' // 预发布
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.upinstar.com/' // 线上环境
}
const config = {
  imageUrl: 'https://resource.upinstar.com/',
  baseUrl
}

export { config }
