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
    reset:false,
    baseInfo:{
      name:'',
      actory:'',
      size:'',
      position:''
    },
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
    let info=this.data.baseInfo
    info[name]=e.detail.value
    this.setData({
      baseInfo:info,
      activeNav:name
    })
    console.log(this.data.activeNav)
  },
  setGaiyao(e){
    let name=this.data.activeNav
    let info=this.data.baseInfo
    info[name]=e.detail
    this.setData({
      baseInfo:info
    })
  },
  changeItem(e){
    let info=this.data.baseInfo
    info[e.currentTarget.dataset.name]=e.currentTarget.dataset.arr[e.detail.value]
    this.setData({
      [e.currentTarget.dataset.index]:e.detail.value
    })
  },
  onLoad(options){
    if(options.default){
      let info=JSON.parse(options.default)
      if(info.type==1){
        //工序
        let index=this.data.array3.findIndex((val,index)=>{
          return val==info.buildUnits
        })
        let index2=this.data.array2.findIndex((val,index)=>{
          return val==info.processName
        })
        this.setData({
          index3:index,
          index2:index2,
        })
      }
      this.setData({
        baseInfo:info,
        reset:true,
        index:Number(info.type)
      })
      wx.setNavigationBarTitle({
        title: '修改平行经验-第一步',
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    util.nextStepCommon(this,'baseInfo','/pages/jingyan/jingyanSecond/jingyanSecond','baseInfo')
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
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