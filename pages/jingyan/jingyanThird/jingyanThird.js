const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    bianhao:'',
    activeNav:0,
    arr:[{title:'检验结论',name:'detail',val:''},{title:'检验仪器及编号',name:'bianhao',val:''}],
    navInfo:{
      type:2,
      step:3
    },
    dateEnd:''
  },
  setGaiyao(e){
    let index=this.data.activeNav
    let arr=this.data.arr
    arr[index].val=e.detail.value
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
    }
  },
  checkitem(e){
    this.setData({
      activeNav:e.currentTarget.dataset.index
    })
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
    util.nextStepCommon(this,'arr2','/pages/jingyan/jingyan/jingyan','arr')
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