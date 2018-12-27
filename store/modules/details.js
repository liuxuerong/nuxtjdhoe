const details = {
  state: {
    popupVisible: false,
    nowPrice: '',
    maxCount: Number
  },
  mutations: {
    changePopupVisible(state, popupVisible) {
      state.popupVisible = popupVisible
    },
    changeNowPrice(state, price) {
      state.nowPrice = price
    },
    changeMaxCount(state, count) {
      state.maxCount = count
    }
  }
}
export default details
