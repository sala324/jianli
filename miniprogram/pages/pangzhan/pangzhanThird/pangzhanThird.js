const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    arr:[{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:false},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true}],
    navInfo:{
      type:1,
      step:3
    },
    dateEnd:''
  },
  resetState(e){
    let arr=this.data.arr
    console.log(arr)
    console.log(e.currentTarget.dataset.index)
    console.log(arr[e.currentTarget.dataset.index])
    arr[e.currentTarget.dataset.index].checked=!arr[e.currentTarget.dataset.index].checked
    this.setData({
      arr:arr
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第三步',
      })
    }
    if(options.step1Value){
      this.setData({
        step1Value:JSON.parse(options.step1Value),
        config:JSON.parse(options.config),
      })
    }
  },
  nextStep(){
    util.nextStepCommon(this,'arr2','/pages/pangzhan/pangzhanfourth/pangzhanfourth','arr')
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