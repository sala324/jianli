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
    util.requests('/jxm9/'+id,{
      images:this.data.imagesArr
    },'put').then(res=>{
      if(res.data.code==0){
        wx.navigateTo({
          url: '/pages/pangzhan/pangzhanSign/pangzhanSign?id='+this.data.id,
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
        this.jxm9Detail(this.data.id)
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
  jxm9Detail(id){
    util.requests('/jxm9/'+id).then(res=>{
      if(res.data.code==0){
        let imgArr=res.data.data.images.map(item=>{return item.url})
        let idArr=res.data.data.images.map(item=>{return item.id})
        res.data.data.start_time=res.data.data.start_time.slice(11,16)
        res.data.data.end_time=res.data.data.end_time.slice(11,16)
        res.data.data.open_date=res.data.data.open_date.slice(0,11)
        let info=JSON.parse(JSON.stringify(res.data.data,['id','code','open_date','position','start_time','end_time','weather','opinion','modules_id','working_id','unit_id','outline']))
        info.name=res.data.data.project.name
        info.reset=false
        this.setData({
          info:info,
          arr:res.data.data.config,
          pdfUrl:res.data.data.pdf_url,
          project_log_id:res.data.data.project_log_id,
          arr2:JSON.parse(res.data.data.describe2),
          opinion:res.data.data.opinion,
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
    this.jxm9Detail(this.data.id)
  },
  onLoad: function (options) {
    
    this.setData({
      id:options.id
    })
  }
})