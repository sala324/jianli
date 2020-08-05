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
      url: '/pages/xunshi/xunshiFirst/xunshiFirst?project_id='+this.data.id,
    })
  },
  turnDetail(e){
    if(e.currentTarget.dataset.state==1){
      wx.navigateTo({
        url: '/pages/xunshi/xunshiDetail/xunshiDetail?id='+e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/xunshi/xunshi/xunshi?id='+e.currentTarget.dataset.id,
      })
    }
    
  },
  delete(id){
    console.log(id)
    util.requests('/jaq/'+id,{},'delete').then(res=>{
      if(res.data.code==0){
        this.jaqList()
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
      that.jaqList();
    }
  },
  onLoad: function (options) {
    commonRequest.projectDetail(options.id,this)
    this.setData({
      id:options.id
    })
  },
  jaqList(){
    util.requests('/jaq',{pageSize:this.data.size,pageIndex:this.data.index,p:this.data.id}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach((item,index)=>{
          item.title=item.position+'巡视检查'
          item.des=item.assess
          item.index=index
        })
        this.setData({
          listArr:res.data.data.data,
          totalPages:res.data.data.pageinfo.totalPages
        })
      }
    })
  },
  onShow(){
    this.jaqList()
  }
})