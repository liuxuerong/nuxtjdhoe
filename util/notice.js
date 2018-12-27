const notice = {
  alert: (obj, title = '提示', message, showFn, hideFn) => {
    return obj.$Dialog
      .confirm({
        title,
        message
      })
      .then(() => {
        if (typeof showFn === 'function') {
          showFn()
        }
        obj.$Dialog.close
      })
      .catch(() => {
        if (typeof hideFn === 'function') {
          hideFn()
        }
        obj.$Dialog.close
      })
  },
  errorModal: (obj, message, hideFn) => {
    return obj.$Dialog
      .alert({
        message
      })
      .then(() => {
        if (typeof hideFn === 'function') {
          hideFn()
        }
        obj.$Dialog.close
      })
  },
  loading: (obj, message = 'loading') => {
    return obj.$Toast.loading({
      duration: 0,
      mask: true,
      message
    })
  },
  loadingHide: obj => {
    return obj.$Toast.clear()
  },
  // 操作弹窗
  // 操作框标题，操作框内容，确定按钮的回调函数
  confirm: (obj, title, message, confirmGoods) => {
    return obj.$Dialog
      .confirm({
        title,
        message
      })
      .then(() => {
        if (typeof confirmGoods === 'function') {
          showFn()
        }
        obj.$Dialog.close
      })
      .catch(() => {
        // on cancel
        obj.$Dialog.close
      })
  },
  // 提示框
  // 提示内容，显示时间，提示框类型，提示框关闭后的回调函数
  // type 可选值 success, warn, cancel, text
  toast: (obj, message) => {
    return obj.$toast(message)
  }
}

export default notice
