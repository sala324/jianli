const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}
const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}
const formatTime2 = date => {
  const hour = date.getHours()+1
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const toasts = (title,time=2000) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: time
  })
}
const nextStepCommon=(that,val,path,val2)=>{
  if(that.data.reset){
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    if(val2){
      prevPage.setData({
        [val]:that.data[val2]
    });
    } else {
      prevPage.setData({
        [val]:that.data.detail
    });
    }
    
    wx.navigateBack({
      complete: (res) => {},
    })
  } else {
    wx.navigateTo({
      url: path,
    })
  }
}
module.exports = {
  formatTime,
  formatDate,
  formatTime2,
  nextStepCommon,
  toasts
}
