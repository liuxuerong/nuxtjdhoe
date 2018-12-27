// 体验馆
import { EXPERIENCES } from '../mutations-types'
import { experienceData } from '~/util/const'
const hall = {
  state: {
    [experienceData]: {}
  },
  mutations: {
    [EXPERIENCES](state, data) {
      state[experienceData] = data
    }
  }
}
export default hall
