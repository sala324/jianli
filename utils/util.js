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
  // that指传过来页面的this
  // val指从详情页跳过来修改详情，当前页修改上个页面的值的属性
  // path指通过下一步进来页面下一步应该跳的路径
  // val2指页面传过来值的属性值
  if(that.data.reset){
    // 从详情页跳过来修改详情
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    if(val2){
      prevPage.setData({
        [val]:that.data[val2]
      });
      console.log(that.data[val])
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
