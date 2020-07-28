const app = getApp()
const util = require('../../utils/util');
Page({
  data: {
    showAll:false,
    size:5,
    index:1,
    projectArr:[],
    projectArr2:[]
  },
  //事件处理函数
  turnDetail(e) {
    wx.setStorageSync('pid', e.currentTarget.dataset.id)
    wx.setStorageSync('pname', e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '/pages/projectDetail/projectDetail?id='+e.currentTarget.dataset.id
    })
  },
  judgeUser(){
    let that=this
    wx.login({
      success: res => {
        util.requests('/getWxLogin',{code:res.code},'post').then(res=>{
          
          if(res.data.code===10101){
            that.setData({
              login:false
            })
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            if (res.data.code == 0) {
              try {
                wx.setStorageSync('token', 'Bearer '+res.data.data.token);
                wx.setStorageSync('user', res.data.data.user);
                wx.setStorageSync('hearderToken', 'Bearer '+res.data.data.token);
              } catch (e) {
                console.log('存储失败！')
              }
              this.setData({
                userInfo:res.data.data.user
              })
              this.projectList()
            }
            that.setData({
              login:true
            })
          }
        })
      }
    })
  },
  projectList(){
    util.requests('/project',{pageSize:this.data.size,pageIndex:this.data.index}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach(item=>{
          item.logo=item.name.slice(0,1)
        })
        this.setData({
          projectArr:res.data.data.data
        })
      } else if(res.data.code==101011){
        console.log(111)
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  onShow(){
    
  },
  onLoad: function () {
    // wx.cloud.callFunction({
    //   name: 'openid',
    //   data: {}
    // }).then(res => {
    //   console.log(res);
    // })
    if(wx.getStorageSync('token')){
      this.setData({
        userInfo:wx.getStorageSync('user')
      })
      this.projectList()
    } else {
      this.judgeUser()
    }
    
  },
})
