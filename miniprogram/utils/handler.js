const baseFaultHandler = (title = '数据加载失败', duration = 1500, handleAfterToast = () => {}) => {
  wx.showToast({
    title,
    icon: 'error',
    duration,
  })
  setTimeout(handleAfterToast, duration)
}

const baseLoadingHandler = (title =  '数据加载中...', onCompleted = () => {}) => {
  wx.showLoading({
    title,
    icon: 'loading',
    complete: onCompleted
  })
}

module.exports.baseFaultHandler = baseFaultHandler;
module.exports.baseLoadingHandler = baseLoadingHandler;