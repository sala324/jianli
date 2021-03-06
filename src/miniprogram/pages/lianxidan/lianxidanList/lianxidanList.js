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
      url: '/pages/lianxidan/lianxidanFirst/lianxidanFirst?project_id='+this.data.id,
    })
  },
  turnDetail(e){
    if(e.currentTarget.dataset.state==1){
      wx.navigateTo({
        url: '/pages/lianxidan/lianxidanDetail/lianxidanDetail?id='+e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/lianxidan/lianxidan/lianxidan?id='+e.currentTarget.dataset.id,
      })
    }
  },
  delete(id){
    util.requests('/jxm8/'+id,{},'delete').then(res=>{
      if(res.data.code==0){
        this.jxm8List()
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
    if (this.data.index - this.data.totalPages <0) {
      this.setData({
        index: that.data.index + 1,
      });
      that.jxm8List();
    }
  },
  onLoad: function (options) {
    this.setData({
      id:wx.getStorageSync('pid')
    })
    commonRequest.projectDetail(this.data.id,this)
  },
  jxm8List(){
    util.requests('/jxm8',{pageSize:this.data.size,pageIndex:this.data.index,p:this.data.id}).then(res=>{
      if(res.data.code==0){
        res.data.data.data.forEach((item,index)=>{
          item.title=item.matter
          item.index=index
          item.des=item.note
        })
        this.setData({
          listArr:this.data.listArr.concat(res.data.data.data),
          totalPages:res.data.data.pageinfo.totalPages
        })
      }
    })
  },
  onShow(){
    this.jxm8List()
  }
})