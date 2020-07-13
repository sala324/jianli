const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    bianhao:'',
    oldValues:'',
    activeNav:0,
    arr:[{title:'现场存在问题',name:'detail',val:''},{title:'监理有关措施',name:'bianhao',val:''}],
    navInfo:{
      type:3,
      step:3
    },
    dateEnd:''
  },
  
  checkitem(e){
    let index=e.currentTarget.dataset.index
    let oldValues=this.data.arr[index].val
    this.setData({
      activeNav:index,
      oldValues:oldValues
    })
  },
  setGaiyao(e){
    let arr=this.data.arr
    let index=this.data.activeNav
    arr[index].val=this.data.oldValues+e.detail
    this.setData({
      arr:arr,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        oldValues:JSON.parse(options.default)[0].val,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改巡视记录-第三步',
      })
    }
  },
  changeDetail(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].val=e.detail.value
    this.setData({
      arr:arr
    })
    console.log(this.data.arr)
  },
  nextStep(){
    util.nextStepCommon(this,'arr2','/pages/xunshi/xunshi/xunshi','arr')
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