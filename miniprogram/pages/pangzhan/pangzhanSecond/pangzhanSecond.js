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
      type:1,
      step:2
    },
    arr:[{name:'aa',val:'',tips:'输入1'},{name:'bb',val:'',tips:'输入2'},{name:'cc',val:'',tips:'输入33333'},{name:'dd',val:'',tips:'输入4444'},{name:'ee',val:'',tips:'输入555555'},{name:'ff',val:'',tips:'输入33333'},{name:'gg',val:'',tips:'输入4444'},{name:'11',val:'',tips:'输入555555'}],
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
    util.requests('/module',{tid:1}).then(res=>{
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
    if(options.step1Value){
      console.log(JSON.parse(options.step1Value))
      this.setData({
        step1Value:JSON.parse(options.step1Value)
      })
      this.getmodule()
    }
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第二步',
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value,
      oldValues:e.detail.value
    })
  },
  resetInfo(id){
    util.requests('jxm9/'+id,{
      config:this.data.arr
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
          url: '/pages/pangzhan/pangzhanThird/pangzhanThird?step1Value='+JSON.stringify(this.data.step1Value)+'&config='+JSON.stringify(this.data.arr),
        })
      }
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
      start_time:util.formatTime(new Date()),
      end_time:util.formatTime2(new Date()),
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