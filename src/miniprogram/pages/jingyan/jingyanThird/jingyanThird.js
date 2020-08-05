const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    bianhao:'',
    activeNav:0,
    oldValues:'',
    arr:[{title:'检验结论',name:'result',val:''},{title:'检验仪器及编号',name:'instrument',val:''}],
    navInfo:{
      type:2,
      step:3,
      lastStep:true
    },
    dateEnd:''
  },
  setGaiyao(e){
    let index=this.data.activeNav
    let arr=this.data.arr
    arr[index].val=this.data.oldValues+e.detail
    this.setData({
      arr:arr,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    console.log(options)
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        oldValues:JSON.parse(options.default)[0].val,
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改平行经验-第三步',
      })
    }
    if(options.step1Value){
      this.setData({
        step1Value:JSON.parse(options.step1Value),
        config:JSON.parse(options.config),
        describe:options.describe
      })
    }
  },
  checkitem(e){
    let oldValues=this.data.arr[e.currentTarget.dataset.index].val
    this.setData({
      oldValues:oldValues,
      activeNav:e.currentTarget.dataset.index
    })
  },
  changeDetail(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].val=e.detail.value
    this.setData({
      arr:arr
    })
  },
  createJzl3(){
    util.requests('/jzl3',{
      name:this.data.step1Value.name,
      specifications:this.data.step1Value.specifications,
      production:this.data.step1Value.production,
      position:this.data.step1Value.position,
      describe:this.data.describe,
      result:this.data.arr[0].val,
      instrument:this.data.arr[1].val,
      open_date:this.data.step1Value.open_date,
      modules_id:this.data.step1Value.modules_id	,
      working_id:this.data.step1Value.working_id,
      unit_id:this.data.step1Value.unit_id,
      project_id:wx.getStorageSync('pid'),
      log_type_id:wx.getStorageSync('logId'),
      config:this.data.config
    },'post').then(res=>{
      if(res.data.code==0){
        wx.reLaunch({
          url:'/pages/jingyan/jingyan/jingyan?id='+res.data.data.id
        })
      }
    })
  },
  nextStep(){
    if(this.data.reset){
      common.resetJaq('/jzl3/'+this.data.id,{
        result:this.data.arr[0].val,
        instrument:this.data.arr[1].val,
      })
    } else {
      this.createJzl3()
    }
  },
  onShow: function () {
    
  }
})