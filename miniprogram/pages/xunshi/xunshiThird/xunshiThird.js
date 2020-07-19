const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    bianhao:'',
    oldValues:'',
    activeNav:0,
    arr:[{title:'现场存在问题',name:'matter',val:''},{title:'监理有关措施',name:'measures',val:''}],
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
    let that=this
    if(options.position){
      that.setData({
        proejct_id:options.proejct_id,
        assess:options.assess,
        position:options.position,
        open_date:options.open_date
      })
    }
    if(options.default){
      let arr=JSON.parse(options.default)
      console.log(arr)
      that.setData({
        arr:arr,
        oldValues:arr[0].val,
        matter:arr[0].val,
        measures:arr[1].val,
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
    let name=arr[index].name
    this.setData({
      arr:arr,
      [name]:e.detail.value
    })
    console.log(this.data.arr)
  },
  createJaq(){
    wx.navigateTo({
      url: '/pages/xunshi/xunshi/xunshi',
    })
    // util.requests('/jaq',{
    //   position:this.data.position,
    //   matter:this.data.matter,
    //   measures:this.data.measures,
    //   assess:this.data.assess,
    //   open_date:this.data.open_date,
    //   proejct_id:this.data.proejct_id,
    //   log_type_id:1
    // }).then(res=>{
    //   if(res.data.code===0){
    //     wx.navigateTo({
    //       url: '/pages/xunshi/xunshi/xunshi?id='+res.data.data.id,
    //     })
    //   }
    // })
  },
  resetJaq(){
    wx.navigateBack({
      complete: (res) => {
        util.toasts('修改成功')
      },
    })
    // util.requests('/jaq/'+this.data.id,{
    //   matter:this.data.matter,
    //   measures:this.data.measures,
    //   proejct_id:this.data.proejct_id,
    //   id:this.data.id,
    // },'put').then(res=>{
    //   if(res.data.code===0){
    //     wx.navigateBack({
    //       complete: (res) => {
    //         util.toasts('修改成功')
    //       },
    //     })
    //   }
    // })
  },
  nextStep(){
    if(this.data.measures&&this.data.matter){
      if(this.data.reset){
        this.resetJaq()
      } else {
        this.createJaq()
      }
    } else {
      util.toasts('请填写完整')
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