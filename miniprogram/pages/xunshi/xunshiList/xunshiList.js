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
      url: '/pages/xunshi/xunshiFirst/xunshiFirst?proejct_id='+this.data.id,
    })
  },
  turnDetail(e){
    if(e.currentTarget.dataset.state==2){
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
    util.requests('jaq/'+id,{},'delete').then(res=>{
      if(res.data.code==0){
        this.setData({
          listArr:res.data.data
        })
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
    this.delete(arr[index].id)
  },
  loadMore(){
    let that = this;
    this.setData({
      index: that.data.index + 1,
    });
    if (this.data.index - this.data.totalPages <= 0) {
      that.jaqList();
    }
  },
  onLoad: function (options) {
    if(options.open_date){
      this.setData({
        open_date:options.open_date,
        position:options.position
      })
    }
    commonRequest.projectDetail(options.id,this)
    this.setData({
      id:options.id
    })
  },
  jaqList(){
    util.requests('/jaq',{pageSize:this.data.size,pageIndex:this.data.index}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach((item,index)=>{
          item.title=item.position+'巡视检查'
          item.des=item.assess
          item.index=index
        })
        this.setData({
          listArr:res.data.data.data
        })
      }
    })
  },
  onShow(){
    this.jaqList()
  }
})