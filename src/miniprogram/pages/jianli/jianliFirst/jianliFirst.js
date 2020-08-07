const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    authority:true,
    dateEnd:'',
    oldValues:'',
    reset:false,
    info:{},
    navInfo:{
      type:5,
      step:2,
      lastStep:true
    },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.detail=this.data.oldValues+e.detail
    this.setData({
      info:info,
      oldValues:this.data.oldValues+e.detail,
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        info:JSON.parse(options.default),
        oldValues:JSON.parse(options.default).note,
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改监理日志详情',
      })
    } else {
      common.loadWeather(this)//获取天气信息
    }
    common.getProject(this)//获取工程基本信息
  },
  changeItem(e){
    let info=this.data.info
    info[e.currentTarget.dataset.name]=e.detail.value
    this.setData({
      info:info
    })
  },
  nextStep(){
    if(this.data.info.weather_day&&this.data.info.temperature_high&&this.data.info.temperature_low&&this.data.info.note){
      if(!this.data.reset){
        this.createJxm17()
      } else {
        this.resetJxm17(this.data.id)
      }
    } else {
      util.toasts('请输入完整')
    }
    
  },
  bindDateChange(e){
    let info=this.data.info
    info.open_date=e.detail.value
    this.setData({
      info: info
    })
  },
  bindTimeChange1(e){
    this.setData({
      start_time: e.detail.value
    })
  },
  bindTimeChange2(e){
    this.setData({
      end_time: e.detail.value
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
      this.getLogList()
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
    })
  },
  createJxm17(){
    util.requests('/jxm17',{
      project_id:wx.getStorageSync('pid'),
      open_date:this.data.info.open_date,
      modules_id:0,
      working_id:0,
      weather_night:'',
      weather_day:this.data.info.weather_day,
      temperature_high:this.data.info.temperature_high,
      temperature_low:this.data.info.temperature_low,
      note:this.data.info.note,
      log_type_id:wx.getStorageSync('logId')
    },'post').then(res=>{
      if(res.data.code==0){
        wx.reLaunch({
          url:'/pages/jianli/jianli/jianli?id='+res.data.data.id
        })
      }
    })
  },
  resetJxm17(id){
    util.requests('/jxm17/'+id,{
      open_date:this.data.info.open_date,
      weather_day:this.data.info.weather_day,
      temperature_high:this.data.info.temperature_high,
      temperature_low:this.data.info.temperature_low,
      note:this.data.info.note
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
  getLogList(){
    let str=this.data.info.open_date
    console.log(str)
    util.requests('/logList?p='+wx.getStorageSync('pid'),{
      d:str
    }).then(res=>{
      if(res.data.code==0){
        let content=''
        let info=this.data.info
        res.data.data.data.forEach((item,index)=>{
          content+= index+1+'.今日进行'+item.name+','+"《"+'编号：'+item.code+'》。| '
        })
        info.note=content
        this.setData({
          info:info
        })
      }
    })
  }
})