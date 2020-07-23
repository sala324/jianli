const util = require('../../../utils/util');
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
        let fengli=todayInfo.fengli.replace('<![CDATA[','').replace(']]>','')
        info.weather=todayInfo.type +' '+fengli
        page.setData({info:info})
      },
    })
  },
  setGaiyao(e){
    let info=this.data.info
    info.position=e.detail
    this.setData({
      info:info
    })
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
        } else {
          let info=this.data.info
          info.unit_id=res.data.data[0].id
          info.outline=res.data.data[0].name
          this.setData({
            info:info
          })
        }
        that.setData({
          unitsArr:arr,
          arr2:res.data.data
        })
      }
    })
  },
  onLoad(options){
    this.getmoduleSi()
    if(options.project_id){
      this.getUnits(options.project_id)
      this.setData({
        project_id:options.project_id
      })
    }
    if(options.default){
      let info=JSON.parse(options.default)
      info.index=this.data.gongXuArr.findIndex((item,index,arr)=>{
        return item==info.outline
      })
      this.setData({
        info:info,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第一步',
      })
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
    this.loadInfo()//获取天气信息
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  getworking(){
    util.requests('/working',{mid:this.data.modules_id}).then(res=>{
      if(res.data.code===0){
        let arr1=res.data.data.map(item=>{return item.name})
        let info=this.data.info
        info.working_id=res.data.data[0].id
        this.setData({
          gongXuArr:arr1,
          working_id:res.data.data[0].id,
          gongXuArrs:res.data.data,
          info:info
        })
      }
    })
  },
  getmoduleSi(){
    util.requests('/moduleSi',{tid:wx.getStorageSync('logId')}).then(res=>{
      if(res.data.code===0){
        let arr1=res.data.data.map(item=>{return item.name})
        let info=this.data.info
        info.modules_id=res.data.data[0].id
        this.setData({
          typeArr:arr1,
          modules_id:res.data.data[0].id,
          typeArrs:res.data.data,
          info:info
        })
        this.getworking()
      }
    })
  },
  resetInfo(id){
    util.requests('/jxm9/'+id,{
      start_time:this.data.info.start_time,
      end_time:this.data.info.end_time,
      position:this.data.info.position,
      weather:this.data.info.weather,
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

    if(this.data.info.position){
      if(this.data.reset){
        this.resetInfo(this.data.id)
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
    let info=this.data.info
    let name=e.currentTarget.dataset.name
    info[name]=e.detail.value
    if(name=='index'){
      info.outline=this.data.gongXuArr[e.detail.value]
      info.working_id=this.data.gongXuArrs[e.detail.value].id
      this.setData({
        working_id:this.data.gongXuArrs[e.detail.value].id
      })
    }
    if(name=='index2'){
      info.unit_id=this.data.arr2[e.detail.value].id
    }
    
    if(name=='index3'){
      info.modules_id=this.data.typeArrs[e.detail.value].id
      this.setData({
        modules_id:this.data.typeArrs[e.detail.value].id
      })
      this.getworking()
    }
    this.setData({
      info: info
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