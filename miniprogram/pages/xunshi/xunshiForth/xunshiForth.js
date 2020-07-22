const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    navInfo:{
            type:3,
            step:4
          },
    dateEnd:''
  },
  setGaiyao(e){
    this.setData({
      detail:e.detail
    })
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  onLoad: function (options) {
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        reset:true
      })
    }
  },
  nextStep(){
    util.nextStepCommon(this,'cuoshi','/pages/xunshi/xunshi/xunshi')
    
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
    this.setData({
      start_time:util.formatTime(new Date()),
      end_time:util.formatTime2(new Date()),
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