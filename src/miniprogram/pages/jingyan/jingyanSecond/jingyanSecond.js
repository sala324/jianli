const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({data: {
  navInfo:{
      type:2,
      step:2
    },
  arr:[],
  dateEnd:'',
  textValue:true
},
  
  changeRemarks(e){
    let index=e.currentTarget.dataset.index
    let arr=this.data.arr
    arr[index].about=e.detail.value
    this.setData({
      arr:arr
    })
  },
  changeState(e){
    let arr=this.data.arr
    arr[e.currentTarget.dataset.index].values=(arr[e.currentTarget.dataset.index].values==0)?1:0
    if(arr[e.currentTarget.dataset.index].values==1){
      arr[e.currentTarget.dataset.index].about=''
    }
    this.setData({
      arr:arr
    })
  },
  changeValues(e){
    let index=e.currentTarget.dataset.index
    let arr=this.data.arr
    arr[index].values=e.detail.value
    this.setData({
      arr:arr
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
    console.log(options)
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改平行检验-第二步',
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
        step1Value:JSON.parse(options.step1Value)
      })
      this.getconfiguration()
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    let describe=[]
    this.setData({
      textValue:true
    })
    console.log(this.data.arr)
    this.data.arr.forEach((item,index)=>{
      let json={}
      json.id=item.configuration_id
      json.values=item.values
      json.name=item.name
      json.classes=item.classes
      json.about=item.about
      describe.push(json)
      if(item.classes==0){
        if(!item.values){
          this.setData({
            textValue:false
          })
          console.log(1)
        }
      } else {
        if(!item.about &&item.values==0){
          this.setData({
            textValue:false
          })
          console.log(2)
        }
      }
    })
    if(this.data.textValue){
      if(this.data.reset){
        common.resetJaq('/jzl3/'+this.data.id,{
          describe:JSON.stringify(describe),
          config:this.data.arr
        })
      } else {
        wx.navigateTo({
          url: '/pages/jingyan/jingyanThird/jingyanThird?step1Value='+JSON.stringify(this.data.step1Value)+'&config='+JSON.stringify(this.data.arr)+'&describe='+JSON.stringify(describe)
        })
      }
    } else {
      util.toasts('请输入完整')
    }
    
  },
  getconfiguration(){
    let tid=wx.getStorageSync('logId')
    util.requests('/configuration',{
      // wid:15
      wid:this.data.step1Value.working_id
    }).then(res=>{
      let arr=res.data.data
      let arr3=arr.filter(item=>item.classes!=-1)
      let arr5=[]
      arr3.forEach((item,index)=>{
        let json={}
        json.configuration_id=item.id
        if(item.classes==0){
          json.values=''
        } else {
          json.values=0
        }
        json.name=item.name
        json.about=''
        json.classes=item.classes
        json.memo=item.memo
        arr5.push(json)
      })
      this.setData({
        arr:arr5
      })
    })
  },
  onShow: function () {
    
  }
})