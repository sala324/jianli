// pages/pangzhan/pangzhan.js
Page({
  data: {
    showCopy:false,
    title:'旁站监理的部位或工序:电缆管群、电缆井土石方开挖',
    des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。施工现场工器具满足施工要求，作业人员安全防护用品佩戴正确齐全。施工现场布置有标识牌、警示牌、夜间警示灯及安全防护栏杆。土方开挖专项方案已审批。检查施工现场作业票填写情况，作业票填写规范并已全员签字，安全交底已落实，施工现场布置符合安全文明施工要求。现场监理人员检查基坑边坡已按设计要求进行支护，机械运土及铲土时，有严禁在基坑周边行走运载车辆的管理措施，上下基坑有安全通道，基坑有良好的排水措施，基',
    wenti:'暂无问题',
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'2020-05-06 ',
      weather:'有雨，28度',
      danwei:'供电局施工队',
      startTime:'2020-05-06 12:45',
      endTime:'2020-05-06 13:45',
      question:'无',
      date2:'2020-05-06',
      reset:true
    },
    imgArr:['../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png']
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+e.currentTarget.dataset.detail,
    })
  },
  resetDetail1(){
    wx.navigateTo({
      url: '/pages/pangzhanFirst/pangzhanFirst',
    })
  },
  resetDetail1(){
    wx.navigateTo({
      url: '/pages/pangzhanFirst/pangzhanFirst',
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