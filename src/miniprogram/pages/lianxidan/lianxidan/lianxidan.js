const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    detail:'日志详情222',
    shiyou:'shiyou',
    content:'内容香香你赶快来',
    info:{},
    unSign:true,
    idArr:[],
    imgArr:[]
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail)+'&id='+this.data.info.id,
    })
  },
  setItem(e){
    util.requests('/deleteFile/'+e.detail,{},'post').then(res=>{
      if(res.data.code===0){
        util.toasts(res.data.message)
        this.detailInfo(this.data.id)
      }
    })
    this.setData({
      imagesArr:e.detail
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
  detailInfo(id){
    util.requests('/jxm8/'+id).then(res=>{
      if(res.data.code==0){
        let imgArr=res.data.data.images.map(item=>{return item.url})
        let idArr=res.data.data.images.map(item=>{return item.id})
        let info=JSON.parse(JSON.stringify(res.data.data,['id','code','open_date','matter','unit_id','project_id']))
        
        info.reset=true
        info.name=res.data.data.project.name
        info.unitName=res.data.data.unit.name
        this.setData({
          info:info,
          imgArr:imgArr,
          project_log_id:res.data.data.project_log_id,
          idArr:idArr,
          note:res.data.data.note
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {
    this.detailInfo(this.data.id)
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