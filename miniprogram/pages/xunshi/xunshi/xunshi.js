const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    reset:true,
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
    util.requests('/jaq/'+id,{
      images:this.data.imagesArr
    },'put').then(res=>{
      if(res.data.code==0){
        wx.navigateTo({
          url: '/pages/xunshi/xunshiSign/xunshiSign?id='+id,
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
        this.xunshiDetail(this.data.id)
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
  xunshiDetail(id){
    util.requests('/jaq/'+id).then(res=>{
      if(res.data.code==0){
        this.data.arr2[0].val=res.data.data.matter
        this.data.arr2[1].val=res.data.data.measures
        let imgArr=res.data.data.images.map(item=>{return item.url})
        let idArr=res.data.data.images.map(item=>{return item.id})
        let info=JSON.parse(JSON.stringify(res.data.data,['id','code','open_date','position']))
        info.name=res.data.data.project.name
        this.setData({
          info:info,
          arr:res.data.data.config,
          project_log_id:res.data.data.project_log_id,
          arr2:this.data.arr2,
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
    this.xunshiDetail(this.data.id)
  },
  onLoad: function (options) {
    
    this.setData({
      id:options.id
    })
  }
})