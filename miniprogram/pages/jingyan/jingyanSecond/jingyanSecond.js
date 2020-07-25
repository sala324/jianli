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
    arr[index].about=e.detail.value
    this.setData({
      arr:arr
    })
  },
  changeState(e){
    let arr=this.data.arr
    arr[e.currentTarget.dataset.index].values=(arr[e.currentTarget.dataset.index].values==0)?1:0
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
    console.log(options)
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改平行经验-第二步',
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
  resetJzl3(id,params){
    util.requests('/jzl3/'+id,params,'put').then(res=>{
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
    let describe=[]
    this.data.arr.forEach((item,index)=>{
      let json={}
      json.id=item.configuration_id
      json.values=item.values
      json.name=item.name
      describe.push(json)
    })

    if(this.data.reset){
      this.resetJzl3(this.data.id,{
        describe:JSON.stringify(describe),
        config:this.data.arr
      })
    } else {
      wx.navigateTo({
        url: '/pages/jingyan/jingyanThird/jingyanThird?step1Value='+JSON.stringify(this.data.step1Value)+'&config='+JSON.stringify(this.data.arr)+'&describe='+JSON.stringify(describe)
      })
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
        json.values=0
        json.name=item.name
        json.about=''
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