let plugin = requirePlugin("QCloudAIVoice");
let manager = plugin.getRecordRecognitionManager()
plugin.setQCloudSecret(1302214974, 'AKIDvafTyD2uf9O5Wdie4C2gYDYhbFdN799s', 'e2A2eHdttbMrFNE8lIYquze3BNek59xO', true); 
const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    itemCheck:'aa',
    index1:0,
    oldValues:'',
    navInfo:{
      type:3,
      step:2
    },
    arr:[{name:'aa',val:'',tips:'输入1'},{name:'bb',val:'',tips:'输入2'},{name:'cc',val:'',tips:'输入33333'},{name:'dd',val:'',tips:'输入4444'},{name:'ee',val:'',tips:'输入555555'}],
    dateEnd:''
  },
  delItem(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].val=''
    this.setData({
      index1:index,
      arr:arr,
      oldValues:''
    })
  },
  changeItem(e){
    let index=e.currentTarget.dataset.index
    let oldValues=this.data.arr[index].val
    this.setData({
      index1:index,
      oldValues:oldValues
    })
  },
  addValue(e){
    this.setData({
      oldValues:this.data.oldValues+e.detail
    })
  },
  changeValue(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].val=e.detail.value
    this.setData({
      arr:arr,
      index1:index,
      oldValues:e.detail.value
    })
  },
  setGaiyao(e){
    let arr=this.data.arr
    let index=this.data.index1
    arr[index].val=this.data.oldValues+e.detail
    this.setData({
      arr:arr,
      oldValues:this.data.oldValues+e.detail
    })
  },
  getmodule(){
    util.requests('/module',{tid:11}).then(res=>{
      console.log(res)
    })
  },
  onLoad(options){
    if(options.position){
      this.setData({ 
        proejct_id:options.proejct_id,
        position:options.position,
        open_date:options.open_date
      })
    }
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        oldValues:JSON.parse(options.default)[0].val,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第二步',
      })
    }
    this.getmodule()
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    let next=true
    this.data.arr.forEach(item=>{
      if(!item.val){
        next=false
        return util.toasts('请确认全部输入完毕')
      }
    })
    if(next){
      util.nextStepCommon(this,'arr','/pages/xunshi/xunshiThird/xunshiThird?open_date='+this.data.date+'&position='+this.data.position+'&proejct_id='+this.data.proejct_id+'&assess='+this.data.arr,'arr')
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getmodule(){
    util.requests('/module',{tid:11}).then(res=>{
      console.log(res)
    })
  },
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