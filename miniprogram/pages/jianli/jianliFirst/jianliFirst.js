const util = require('../../../utils/util');
Page({
  data: {
    authority:true,
    dateEnd:'',
    oldValues:'',
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'',
      detail:''
    },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.detail=this.data.oldValues+e.detail
    this.setData({
      info:info,
      oldValues:this.data.oldValues+e.detail,
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        info:JSON.parse(options.default),
        oldValues:JSON.parse(options.default).detail,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改监理日志详情',
      })
    }
  },
  changeDetail(e){
    let info=this.data.info
    info.detail=e.detail.value
    this.setData({
      info:info
    })
  },
  nextStep(){
    util.nextStepCommon(this,'info','/pages/jianli/jianli/jianli','info')
  },
  bindDateChange(e){
    let info=this.data.info
    info.date=e.detail.value
    this.setData({
      info: info
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
    let that=this
    wx.getSetting({
      success(res) {
        console.log(res)
        let name='scope.record'
        if(res.authSetting[name]===false){
          that.setData({
            authority:false
          })
          
        } else {
          that.setData({
            authority:true
          })
        }
      }
    })
    if(!this.data.reset){
      let info=this.data.info
      info.date=util.formatDate(new Date())
      this.setData({
        info:info
      })
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
    })
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