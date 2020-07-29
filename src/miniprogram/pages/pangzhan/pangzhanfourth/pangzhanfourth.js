const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    oldValues:'',
    navInfo:{
      type:1,
      step:4
    },
    dateEnd:''
  },
  setGaiyao(e){
    let detail=this.data.oldValues+e.detail
    this.setData({
      detail:detail,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        oldValues:JSON.parse(options.default),
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第四步',
      })
    }
    if(options.step1Value){
      console.log(JSON.parse(options.step1Value))
      console.log(JSON.parse(options.describe2))
      this.setData({
        describe1:options.describe1,
        describe2:JSON.parse(options.describe2),
        step1Value:JSON.parse(options.step1Value),
        config:JSON.parse(options.config)
      })
    }
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value,
      oldValues:e.detail.value
    })
  },
  createLog(){
    util.requests('/jxm9',{
      start_time:this.data.step1Value.open_date+' '+this.data.step1Value.start_time,
      end_time:this.data.step1Value.open_date+' '+this.data.step1Value.end_time,
      position:this.data.step1Value.position,
      weather:this.data.step1Value.weather,
      describe1:this.data.describe1,
      describe2:JSON.stringify(this.data.describe2),
      outline:this.data.step1Value.outline,
      opinion:this.data.detail,
      open_date:this.data.step1Value.open_date,
      modules_id:this.data.step1Value.modules_id,
      working_id:this.data.step1Value.working_id,
      unit_id:this.data.step1Value.unit_id,
      project_id:wx.getStorageSync('pid'),
      log_type_id:wx.getStorageSync('logId'),
      config:this.data.config
    },'post').then(res=>{
      if(res.data.code==0){
        wx.reLaunch({
          url:'/pages/pangzhan/pangzhan/pangzhan?id='+res.data.data.id
        })
      }
    })
  },
  nextStep(){
    if(this.data.reset){
      common.resetJaq('/jxm9/'+this.data.id,{
        opinion:this.data.detail,
      })
    } else {
      // util.nextStepCommon(this,'wenti','/pages/pangzhan/pangzhan/pangzhan')
      this.createLog()
    }
    
  }
})