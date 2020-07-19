const util = require('../../../utils/util');
Page({
  data: {
    showCopy:false,
    
    reset:true,
    arr2:[{title:'现场存在问题',name:'matter',val:'问题111'},{title:'监理有关措施',name:'measures',val:'措施22222'}],
    arr:[{name:'aa',val:'旁站监理的部位或工序:电缆管群1',tips:'输入1'},{name:'bb',val:'旁站监理的部位或工序:电缆管群旁站监理的部位或工序:电缆管群2',tips:'输入2'},{name:'cc',val:'旁站监理的部位或工序:电缆管群33',tips:'输入33333'},{name:'dd',val:'旁站监理的部位或工序:电缆管群44',tips:'输入4444'},{name:'ee',val:'旁站监理的部位或工序:电缆管群55',tips:'输入555555'}],
    info2:{
      wenti:'存在的问题2',
      cuoshi:'措施2',
    },
    info:{
      name:'白沙洲变电枢纽二期项目',
      id:'0098654',
      date:'2020-05-06 ',
      position:'巡视部位1111'
    },
    imgArr:['../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png','../../images/1.png']
  },
  resetDetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.page+'?default='+JSON.stringify(e.currentTarget.dataset.detail),
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
  onLoad: function (options) {

  },
  imgUpload(){
    let me = this;
    let hearderToken = '';
    try {
      hearderToken = wx.getStorageSync('hearderToken');
    } catch (e) {
      console.log('获取本地存储失败！')
    }
    let arrTmp = me.data.imgArr;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.apiHost + '/file/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'tag': 'diary',
          },
          header: {
            'Authorization': hearderToken // 默认值
          },
          success(res) {
            let resData = JSON.parse(res.data);
            arrTmp.push(resData.data.url);
            me.setData({
              imgArr: arrTmp,
              imgUrl: resData.data.path
            });
            if (arrTmp.length >0){
              me.setData({
                isUpload: false,
              });
            }
          }
        })
      }
    });
    
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