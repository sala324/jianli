Component({
  properties: {
    imgArr:Array,
  },
  data: {
   
  },
  methods: {
    delItem(e){
      this.triggerEvent('delItem', e.currentTarget.dataset.index)
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
      let arrTmp2 = me.data.imgurl;
      wx.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths
          const length = res.tempFilePaths.length
          res.tempFilePaths.forEach((val,index)=>{
            wx.showLoading({
              title: '加载中',
            })
            wx.uploadFile({
              url: app.globalData.apiHost + '/file/upload',
              filePath: val,
              name: 'file',
              formData: {
                'tag': 'diary',
              },
              header: {
                'Authorization': hearderToken // 默认值
              },
              success(res) {
                if (index == length-1){
                  wx.hideLoading();
                }
                let resData = JSON.parse(res.data);
                if (arrTmp.length<9){
                  arrTmp.push(resData.data.url);
                  arrTmp2.push(resData.data.path)
                }
                me.setData({
                  imgArr: arrTmp,
                  imgurl: arrTmp2
                });
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