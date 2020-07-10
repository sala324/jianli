const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    itemCheck:'aa',
    index3:0,
    index4:0,
    navInfo:{
      type:1,
      step:2
    },
    arr:[
      {
        title:'一、作业必备条件检查',
        items:[{name:'aa',val:''},{name:'bb',val:''},{name:'cc',val:''}]
    },
    {
      title:'二、作业必备条件检查2',
      items:[{name:'dd',val:''},{name:'ee',val:''},{name:'ff',val:''}]
  }
  ],
    dateEnd:''
  },
  changeItem(e){
    let index=e.currentTarget.dataset.index3
    let index2=e.currentTarget.dataset.index4
    this.setData({
      index3:index,
      index4:index2
    })
  },
  changeValue(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index3
    let index2=e.currentTarget.dataset.index4
    arr[index].items[index2].val=e.detail.value
    this.setData({
      arr:arr,
      index3:index,
      index4:index2
    })
  },
  setGaiyao(e){
    let arr=this.data.arr
    let index=this.data.index3
    let index2=this.data.index4
    arr[index].items[index2].val=e.detail
    this.setData({
      arr:arr
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        detail:options.default,
        reset:true
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    util.nextStepCommon(this,'des','/pages/pangzhan/pangzhanThird/pangzhanThird')
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