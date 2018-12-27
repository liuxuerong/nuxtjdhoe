// 分类及商品列表
import { GOODSLISTDATA } from '../mutations-types'
import { goodsListData } from '~/util/const'
const goodsList = {
  state: {
    [goodsListData]: {}
  },
  mutations: {
    [GOODSLISTDATA](state, data) {
      state[goodsListData] = data
    }
  }
}
export default goodsList
