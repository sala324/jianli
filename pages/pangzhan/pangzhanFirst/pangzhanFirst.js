const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    dateEnd:'',
    gongXuArr:['桩基工程','桩基工程1','桩基工程2','桩基工程3'],
    info:{
      index:0,
      title:'工程名称12',
      id:'0089456',
      date:'2020/7/12',
      weather:'阴天有雨，35度',
      shigong:'供电局施工队',
      startTime:'18:20',
      endTime:'18:50',
    },
    navInfo:{
      type:1,
      step:1
    },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.position=e.detail
    this.setData({
      info:info
    })
  },
  onLoad(options){
    if(options.default){
      let info=JSON.parse(options.default)
      info.index=this.data.gongXuArr.findIndex((item,index,arr)=>{
        return item==info.process
      })
      this.setData({
        info:info,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第一步',
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    util.nextStepCommon(this,'info','/pages/pangzhan/pangzhanSecond/pangzhanSecond','info')
  },
  changeItem(e){
    let info=this.data.info
    let name=e.currentTarget.dataset.name
    info[name]=e.detail.value
    if(name=='index'){
      info.process=this.data.gongXuArr[e.detail.value]
    }
    this.setData({
      info: info
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
    if(!this.data.reset){
      let info=this.data.info
      info.startTime=util.formatTime(new Date())
      info.endTime=util.formatTime2(new Date())
      info.date=util.formatDate(new Date())
      info.dateEnd=util.formatDate(new Date())
      console.log(info)
      this.setData({
        info:info
      })
    }
    
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