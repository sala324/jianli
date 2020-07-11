// pages/pangzhan/pangzhan.js
Page({
  data: {
    showCopy:false,
    title:'旁站监理的部位或工序:电缆管群、电缆井土石方开挖',
    arr:[
      {
        title:'一、作业必备条件检查',
        items:[{name:'aa',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路'},{name:'bb',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路2'},{name:'cc',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路3'}]
    },
    {
      title:'二、作业必备条件检查2',
      items:[{name:'dd',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路4'},{name:'ee',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路5'},{name:'ff',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路6'},{name:'dd',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路4'},{name:'ee',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路5'},{name:'ff',val:'核对杆号或停电间隔及回路核对杆号或停电间隔及回路6'}]
  }
  ],
    arr2:[{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:false},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},],
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