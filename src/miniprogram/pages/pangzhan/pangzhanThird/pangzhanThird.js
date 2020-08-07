const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    arr:[],
    navInfo:{
      type:1,
      step:3
    },
    index1:-1,
    dateEnd:''
  },
  resetState(e){
    let arr=this.data.arr
    arr[e.currentTarget.dataset.index].values=(arr[e.currentTarget.dataset.index].values==0)?1:0
    this.setData({
      arr:arr
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        id:options.id,
        title:options.title,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第三步',
      })
      //导航按钮改为完成
      let navInfo=this.data.navInfo
      navInfo.lastStep=true
      this.setData({
        navInfo:navInfo
      })
    }
    if(options.step1Value){
      this.setData({
        describe1:options.describe1,
        step1Value:JSON.parse(options.step1Value),
        config:JSON.parse(options.config),
        arr:JSON.parse(options.nextArr),
        title:options.title
      })
    }
  },
  changeItem(e){
    let index=e.currentTarget.dataset.index
    this.setData({
      index1:index
    })
  },
  changeValue(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].values=e.detail.value
    this.setData({
      arr:arr,
      index1:index
    })
  },
  nextStep(){
    if(this.data.reset){
      common.resetJaq('/jxm9/'+this.data.id,{
        describe2:JSON.stringify(this.data.arr)
      })
    } else {
      wx.navigateTo({
        url: '/pages/pangzhan/pangzhanfourth/pangzhanfourth?step1Value='+JSON.stringify(this.data.step1Value)+'&config='+JSON.stringify(this.data.config)+'&describe1='+this.data.describe1+'&describe2='+JSON.stringify(this.data.arr),
      })
    }
  }
})