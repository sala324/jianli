const util = require('../../../utils/util');
Page({
  data: {
    authority:true,
    detail:'',
    oldValues:'',
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'2020-05-06 ',
      position:''
    },
    dateEnd:'',
    navInfo:{
            type:3,
            step:1
          },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.position=this.data.oldValues+e.detail
    this.setData({
      info:info,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    if(options.default){
      let info=JSON.parse(options.default)
      this.setData({
        info:info,
        oldValues:info.position,
        reset:true
      })
    }
  },
  changeDetail(e){
    let info=this.data.info
    info.position=e.detail.value
    this.setData({
      info:info
    })
  },
  bindDateChange(e){
    let info=this.data.info
    info.date=e.detail.value
    this.setData({
      info:info
    })
  },
  nextStep(){
    if(this.data.info.position.trim().length>0){
      util.nextStepCommon(this,'info','/pages/xunshi/xunshiSecond/xunshiSecond?open_date='+this.data.info.date+'&position='+this.data.info.position+'&proejct_id=1','info')
    } else {
      return util.toasts('巡视部位不能为空')
    }
    
    
  },
  onShow: function () {
    let that=this
    if(!this.data.reset){
      let info=this.data.info
      info.date=util.formatDate(new Date())
      info.dateEnd=util.formatDate(new Date())
      this.setData({
        info:info,
        // startTime:util.formatTime(new Date()),
        // endTime:util.formatTime2(new Date()),
      })
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
    })
  }
})