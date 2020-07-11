const util = require('../../../utils/util');
Page({
  data: {
    navInfo:{
      type:4,
      step:1
    },
    index:0,
    detail:'',
    dateEnd:'',
    shuru:false,
    array:['第一分队','第二分队','第三分队','第四分队','第五分队']
  },
  setGaiyao(e){
    this.setData({
      detail:e.detail
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改工作联系单',
      })
    }
  },
  bindUnitChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    util.nextStepCommon(this,'shiyou','/pages/lianxidan/lianxidanSecond/lianxidanSecond')
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