const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    authority:true,
    dateEnd:'',
    oldValues:'',
    reset:false,
    info:{},
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
      this.loadInfo()
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
  loadInfo: function () {
    var page = this;
    //获取经纬度
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // success,获取当前的城市信息
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude);
        page.getCity(latitude, longitude)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //根据经纬度获取城市
  getCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=EFHBZ-WQG6U-WEMVB-4N3DG-KSMGT-5WB2G',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.address_component.city;
        console.log(city);
        //把市去掉，下一个接口地址没有模糊处理
        city = city.replace("市", "");
        page.setData({ city: city });
        page.getWeather(city);
      }
    })
  },
  //根据城市获取天气信息
  getWeather: function (city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var future = res.data.data.forecast;
        
        //移除掉数组中当天的天气信息
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        let info=page.data.info
        console.log(todayInfo)
        info.temperature_high=todayInfo.low
        info.temperature_low=todayInfo.high
        info.weather_day=todayInfo.type
        page.setData({info:info})
      },
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
          content+= index+1+'.今日进行'+item.name+','+"<<"+item.name+',编号：'+item.code+'>>。 '
        })
        info.note=content
        this.setData({
          info:info
        })
      }
    })
  }
})