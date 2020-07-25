const util = require('./util');
const getProject=(that)=>{
    let info=that.data.info
    info.name=wx.getStorageSync('pname')
    info.code=wx.getStorageSync('pid')
    that.setData({
      info:info
    })
}
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
        getWeather(city,page);
      }
    })
  }
  //根据城市获取天气信息
const getWeather=(city,page)=> {
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
  }
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
        getworking(that)
    }
    that.setData({
        info: info
    })
}
const getworking=(that)=>{
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
          info.index2=that.data.gongXuArr.findIndex((item,index,arr)=>{
            return item==info.outline
          })
          console.log(that.data.info)
        }
        that.setData({
          info:info
        })
      }
    })
  }
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
        getworking(that)
      }
    })
  }
module.exports = {
    getProject,
    getUnits,
    loadWeather,
    changeItem,
    getworking,
    getmoduleSi
}