const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    baseInfo:{},
    arr2:[{title:'检验结论',name:'result',val:''},{title:'检验仪器及编号',name:'instrument',val:''}],
    title:'旁站监理的部位或工序:电缆管群、电缆井土石方开挖',
    arr:[{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''},{name:'白沙洲变电枢纽二期项目 0098654',standard:'直径大于1米',result:true,remarks:''}],
    wenti:'暂无问题',
    imgArr:['../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png']
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail)+'&id='+this.data.baseInfo.id,
    })
  },
  logDetail(id){
    util.requests('/jzl3/'+id).then(res=>{
      if(res.data.code==0){
        let info=JSON.parse(JSON.stringify(res.data.data,['code','open_date','name','specifications','production','position','describe','id','modules_id','unit_id','working_id']))
        info.name=res.data.data.project.name
        info.index=1
        info.reset=true
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
          config.push(json)
        })
        this.setData({
          baseInfo:info,
          arr2:arr,
          arr:config
        })
        console.log(info)
        console.log(arr)
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