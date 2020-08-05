Component({
  properties: {
    pdfUrl:String,
  },
  data: {
   
  },
  methods: {
    copyTBL(){
      var self = this;
      wx.setClipboardData({
        data: self.data.pdfUrl,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          })
          self.triggerEvent('myevent', false)
        }
      });
    },
  }
})