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
      url: '/pages/jianli/jianliFirst/jianliFirst?project_id='+this.data.id,
    })
  },
  turnDetail(e){
    if(e.currentTarget.dataset.state==1){
      wx.navigateTo({
        url: '/pages/jianli/jianliDetail/jianliDetail?id='+e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/jianli/jianli/jianli?id='+e.currentTarget.dataset.id,
      })
    }
    
  },
  delete(id){
    console.log(id)
    util.requests('/jxm17/'+id,{},'delete').then(res=>{
      if(res.data.code==0){
        this.jxm17List()
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
      that.jxm17List();
    }
  },
  onLoad: function (options) {
    commonRequest.projectDetail(options.id,this)
    this.setData({
      id:options.id
    })
  },
  jxm17List(){
    util.requests('/jxm17',{pageSize:this.data.size,pageIndex:this.data.index,p:this.data.id}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach((item,index)=>{
          item.title=item.open_date.slice(0,10)
          item.des=item.note
          item.types='jianli'
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
    this.jxm17List()
  }
})