const app = getApp();
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
//获取token
const getToken = n => {
  let hearderToken = '';
  try {
    hearderToken = wx.getStorageSync('hearderToken');
  } catch (e) {
    console.log('获取本地存储失败！')
  }
  return hearderToken;
}
const dialog = n => {
  wx.showModal({
    title: n,
    content: '',
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  })
}
//去登陆
const login = () => {
  wx.navigateTo({
    url: '/pages/public/login/login',
  })
}
//错误处理
const err = (title) => {
  wx.showModal({
    title: title,
    showCancel: false
  });
}
const toasts = (title,time=2000) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: time
  })
}
const toasts2 = (title, time = 2000) => {
  wx.showToast({
    title: title,
    duration: time
  })
}
const request = (url, data, method)=>{
  wx.showLoading({
    title: '加载中',
  })
  let token = getToken();
  let apiHost = app.globalData.apiHost;
  // let apiHost = 'https://api.dxiahome.com/api';
  method = method||'GET';
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.apiHost+url,
      data: data,
      method: method,
      header: {
        'X-Token': token // 默认值
      },
      success(res){
        resolve(res)
        wx.hideLoading();
      },
      fail(res){
        reject(res);
      },
      complete: function () {
        
      }
    });
  });
}
const requests = (url, data, method, hideToast) => {
  let hearderToken = getToken();
  let apiHost = app.globalData.apiHost;
  method = method || 'GET';
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.apiHost + url,
      data: data,
      method: method,
      header: {
        'Authorization': hearderToken // 默认值
      },
      success(res) {
        if(res.data.code==0){
          resolve(res)
        } else {
          if(res.data.code==10101){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            toasts(res.data.message)
          }
          
        }
        
      },
      fail(res) {
        toasts('网络超时请稍后再试')
      },
      complete: function () {

      }
    });
  });
}
module.exports = {
  request,
  requests,
  getToken,
  login,
  err,
  toasts,
  toasts2,
  dialog,
  formatTime,
  formatDate,
  formatTime2,
  nextStepCommon,
  toasts
}
