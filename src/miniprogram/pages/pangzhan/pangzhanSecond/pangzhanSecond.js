let plugin = requirePlugin("QCloudAIVoice");
let manager = plugin.getRecordRecognitionManager()
plugin.setQCloudSecret(1302214974, 'AKIDvafTyD2uf9O5Wdie4C2gYDYhbFdN799s', 'e2A2eHdttbMrFNE8lIYquze3BNek59xO', true); 
const util = require('../../../utils/util');
const common = require('../../../utils/common');
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
  getconfiguration(){
    let tid=wx.getStorageSync('logId')
    util.requests('/configuration',{
      // wid:11
      wid:this.data.step1Value.working_id
    }).then(res=>{
      let arr=res.data.data
      let idArr=arr.filter(item=>item.classes==-1)
      let id1=idArr[0].id
      let title1=idArr[0].name
      let title2=idArr[1].name
      let id2=idArr[1].id
      let arr3=arr.filter(item=>item.parent_id==id1)
      let arr4=arr.filter(item=>item.parent_id==id2)
      let arr5=[]
      let arr6=[]
      arr3.forEach((item,index)=>{
        let json={}
        json.configuration_id=item.id
        json.values=''
        json.pTitle=title1
        json.name=item.name
        json.about=''
        arr5.push(json)
      })
      arr4.forEach((item,index)=>{
        let json={}
        if(item.classes==0){
          json.id=item.id
          json.values=''
          json.pTitle=title2
          json.classes=item.classes
          json.name=item.name
        } else {
          json.id=item.id
          json.values=0
          json.classes=item.classes
          json.name=item.name
        }
        
        arr6.push(json)
      })
      this.setData({
        arr:arr5,
        title2:title2,
        title:title1,
        nextArr:arr6
      })
    })
  },
  onLoad(options){
    if(options.step1Value){
      console.log(JSON.parse(options.step1Value))
      this.setData({
        step1Value:JSON.parse(options.step1Value)
      })
      this.getconfiguration()
    }
    if(options.default){
      console.log(JSON.parse(options.default))
      this.setData({
        arr:JSON.parse(options.default),
        id:options.id,
        reset:true,
        title:options.title
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
    let describe1=[]
    this.data.arr.forEach((item,index)=>{
      let json={}
      json.id=item.configuration_id
      json.values=item.values
      json.name=item.name
      json.pTitle=this.data.title
      describe1.push(json)
    })
    common.resetJaq('/jxm9/'+id,{
      config:this.data.arr,
      describe1:JSON.stringify(describe1)
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
      let describe1=[]
      this.data.arr.forEach((item,index)=>{
        let json={}
        json.id=item.configuration_id
        json.values=item.values
        json.pTitle=this.data.title
        json.name=item.name
        describe1.push(json)
      })
      if(this.data.reset){
        this.resetInfo(this.data.id)
      } else {
        wx.navigateTo({
          url: '/pages/pangzhan/pangzhanThird/pangzhanThird?step1Value='+JSON.stringify(this.data.step1Value)+'&config='+JSON.stringify(this.data.arr)+'&describe1='+JSON.stringify(describe1)+'&nextArr='+JSON.stringify(this.data.nextArr)+'&title='+this.data.title2,
        })
      }
    }
  }
})