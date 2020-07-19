const util = require('../../utils/util');
Page({
  data: {
    item:{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1',
      border:'none'
    }
  },
  turnIndex(){
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({
        showAll:true
    });
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  logList(){
    util.requests('/logList?p='+this.data.id).then(res=>{
      if(res.data.code==0){

      }
    })
  },
  projectDetail(){
    util.requests('/project/'+this.data.id).then(res=>{
      if(res.data.code==0){
        
      }
    })
  },
  onLoad: function (options) {
    this.projectDetail()
  },
  onShow: function () {
    this.logList()
  }
})