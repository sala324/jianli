const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    bianhao:'',
    activeNav:0,
    oldValues:'',
    arr:[{title:'检验结论',name:'detail',val:''},{title:'检验仪器及编号',name:'bianhao',val:''}],
    navInfo:{
      type:2,
      step:3
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
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        oldValues:JSON.parse(options.default)[0].val,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改平行经验-第三步',
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
      name:name,
      specifications:specifications,
      production:production,
      position:position,
      describe:describe,
      result:result,
      instrument:instrument,
      open_date:open_date,
      modules_id	:modules_id	,
      working_id:working_id,
      unit_id:unit_id,
      project_id:project_id,
      log_type_id:log_type_id,
      config:config
    },'post').then(res=>{
      if(res.data.code==0){
        wx.reLaunch({
          url:'/pages/jingyan/jingyan/jingyan?id='+res.data.data.id
        })
      }
    })
  },
  resetJzl3(id){
    util.requests('/jzl3/'+id,{
      result:result,
      instrument:instrument,
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
      this.resetJzl3(this.data.id)
    } else {
      this.createJzl3()
    }
  },
  onShow: function () {
    
  }
})