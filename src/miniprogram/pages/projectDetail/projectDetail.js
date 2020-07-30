const util = require('../../utils/util');
const commonRequest = require('../../utils/request');
Page({
  data: {
    item:{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1',
      border:'none'
    }
  },
  turnIndex(){
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({
      size:20
    });
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  logType(){
    util.requests('/logType').then(res=>{
      if(res.data.code==0){
        res.data.data.forEach(item=>{
          if(item.name.includes('巡视')){
            this.setData({
              id3:item.id,
              code3:item.code
            })
          } else if(item.name.includes('监理')){
            this.setData({
              id4:item.id,
              code4:item.code
            })
          } else if(item.name.includes('旁站')){
            this.setData({
              id1:item.id,
              code1:item.code
            })
          } else if(item.name.includes('平行')){
            this.setData({
              id2:item.id,
              code2:item.code
            })
          }else if(item.name.includes('联系单')){
            this.setData({
              id5:item.id,
              code5:item.code
            })
          }      
        })
        this.setData({
          logType:res.data.data
        })
      }
    })
  },
  turnLog(e){
    wx.setStorageSync('logId', e.currentTarget.dataset.id)
    wx.setStorageSync('logCode', e.currentTarget.dataset.code)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  logList(){
    util.requests('/logList?p='+this.data.id).then(res=>{
      if(res.data.code==0){
        let arr=[]
        let arr2=[]
        let arrs=[]
        res.data.data.data.forEach(item=>{
          item.open_date=item.open_date.slice(0,10)
          arr.push(item.open_date)
        })
        arr=Array.from(new Set(arr))
        arr.forEach(item=>{
          let arr3=res.data.data.data.filter(item2=>{
            return item==item2.open_date
          })
          arr2.push(arr3)
        })
        arr.forEach((item,index)=>{
          let json={}
          json.open_date=item
          json.logArr=arr2[index]
          arrs.push(json)
        })
        console.log(arr2)
        this.setData({
          logArrs:arrs
        })
      }
    })
  },
  onLoad: function (options) {
    this.logType()
    this.setData({
      id:wx.getStorageSync('pid')
    })
    commonRequest.projectDetail(this.data.id,this)
  },
  onShow: function () {
    this.logList()
  }
})