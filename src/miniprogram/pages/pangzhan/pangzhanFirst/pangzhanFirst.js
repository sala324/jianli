const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    dateEnd:'',
    authority:true,
    gongXuArr:[],
    unitsArr:[],
    info:{
      index2:0,
      index:0,
      index3:0,
    },
    navInfo:{
      type:1,
      step:1
    },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.position=e.detail
    this.setData({
      info:info
    })
  },
  onLoad(options){
    if(options.default){
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第一步',
      })
      this.setData({
        info:JSON.parse(options.default),
        oldValues:JSON.parse(options.default).matter,
        unit_id:JSON.parse(options.default).unit_id,
        reset:true
      })
    }
    common.getmoduleSi(this)//获取模型
    common.getProject(this)//获取工程基本信息
    common.getUnits(wx.getStorageSync('pid'),this)//获取施工单位
    common.loadWeather(this)//获取天气信息
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  nextStep(){
    if(this.data.info.position){
      if(this.data.reset){
        common.resetJaq('/jxm9/'+this.data.info.id,{
          start_time:this.data.info.open_date+' '+this.data.info.start_time,
          end_time:this.data.info.open_date+' '+this.data.info.end_time,
          open_date:this.data.info.open_date,
          position:this.data.info.position,
          weather:this.data.info.weather,
        })
      } else {
        wx.navigateTo({
          url: '/pages/pangzhan/pangzhanSecond/pangzhanSecond?step1Value='+JSON.stringify(this.data.info)
        })
      }
    } else {
      util.toasts('请输入旁站监理的部位')
    }
  },
  changeItem(e){
    common.changeItem(e.currentTarget.dataset.name,e.detail.value,this)
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
      info.start_time=util.formatTime(new Date())
      info.end_time=util.formatTime2(new Date())
      info.open_date=util.formatDate(new Date())
      info.dateEnd=util.formatDate(new Date())
      this.setData({
        info:info
      })
    }
    
  }
})