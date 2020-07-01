// pages/projectDetail/projectDetail.js
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
      id:'编号: 003223 | 2020-02 22',state:1},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:2},
      {title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:1},{title:'旁站监理的部位或工序:电缆管群电缆管群电缆管群电缆管群',
      des:'电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。电缆管群、电缆井土石方开挖，施工现场有作业计划，施工现场施工负责人、安全监护人、技术员在现场。',
      id:'编号: 003223 | 2020-02 22',state:2}
      
    ]
  },
  addRecord(e){
    wx.navigateTo({
      url: '/pages/pangzhan/pangzhanFirst/pangzhanFirst',
    })
  },
  turnDetail(){
    wx.navigateTo({
      url: '/pages/pangzhan/pangzhanDetail/pangzhanDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})