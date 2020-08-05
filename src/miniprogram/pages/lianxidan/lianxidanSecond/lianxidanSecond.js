const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    oldValues:'',
    navInfo:{
      type:4,
      step:2,
      lastStep:true
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
        project_id:options.project_id,
        unit_id:options.units,
        id:options.id
      })
    }
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        oldValues:JSON.parse(options.default),
        id:options.id,
        reset:true
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value,
      oldValues:e.detail.value
    })
    console.log(this.data.detail)
  },
  setJxm8(){
    let logId=wx.getStorageSync('logId')
    util.requests('/jxm8',{
      matter:this.data.matter,
      open_date:this.data.open_date,
      project_id:this.data.project_id,
      unit_id:this.data.unit_id,
      note:this.data.detail,
      log_type_id:logId
    },'post').then(res=>{
      if(res.data.code==0){
        util.nextStepCommon(this,'content','/pages/lianxidan/lianxidan/lianxidan?id='+res.data.data.id)
      }
    })
  },
  nextStep(){
    if(this.data.detail.trim().length>0){
      if(this.data.reset){
        common.resetJaq('/jxm8/'+this.data.id,{
          note:this.data.detail,
          id:this.data.id,
        })
      } else {
        this.setJxm8()
      }
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