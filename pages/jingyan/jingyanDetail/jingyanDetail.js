const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    baseInfo:{
      title:'工程名称1',
      id:'0098645',
      date:'2020-05-06',
      type:1,
      name:'材料名称1',
      size:'材料部位1',
      actory:'厂家1',
      position:'部位1',
      processName:'桩基工程2',
      buildUnits:'工程2队',
      reset:false
    },
    arr2:[{title:'检验结论',name:'detail',val:'结论1'},{title:'检验仪器及编号',name:'bianhao',val:'材料编号'}],
    title:'旁站监理的部位或工序:电缆管群、电缆井土石方开挖',
    arr:[{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''}],
    wenti:'暂无问题',
    imgArr:['../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png']
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail),
    })
  },
  delItem(e){
    this.data.imgArr.splice(e.detail,1)
    this.setData({
      imgArr:this.data.imgArr
    })
  },
  showCopyBtn(){
    this.setData({
      showCopy:true
    })
  },
  hideCopy(e){
    this.setData({
      showCopy:e.detail
    })
  },
  onLoad: function (options) {

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