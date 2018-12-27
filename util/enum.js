/**
 * 枚举相关
 */

export const mainOrderStatus = {
  1: '待支付',
  2: '已支付',
  3: '确认订单',
  4: '交易成功',
  5: '订单完成',
  6: '交易关闭',
  7: '订单取消',
  8: '订单失效'
}

export const subOrderStatus = {
  1: '未发货',
  2: '打包配货',
  3: '已发货',
  4: '已收货',
  5: '交易成功',
  6: '申请售后',
  7: '已评论',
  8: '退款中',
  9: '退款完成',
  10: '退款失败',
  20: '提货失败',
  21: '提货成功',
  22: '已提货'
}

export const payStatus = {
  0: '未付款',
  1: '已支付'
}

export const invoiceType = {
  0: '',
  1: '个人',
  2: '企业'
}

export const invoiceStyle = {
  0: '',
  1: '电子发票',
  2: '纸质发票'
}

export const shippingMethodTit = {
  0: '',
  1: '上门自提',
  2: '快递'
}

export const payMethod = {
  alipayWeb: 1, // 支付宝网页支付
  alipayH5: 2, // 支付宝H5支付
  alipayApp: 3, // 支付宝APP支付
  wxScan: 4, // 微信扫码支付
  wxApp: 5, // 微信APP支付
  wxMp: 6, // 微信公众号支付
  wxMini: 7 // 微信小程序
}

export const emptyStatus = {
  cart: '您的购物车是空的',
  order: '您还没有订单',
  search: '对不起，你搜索的商品还未上架',
  collect: '您还没有任何收藏',
  addr: '您还没有添加任何地址',
  comment: '该商品还没有人写评价'
}
export const discoverTabEnum = {
  0: '451710019054862336', // 推荐
  1: '451710309661409280', // 酒店用品
  2: '451710425503891456', // 居家用品
  3: '451710458517258240' // 限时购
}

export const recommendEnum = {
  0: '451746028274581504', // 热门活动
  1: '451746078962745344', // 新品发布
  2: '456161630699388928', // 热闻一览
  3: '460814060737265664' // 为你优选
}

export const hotelEnum = {
  0: '451746249788358656', // 五星品质
  1: '451746286819868672' // 五星酒店
}
export const homeEnum = {
  0: '451746377349726208', // 家居精选
  1: '451746418802032640', // 定制家具
  2: '456788161851293696' // 热销推荐
}

export const mainEnum = {
  0: '1', // 故事
  1: '2', // 国际品牌
  2: '3' // 发现
}

export const detailsEnum = {
  articleCategoryId: '505072580818894848' // 感兴趣的活动
}
