const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    authority:true,
    navInfo:{
      type:4,
      step:1
    },
    info:{},
    oldValues:'',
    reset:false,
    index:0,
    dateEnd:'',
    shuru:false,
    array:[]
  },
  setGaiyao(e){
    let info=this.data.info
    info.matter=this.data.oldValues+e.detail
    this.setData({
      info:info,
      oldValues:this.data.oldValues+e.detail,
    })
  },
  onLoad(options){
    if(options.project_id){
      this.getUnits(options.project_id)
      this.setData({
        project_id:options.project_id
      })
    }
    if(options.default){
      this.setData({
        info:JSON.parse(options.default),
        oldValues:JSON.parse(options.default).matter,
        unit_id:JSON.parse(options.default).unit_id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改工作联系单',
      })
      this.getUnits(JSON.parse(options.default).project_id)
    }
    common.getProject(this)//获取工程基本信息
  },
  bindUnitChange: function(e) {
    let info=this.data.info
    info.unit=this.data.array[e.detail.value]
    this.setData({
      info:info,
      index: e.detail.value
    })
  },
  bindDateChange(e){
    let info=this.data.info
    info.open_date=e.detail.value
    this.setData({
      info:info
    })
  },
  changeDetail(e){
    let info=this.data.info
    info.matter=e.detail.value
    this.setData({
      info:info
    })
  },
  nextStep(){
    let unit_id=this.data.arr2[this.data.index].id
    if(this.data.info.matter.trim().length>0){
      if(this.data.reset){
        common.resetJaq('/jxm8/'+this.data.info.id,{
          matter:this.data.info.matter,
          open_date:this.data.info.open_date,
        })
      } else {
        util.nextStepCommon(this,'info','/pages/lianxidan/lianxidanSecond/lianxidanSecond?matter='+this.data.info.matter+'&open_date='+this.data.info.open_date+'&project_id='+this.data.project_id+'&units='+unit_id,'info')
      }
    } else {
      return util.toasts('事由不能为空')
    }
    
  },
  getUnits(id){
    let that=this
    util.requests('/units',{p:id}).then(res=>{
      if(res.data.code==0){
        let arr=res.data.data.map(item=>{
          return item.name
        })
        if(this.data.info.unit_id){
          let index=res.data.data.findIndex((val)=>val.id==this.data.info.unit_id)
          this.setData({
            index:index
          })
        }
        that.setData({
          array:arr,
          arr2:res.data.data
        })
      }
    })
  },
  onShow: function () {
    let that=this
    wx.getSetting({
      success(res) {
        console.log(res)
        let name='scope.record'
        if(res.authSetting[name]===false){
          that.setData({
            authority:false
          })
          
        } else {
          that.setData({
            authority:true
          })
        }
      }
    })
    if(!this.data.reset){
      let info=this.data.info
      info.open_date=util.formatDate(new Date())
      this.setData({
        info:info
      })
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
    })
  }
})