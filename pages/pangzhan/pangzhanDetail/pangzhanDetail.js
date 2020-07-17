const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    title:'旁站监理的部位或工序:电缆管群、电缆井土石方开挖',
    arr:[{name:'aa',val:'核对杆号或停电间隔及回路',tips:'输入1'},{name:'bb',val:'核对杆号或停电间隔及回路',tips:'输入2'},{name:'cc',val:'核对杆号或停电间隔及回路',tips:'输入33333'},{name:'dd',val:'核对杆号或停电间隔及回路',tips:'输入4444'},{name:'ee',val:'核对杆号或停电间隔及回路',tips:'输入555555'}],
    arr2:[{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:false},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},],
    wenti:'暂无问题',
    reset:false,
    info:{
      title:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'2020-05-06 ',
      weather:'有雨，28度',
      shigong:'供电局施工队',
      startTime:'12:45',
      endTime:'13:45',
      process:'桩基工程1',
      position:'桩基工程部位1',
      question:'无',
      date2:'2020-05-06',
      reset:false
    },
    imgArr:['../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png']
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail),
    })
  },
  nextStep(){
    wx.navigateTo({
      url: '/pages/pangzhan/pangzhanSign/pangzhanSign',
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