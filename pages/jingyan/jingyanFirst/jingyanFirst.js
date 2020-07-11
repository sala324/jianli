const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    dateEnd:'',
    index:0,
    activeNav:'name',
    array:['材料','工序'],
    array2:['桩基工程1','桩基工程2','桩基工程部位2','桩基工程部位3'],
    array3:['工程1队','工程2队','工程31队','工程4队'],
    index2:0,
    index3:0,
    navInfo:{
      type:2,
      step:1
    },
    shuru:false
  },
  chooseItem(e){
    let name=e.currentTarget.dataset.name
    this.setData({
      activeNav:name
    })
  },
  changeValue(e){
    let name=e.currentTarget.dataset.name
    this.setData({
      [name]:e.detail.value,
      activeNav:name
    })
    console.log(this.data.activeNav)
  },
  setGaiyao(e){
    let name=this.data.activeNav
    this.setData({
      [name]:e.detail
    })
  },
  gongXuChange(e){
    this.setData({
      index1:e.detail.value
    })
  },
  gongXuChange2(e){
    this.setData({
      index2:e.detail.value
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        reset:true
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    util.nextStepCommon(this,'title','/pages/pangzhan/pangzhanSecond/pangzhanSecond')
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