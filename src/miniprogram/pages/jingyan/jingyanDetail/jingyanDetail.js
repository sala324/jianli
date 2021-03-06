const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    baseInfo:{},
    arr2:[{title:'检验结论',name:'result',val:''},{title:'检验仪器及编号',name:'instrument',val:''}],
    arr:[],
    imgArr:[]
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail)+'&id='+this.data.baseInfo.id,
    })
  },
  logDetail(id){
    util.requests('/jzl3/'+id).then(res=>{
      if(res.data.code==0){
        let imgArr=res.data.data.images.map(item=>{return item.url})
        let idArr=res.data.data.images.map(item=>{return item.id})
        res.data.data.open_date=res.data.data.open_date.slice(0,11)
        let info=JSON.parse(JSON.stringify(res.data.data,['code','open_date','name','specifications','production','position','describe','id','modules_id','unit_id','working_id']))
        info.name=res.data.data.project.name
        info.modulesName=res.data.data.module.name
        info.unitName=res.data.data.unit.name
        info.workingName=res.data.data.working.name
        info.typeName=res.data.data.module.name
        info.type=info.typeName.includes('工序')?1:0
        info.index=1
        info.reset=false
        let arr=this.data.arr2
        arr[0].val=res.data.data.result
        arr[1].val=res.data.data.instrument
        let config=[]
        res.data.data.config.forEach((item,index)=>{
          let json={}
          json.id=item.id
          json.values=item.values
          json.name=item.configuration.name
          json.about=item.about
          json.memo=item.configuration.memo
          json.classes=item.configuration.classes
          config.push(json)
        })
        this.setData({
          baseInfo:info,
          arr2:arr,
          imgArr:imgArr,
          pdfUrl:res.data.data.pdf_url,
          idArr:idArr,
          project_log_id:res.data.data.project_log_id,
          arr:config
        })
      }
    })
  },
  delItem(e){
    this.data.imgArr.splice(e.detail,1)
    this.setData({
      imgArr:this.data.imgArr
    })
  },
  showCopyBtn(){
    this.setData({
      showCopy:true
    })
  },
  hideCopy(e){
    this.setData({
      showCopy:e.detail
    })
  },
  onLoad(options){
    this.setData({
      id:options.id
    })
  },
  onShow(){
    this.logDetail(this.data.id)
  }
})