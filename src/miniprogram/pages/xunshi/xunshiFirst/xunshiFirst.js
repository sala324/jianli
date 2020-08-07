const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    authority:true,
    detail:'',
    oldValues:'',
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      open_date:'2020-05-06 ',
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
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改巡视记录-第一步',
      })
      //导航按钮改为完成
      let navInfo=this.data.navInfo
      navInfo.lastStep=true
      this.setData({
        navInfo:navInfo
      })
    }
    common.getProject(this)//获取工程基本信息
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
    info.open_date=e.detail.value
    this.setData({
      info:info
    })
  },
  resetInfo(id){
    util.requests('/jaq/'+id,{
      open_date:this.data.info.open_date,
      position:this.data.info.position
    },'put').then(res=>{
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
    if(this.data.info.position.trim().length>0){
      if(this.data.reset){
        this.resetInfo(this.data.id)
      } else {
        wx.navigateTo({
          url: '/pages/xunshi/xunshiSecond/xunshiSecond?open_date='+this.data.info.open_date+'&position='+this.data.info.position+'&project_id='+this.data.id,
        })
      }
    } else {
      return util.toasts('巡视部位不能为空')
    }
    
    
  },
  onShow: function () {
    let that=this
    if(!this.data.reset){
      let info=this.data.info
      info.open_date=util.formatDate(new Date())
      info.dateEnd=util.formatDate(new Date())
      this.setData({
        info:info,
        // start_time:util.formatTime(new Date()),
        // end_time:util.formatTime2(new Date()),
      })
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
    })
  }
})