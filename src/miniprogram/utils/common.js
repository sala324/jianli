const util = require('./util');
//获取项目的名称和编码
const getProject=(that)=>{
    let info=that.data.info
    info.name=wx.getStorageSync('pname')
    info.code=wx.getStorageSync('pid')
    that.setData({
      info:info
    })
}
//获取单位列表，及选中单位列表的值
const getUnits=(id,that)=>{
    util.requests('/units',{p:id}).then(res=>{
      if(res.data.code==0){
        let arr=res.data.data.map(item=>{
          return item.name
        })
        if(that.data.info.unit_id){
          let index=res.data.data.findIndex((val)=>val.id==that.data.info.unit_id)
          let info=that.data.info
          info.index3=index
          that.setData({
            info:info
          })
        } else {
          let info=that.data.info
          info.unit_id=res.data.data[0].id
          that.setData({
            info:info
          })
        }
        that.setData({
          unitsArr:arr,
          arr2:res.data.data
        })
      }
    })
  }
  //获取经纬度信息
const loadWeather=(page)=> {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // success,获取当前的城市信息
        var latitude = res.latitude
        var longitude = res.longitude
        getCity(latitude, longitude,page)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
  //根据经纬度获取城市
  const getCity=(latitude, longitude,page)=> {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=EFHBZ-WQG6U-WEMVB-4N3DG-KSMGT-5WB2G',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var city = res.data.result.address_component.city;
        console.log(city);
        //把市去掉，下一个接口地址没有模糊处理
        city = city.replace("市", "");
        page.setData({ city: city });
        getWeather(city,page);
      }
    })
  }
    //根据城市获取天气信息
  const getWeather=(city,page)=> {
      wx.request({
        url: 'https://tianqiapi.com/api?version=v6&appid=52453137&appsecret=c9RQRskX&city=' + city,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var today = res.data;
          let info=page.data.info
          if(wx.getStorageSync('logCode')=='jxm17'){
            //监理日志天气信息
            info.temperature_high=today.tem1+'°C'
            info.temperature_low=today.tem2+'°C'
            info.weather_day=today.wea
          } else {
            //旁站日志天气信息
            info.weather = today.week + '，' + today.wea + '，' + today.win + today.win_speed + '，' +today.win_meter, + ',高温：' + today.tem1 + '°C，低温：' + today.tem2 + '°C。'
          }
          page.setData({info:info})
        },
      })
    }
  //修改输入框或者下拉列表的值
const changeItem=(name,val,that)=>{
    let info=that.data.info
    info[name]=val
    if(name=='index2'){
        info.outline=that.data.gongXuArr[val]
        info.working_id=that.data.gongXuArrs[val].id
        that.setData({
        working_id:that.data.gongXuArrs[val].id
        })
    }
    if(name=='index3'){
        info.unit_id=that.data.arr2[val].id
    }
    if(name=='index'){
        info.modules_id=that.data.typeArrs[val].id
        that.setData({
        modules_id:that.data.typeArrs[val].id
        })
        getworking(that,true)
    }
    that.setData({
        info: info
    })
}
//获取工序的值
const getworking=(that,flag)=>{
    util.requests('/working',{mid:that.data.modules_id |that.data.info.modules_id}).then(res=>{
      if(res.data.code===0){
        let arr1=res.data.data.map(item=>{return item.name})
        let info=that.data.info
        
        that.setData({
          gongXuArr:arr1,
          working_id:res.data.data[0].id,
          gongXuArrs:res.data.data
        })
        if(!that.data.reset){
          info.working_id=res.data.data[0].id
          info.index2=0
          info.outline=res.data.data[0].name
          console.log(that.data.info)
        } else {
          if(flag==true){
            info.index2=0
          } else {
            info.index2=that.data.gongXuArrs.findIndex((item,index,arr)=>{
              return item.id==info.working_id
            })
          }
        }
        that.setData({
          info:info
        })
      }
    })
  }
  //获取模块的值
  const getmoduleSi=(that)=>{
    util.requests('/moduleSi',{tid:wx.getStorageSync('logId')}).then(res=>{
      if(res.data.code===0){
        let arr1=res.data.data.map(item=>{return item.name})
        
        let info=that.data.info
        if(!that.data.reset){
          info.modules_id=res.data.data[0].id
        } else {
          let index=res.data.data.findIndex((val)=>val.id==that.data.info.modules_id)
          info.index=index
        }
        that.setData({
          typeArr:arr1,
          modules_id:res.data.data[0].id,
          typeArrs:res.data.data,
          info:info
        })
        getworking(that,false)
      }
    })
  }
  //获取日志接口
  const resetJaq=(path,params)=>{
    util.requests(path,params,'put').then(res=>{
      if(res.data.code==0){
        wx.navigateBack({
          complete: (res) => {
            util.toasts('修改成功')
          },
        })
      }
    })
  }
module.exports = {
    getProject,
    getUnits,
    loadWeather,
    resetJaq,
    changeItem,
    getworking,
    getmoduleSi
}