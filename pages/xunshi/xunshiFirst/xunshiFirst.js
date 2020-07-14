const util = require('../../../utils/util');
Page({
  data: {
    authority:true,
    detail:'',
    oldValues:'',
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'2020-05-06 ',
      position:''
    },
    dateEnd:'',
    navInfo:{
            type:3,
            step:1
          },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.position=this.data.oldValues+e.detail
    this.setData({
      info:info,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    if(options.default){
      let info=JSON.parse(options.default)
      this.setData({
        info:info,
        oldValues:info.position,
        reset:true
      })
    }
  },
  changeDetail(e){
    let info=this.data.info
    info.position=e.detail.value
    this.setData({
      info:info
    })
  },
  bindDateChange(e){
    let info=this.data.info
    info.date=e.detail.value
    this.setData({
      info:info
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  nextStep(){
    util.nextStepCommon(this,'info','/pages/xunshi/xunshiSecond/xunshiSecond','info')
    
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
    if(!this.data.reset){
      let info=this.data.info
      info.date=util.formatDate(new Date())
      info.dateEnd=util.formatDate(new Date())
      this.setData({
        info:info,
        // startTime:util.formatTime(new Date()),
        // endTime:util.formatTime2(new Date()),
      })
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
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