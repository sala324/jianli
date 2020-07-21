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
    arr:[],
    dateEnd:''
  },
  delItem(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].values=''
    this.setData({
      index1:index,
      arr:arr,
      oldValues:''
    })
  },
  changeItem(e){
    let index=e.currentTarget.dataset.index
    let oldValues=this.data.arr[index].values
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
    arr[index].values=e.detail.value
    this.setData({
      arr:arr,
      index1:index,
      oldValues:e.detail.value
    })
  },
  setGaiyao(e){
    let arr=this.data.arr
    let index=this.data.index1
    arr[index].values=this.data.oldValues+e.detail
    this.setData({
      arr:arr,
      oldValues:this.data.oldValues+e.detail
    })
  },
  getmodule(){
    let tid=wx.getStorageSync('logId')
    util.requests('/module',{tid:tid}).then(res=>{
      let arr=res.data.data[0].work[0].config
      let arr1=[]
      arr.forEach((item,index)=>{
        let json={}
        json.configuration_id=item.working_id
        json.values=''
        json.about=item.name
        arr1.push(json)
      })
      this.setData({
        arr:arr1
      })
    })
  },
  onLoad(options){
    if(options.position){
      this.getmodule()
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
        reset:true,
        id:options.id
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第二步',
      })
    }
    
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  resetInfo(id){
    util.requests('/jaq/'+id,{config:this.data.arr},'put').then(res=>{
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
    let next=true
    this.data.arr.forEach(item=>{
      if(!item.values){
        next=false
        return util.toasts('请确认全部输入完毕')
      }
    })
    if(next){
      if(this.data.reset){
        this.resetInfo(this.data.id)
      } else {
        wx.navigateTo({
          url: '/pages/xunshi/xunshiThird/xunshiThird?open_date='+this.data.open_date+'&position='+this.data.position+'&proejct_id='+this.data.proejct_id+'&config='+JSON.stringify(this.data.arr),
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
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