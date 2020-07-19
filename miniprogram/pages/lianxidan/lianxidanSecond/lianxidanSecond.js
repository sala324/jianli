const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    oldValues:'',
    navInfo:{
      type:4,
      step:2
    },
    dateEnd:''
  },
  setGaiyao(e){
    let detail=this.data.oldValues+e.detail
    this.setData({
      detail:detail,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    if(options.matter){
      this.setData({
        matter:options.matter,
        open_date:options.open_date,
        proejct_id:options.proejct_id,
        units:options.units
      })
    }
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        oldValues:JSON.parse(options.default),
        reset:true
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value,
      oldValues:e.detail.value
    })
  },
  setJxm8(){
    util.requests('/jxm8',{
      matter:this.data.matter,
      open_date:this.data.open_date,
      proejct_id:this.data.proejct_id,
      unit_id:this.data.units,
      note:this.data.detail,
      log_type_id:3
    },'post').then(res=>{
      if(res.data.code==0){
        util.nextStepCommon(this,'content','/pages/lianxidan/lianxidan/lianxidan?id=1')
      }
    })
  },
  nextStep(){
    if(this.data.detail.trim().length>0){
      this.setJxm8()
      util.nextStepCommon(this,'content','/pages/lianxidan/lianxidan/lianxidan')
    } else {
      return util.toasts('内容不能为空')
      
    }
    
    
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