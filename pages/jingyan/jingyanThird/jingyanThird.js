const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    bianhao:'',
    activeNav:'detail',
    arr:[{title:'发现问题及时处理',name:'detail',val:''},{title:'发现问题及时处理',name:'bianhao',val:''}],
    navInfo:{
      type:2,
      step:3
    },
    dateEnd:''
  },
  setGaiyao(e){
    let name=this.data.activeNav
    this.setData({
      [name]:e.detail
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
  checkitem(e){
    let activeNav=e.currentTarget.dataset.name
    this.setData({
      activeNav:activeNav
    })
  },
  changeDetail(e){
    let name=e.currentTarget.dataset.name
    let activeNav=e.currentTarget.dataset.name
    this.setData({
      [name]:e.detail.value,
      activeNav:activeNav
    })
  },
  nextStep(){
    util.nextStepCommon(this,'arr','/pages/pangzhan/pangzhan/pangzhan','arr')
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