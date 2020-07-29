const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    authority:true
  },
  login(e) {
    let me = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权您将无法登陆',
        success: function (res) { }
      })
    } else {
      if(me.data.code==='213213'){
        util.requests('/m_login',{mobile:'13476065640',password:'213213'},'post').then(res=>{
          if(res.data.code==0){
            try {
              wx.setStorageSync('test', 'testAccount');
              wx.setStorageSync('token', 'Bearer '+res.data.data.data.token);
              wx.setStorageSync('user', res.data.data.data.user);
              wx.setStorageSync('hearderToken', 'Bearer '+res.data.data.data.token);
            } catch (e) {
              console.log('存储失败！')
            }
            me.setData({
              userInfo:res.data.data.user
            })
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        })
      } else {
        wx.login({
          success: res => {
            if (res.code) {
              util.request('/login', {
                code: res.code,
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData,
                pwd:me.data.code
              }, 'post').then(res => {
                if (res.data.code == 0) {
                  try {
                    wx.setStorageSync('token', 'Bearer '+res.data.data.token);
                    wx.setStorageSync('user', res.data.data.user);
                    wx.setStorageSync('hearderToken', 'Bearer '+res.data.data.token);
                  } catch (e) {
                    console.log('存储失败！')
                  }
                  me.setData({
                    userInfo:res.data.data.user
                  })
                  wx.redirectTo({
                    url: '/pages/index/index',
                  })
                } else if(res.data.code==402){
                    wx.navigateTo({
                      url: '/pages/noAuthority/noAuthority',
                    })
                } else {
                  util.toasts(message,2000)
                }
              })
            }
          }
        });
      }
      
    }
  },
  nextStep(){
    util.toasts('请输入6位数密码')
    // if(this.data.code.length<6){
    //   util.toasts('请输入6位数密码')
    // } else if(this.data.authority){
    //   wx.reLaunch({
    //     url: '/pages/index/index',
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/noAuthority/noAuthority',
    //   })
    // }
  },
  changeCode(e){
    this.setData({
      code:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this
    wx.getSetting({
      success(res) {
        console.log(res)
        let name='scope.record'
        if(res.authSetting[name]===false){
          that.setData({
            authority:false
          })
          
        } else {
          that.setData({
            authority:true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})