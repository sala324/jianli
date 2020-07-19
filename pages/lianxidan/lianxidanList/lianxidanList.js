const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1',
      border:'none'
    },
    listArr:[
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:1,index:0},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:2,index:1},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:1,index:2},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:2,index:3},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:1,index:4},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:2,index:5}
      
    ]
  },
  addRecord(e){
    wx.navigateTo({
      url: '/pages/lianxidan/lianxidanFirst/lianxidanFirst',
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
      that.jxm8List();
    }
  },
  onLoad: function (options) {
  },
  jxm8List(){
    util.requests('/project',{pageSize:this.data.size,pageIndex:this.data.index}).then(res=>{
      if(res.data.code==0){
        
      }
    })
  },
  onShow(){
    this.jxm8List
  }
})