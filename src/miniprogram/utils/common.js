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
          //console.log(res);
          var today = res.data;
          //console.log(today)
          let info=page.data.info
          //console.log(todayInfo)
          info.weather = today.week + '，' + today.wea + '，' + today.win + today.win_speed + '，' +today.win_meter, + ',高温：' + today.tem1 + '°C，低温：' + today.tem2 + '°C。'
          //console.log(info.weater)
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
        getworking(that,true)
    }
    that.setData({
        info: info
    })
}
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