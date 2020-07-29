const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    reset:false,
    arr2:[{title:'现场存在问题',name:'matter',val:''},{title:'监理有关措施',name:'measures',val:''}],
    arr:[],
    info2:{
      wenti:'存在的问题2',
      cuoshi:'措施2',
    },
    info:{},
    project_log_id:1,
    imgArr:[]
  },
  uploadImg(){
    this.resetInfo(this.data.id)
  },
  resetInfo(id){
    util.requests('/jxm17/'+id,{
      images:this.data.imagesArr
    },'put').then(res=>{
      if(res.data.code==0){
        wx.navigateTo({
          url: '/pages/jianli/jianliSign/jianliSign?id='+id,
        })
      }
      
    })
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail)+'&id='+this.data.info.id,
    })
  },
  setItem(e){
    util.requests('/deleteFile/'+e.detail,{},'post').then(res=>{
      if(res.data.code===0){
        util.toasts(res.data.message)
        this.jxm17Detail(this.data.id)
      }
    })
    this.setData({
      imagesArr:e.detail
    })
  },
  showCopyBtn(){
    this.setData({
      showCopy:true
    })
  },
  jxm17Detail(id){
    util.requests('/jxm17/'+id).then(res=>{
      if(res.data.code==0){
        let imgArr=res.data.data.images.map(item=>{return item.url})
        let idArr=res.data.data.images.map(item=>{return item.id})
        res.data.data.open_date=res.data.data.open_date.slice(0,11)
        let info=JSON.parse(JSON.stringify(res.data.data,['id','code','open_date','note','temperature_high','temperature_low','weather_day']))
        info.name=res.data.data.project.name
        info.reset=false
        this.setData({
          info:info,
          project_log_id:res.data.data.project_log_id,
          imgArr:imgArr,
          idArr:idArr
        })
      }
    })
  },
  hideCopy(e){
    this.setData({
      showCopy:e.detail
    })
  },
  onShow(){
    this.jxm17Detail(this.data.id)
  },
  onLoad: function (options) {
    
    this.setData({
      id:options.id
    })
  }
})