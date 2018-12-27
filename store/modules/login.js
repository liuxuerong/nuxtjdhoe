// 登录
const login = {
  state: {
    token: '22222'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    setToken: ({ commit }, token) => {
      commit('setToken', token)
    }
  }
}
export default login
