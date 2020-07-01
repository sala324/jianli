const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    dateEnd:'',
    shuru:false
  },
  setGaiyao(e){
    this.setData({
      detail:e.detail
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        detail:options.default,
        reset:true
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange1(e){
    this.setData({
      startTime: e.detail.value
    })
  },
  bindTimeChange2(e){
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  nextStep(){
    util.nextStepCommon(this,'buwei','/pages/xunshi/xunshiSecond/xunshiSecond')
    
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      startTime:util.formatTime(new Date()),
      endTime:util.formatTime2(new Date()),
      date:util.formatDate(new Date()),
      dateEnd:util.formatDate(new Date())
    })
    console.log(util.formatTime(new Date()))
    console.log(util.formatTime2(new Date()))
    console.log(util.formatDate(new Date()))
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