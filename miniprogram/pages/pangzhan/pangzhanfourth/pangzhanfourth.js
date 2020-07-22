const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    oldValues:'',
    navInfo:{
      type:1,
      step:4
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
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        oldValues:JSON.parse(options.default),
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第四步',
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value,
      oldValues:e.detail.value
    })
  },
  resetInfo(id){
    util.requests('jxm9/'+id,{
      start_time:this.data.info.start_time,
      end_time:this.data.info.end_time,
      position:this.data.info.position,
      weather:this.data.info.weather,
    },'put').then(res=>{
      if(res.data.code==0){
        wx.navigateBack({
          complete: (res) => {
            util.toasts('修改成功')
          },
        })
      }
    })
  },
  createLog(){
    let project_id=wx.getStorageSync('token')
    util.requests('/jxm9',{
      start_time:this.data.start_time,
      end_time:this.data.end_time,
      position:this.data.position,
      weather:this.data.weather,
      describe1:this.data.describe1,
      describe2:this.data.describe2,
      outline:this.data.outline,
      opinion:this.data.opinion,
      open_date:this.data.open_date,
      modules_id:this.data.modules_id,
      working_id:this.data.working_id,
      unit_id:this.data.unit_id,
      project_id:project_id,
      log_type_id:this.data.log_type_id,
      config:this.data.config
    },'post').then(res=>{
      if(res.data.code==0){
        wx.relaunch({
          url:'/pages/pangzhan/pangzhan/pangzhan?id='+res.data.data.id
        })
      }
    })
  },
  nextStep(){
    if(this.data.reset){
      this.resetInfo()
    } else {
      util.nextStepCommon(this,'wenti','/pages/pangzhan/pangzhan/pangzhan')
      this.createLog()
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