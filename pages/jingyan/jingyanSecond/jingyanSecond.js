const util = require('../../../utils/util');
Page({
  data: {
    navInfo:{
      type:2,
      step:2
    },
    arr:[{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''}],
    dateEnd:''
  },
  changeRemarks(e){
    let index=e.currentTarget.dataset.index
    let arr=this.data.arr
    arr[index].remarks=e.detail.value
    this.setData({
      arr:arr
    })
    console.log(this.data.arr)
  },
  changeState(e){
    let index=e.currentTarget.dataset.index
    let arr=this.data.arr
    arr[index].result=!arr[index].result
    this.setData({
      arr:arr
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
      index4:index2,
      oldValues:e.detail.value
    })
  },
  setGaiyao(e){
    let arr=this.data.arr
    let index=this.data.index3
    let index2=this.data.index4
    arr[index].items[index2].val=this.data.oldValues+e.detail
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
      wx.setNavigationBarTitle({
        title: '修改平行经验-第二步',
      })
    }
    
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    util.nextStepCommon(this,'arr','/pages/jingyan/jingyanThird/jingyanThird','arr')
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