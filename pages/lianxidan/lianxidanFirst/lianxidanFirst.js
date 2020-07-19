const util = require('../../../utils/util');
Page({
  data: {
    authority:true,
    navInfo:{
      type:4,
      step:1
    },
    info:{
      name:'白沙洲变电枢纽二期项目',
      unit:'第四分队',
      date:'',
      detail:''
    },
    oldValues:'',
    reset:false,
    index:0,
    dateEnd:'',
    shuru:false,
    array:['第一分队','第二分队','第三分队','第四分队','第五分队']
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
        title: '修改工作联系单',
      })
    }
  },
  bindUnitChange: function(e) {
    let info=this.data.info
    info.unit=this.data.array[e.detail.value]
    this.setData({
      info:info,
      index: e.detail.value
    })
  },
  bindDateChange(e){
    let info=this.data.info
    info.date=e.detail.value
    this.setData({
      info:info
    })
  },
  changeDetail(e){
    let info=this.data.info
    info.detail=e.detail.value
    this.setData({
      info:info
    })
  },
  changejaq(){
    util.requests('/jaq/'+this.data.id,{
      matter:this.data.matter,
      open_date:this.data.open_date,
      proejct_id:this.data.proejct_id,
      unit_id:this.data.units,
      log_type_id:3
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
  nextStep(){
    if(this.data.info.detail.trim().length>0){
      
      util.nextStepCommon(this,'info','/pages/lianxidan/lianxidanSecond/lianxidanSecond?matter='+this.data.info.detail+'&open_date='+this.data.info.date+'&proejct_id='+this.data.id+'&units='+this.data.info.unit,'info')
      // this.changejaq()
    } else {
      return util.toasts('事由不能为空')
    }
    
  },
  getUnits(){
    let that=this
    util.requests('/units').then(res=>{
      if(res.data.code==0){
        that.setData({

        })
      }
    })
  },
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