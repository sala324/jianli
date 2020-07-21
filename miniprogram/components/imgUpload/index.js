const app = getApp()
Component({
  properties: {
    imgArr:Array,
    idArr:Array,
    logid:Number
  },
  data: {
  },
  methods: {
    setItem(e){
      // this.data.imgArr.splice(e.currentTarget.dataset.index,1)
      // this.data.imgurl.splice(e.currentTarget.dataset.index,1)
      // this.setData({
      //   imgArr:this.data.imgArr
      // })
      this.triggerEvent('setItem', this.data.idArr[e.currentTarget.dataset.index])
    },
    imgUpload(){
      let me = this;
      let hearderToken = wx.getStorageSync('token');
      let logCode = wx.getStorageSync('logCode');
      let logId = wx.getStorageSync('logId');
      let arrTmp = me.data.imgArr;
      let idArr = me.data.idArr;
      console.log(me.data.logid)
      wx.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths
          const length = res.tempFilePaths.length
          res.tempFilePaths.forEach((val,index)=>{
            wx.showLoading({
              title: '加载中',
            })
            console.log(val)
            wx.uploadFile({
              url: app.globalData.apiHost + '/upload',
              filePath: val,
              name: 'file',
              formData: {
                'tag': logCode,
                'project_log_id':me.data.logid
              },
              header: {
                'Authorization': hearderToken // 默认值
              },
              success(res) {
                let resData = JSON.parse(res.data);
                console.log(resData)
                if (arrTmp.length<9){
                  arrTmp.push(resData.data.url);
                  idArr.push(resData.data.id)
                }
                me.setData({
                  imgArr: arrTmp,
                  idArr:idArr
                });
                if (index == length-1){
                  wx.hideLoading();
                  me.triggerEvent('setItem', me.data.imgurl)
                }
                if (arrTmp.length == 9) {
                  me.setData({
                    isUpload: false,
                  });
                }
              }
            })
          })
        }
      });
      
    }
  }
})