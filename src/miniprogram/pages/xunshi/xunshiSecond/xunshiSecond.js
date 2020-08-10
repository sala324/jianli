let plugin = requirePlugin("QCloudAIVoice");
let manager = plugin.getRecordRecognitionManager()
plugin.setQCloudSecret(1302473051, 'AKIDdz5VfYsBcpthJfs65sERO5VekZ7QMXIn', 'TO4XmsnWy9G6g1LOUJq9D0WoIVR0OVx8', true); 
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
        json.configuration_id=item.id
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
        project_id:options.project_id,
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
      //导航按钮改为完成
      let navInfo=this.data.navInfo
      navInfo.lastStep=true
      this.setData({
        navInfo:navInfo
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
    let accessArr=[]
    this.data.arr.forEach(item=>{
      if(!item.values){
        next=false
        return util.toasts('请确认全部输入完毕')
      }
      let json={}
      json.id=item.configuration_id
      json.name=item.about
      json.about=item.about
      json.values=item.values
      accessArr.push(json)
    })
    console.log(accessArr)
    if(next){
      if(this.data.reset){
        this.resetInfo(this.data.id)
      } else {
        wx.navigateTo({
          url: '/pages/xunshi/xunshiThird/xunshiThird?open_date='+this.data.open_date+'&position='+this.data.position+'&project_id='+this.data.project_id+'&config='+JSON.stringify(this.data.arr)+'&access='+JSON.stringify(accessArr),
        })
      }
    }
  }
})