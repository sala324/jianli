// pages/pangzhan/pangzhan.js
Page({
  data: {
    showCopy:false,
    detail:'日志详情222',
    shiyou:'shiyou',
    content:'content',
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'2020-05-06 ',
      reset:true
    },
    imgArr:['../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png']
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail),
    })
  },
  delItem(e){
    this.data.imgArr.splice(e.detail,1)
    this.setData({
      imgArr:this.data.imgArr
    })
  },
  showCopyBtn(){
    this.setData({
      showCopy:true
    })
  },
  hideCopy(e){
    this.setData({
      showCopy:e.detail
    })
  },
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