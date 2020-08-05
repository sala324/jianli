const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    navInfo:{
            type:3,
            step:4,
            lastStep:true
          },
    dateEnd:''
  },
  setGaiyao(e){
    this.setData({
      detail:e.detail
    })
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  onLoad: function (options) {
    if(options.default){
      this.setData({
        detail:JSON.parse(options.default),
        reset:true
      })
    }
  },
  nextStep(){
    util.nextStepCommon(this,'cuoshi','/pages/xunshi/xunshi/xunshi')
    
  }
})