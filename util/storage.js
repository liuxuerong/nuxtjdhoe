const storage = {
  // 设置本地存储
  setLocalStorage(name, value) {
    const curTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 10
    localStorage.setItem(
      name,
      JSON.stringify({
        data: value,
        time: curTime
      })
    )
  },
  // 获取本地存储
  getLocalStorage(name) {
    const data = localStorage.getItem(name)
    const dataObj = JSON.parse(data)
    if (dataObj) {
      if (new Date().getTime() - dataObj.time > 0) {
        console.log('已过期')
        localStorage.removeItem(name)
        return null
      } else {
        return dataObj.data
      }
    }
  },
  // 获取本地存储没有指定存储时间
  getLocalStorageLong(name) {
    const data = localStorage.getItem(name)
    const dataObj = JSON.parse(data)
    if (dataObj) {
      return dataObj.data
    } else {
      return null
    }
  },
  // 删除本地存储
  delLocalStorage(name) {
    localStorage.removeItem(name)
  }
}

export { storage }
