const util = require('../../../utils/util');
const commonRequest = require('../../../utils/request');
Page({
  data: {
    size:10,
    index:1,
    item:{},
    listArr:[]
  },
  addRecord(e){
    wx.navigateTo({
      url: '/pages/pangzhan/pangzhanFirst/pangzhanFirst?project_id='+this.data.id,
    })
  },
  turnDetail(e){
    if(e.currentTarget.dataset.state==1){
      wx.navigateTo({
        url: '/pages/pangzhan/pangzhanDetail/pangzhanDetail?id='+e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/pangzhan/pangzhan/pangzhan?id='+e.currentTarget.dataset.id,
      })
    }
    
  },
  delete(id){
    console.log(id)
    util.requests('/jxm9/'+id,{},'delete').then(res=>{
      if(res.data.code==0){
        this.jxm9List()
      }
    })
  },
  delItem(e){
    let index=e.currentTarget.dataset.index
    let arr=this.data.listArr
    arr.splice(index,1)
    
    this.setData({
      listArr:arr
    })
    this.delete(e.currentTarget.dataset.id)
  },
  loadMore(){
    let that = this;
    if (this.data.index - this.data.totalPages < 0) {
      this.setData({
        index: that.data.index + 1,
      });
      that.jxm9List();
    }
  },
  onLoad: function (options) {
    commonRequest.projectDetail(options.id,this)
    this.setData({
      id:options.id
    })
  },
  jxm9List(){
    util.requests('/jxm9',{pageSize:this.data.size,pageIndex:this.data.index,p:this.data.id}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach((item,index)=>{
          let des='';
          let arr=JSON.parse(item.describe1)
          console.log(arr)
          arr.forEach(item2=>{
            des+=item2.values+'。'
          })
          item.title=item.position+' '+item.outline
          item.des=des
          item.index=index
        })
        this.setData({
          listArr:this.data.listArr.concat(res.data.data.data),
          totalPages:res.data.data.pageinfo.totalPages
        })
      }
    })
  },
  onShow(){
    this.jxm9List()
  }
})