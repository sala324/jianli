const util = require('../../../utils/util');
const commonRequest = require('../../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size:10,
    index:1,
    item:{},
    listArr:[]
  },
  addRecord(e){
    wx.navigateTo({
      url: '/pages/lianxidan/lianxidanFirst/lianxidanFirst?id='+this.data.id,
    })
  },
  turnDetail(){
    if(e.currentTarget.dataset.state==2){
      wx.navigateTo({
        url: '/pages/lianxidan/lianxidanDetail/lianxidanDetail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/lianxidan/lianxidan/lianxidan',
      })
    }
  },
  delete(id){
    util.requests('jaq/'+id,{},'delete').then(res=>{
      if(res.data.code==0){
        this.setData({
          listArr:res.data.data.data
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
      that.jxm8List();
    }
  },
  onLoad: function (options) {
    commonRequest.projectDetail(options.id,this)
    this.setData({
      id:options.id
    })
  },
  jxm8List(){
    util.requests('/jxm8',{pageSize:this.data.size,pageIndex:this.data.index}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach(item=>{
          item.title=item.matter
          item.des=item.note
        })
        this.setData({
          listArr:res.data.data.data
        })
      }
    })
  },
  onShow(){
    this.jxm8List()
  }
})