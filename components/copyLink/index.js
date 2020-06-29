Component({
  properties: {
    projectItem:Object,
  },
  data: {
   
  },
  methods: {
    copyTBL(){
      var self = this;
      wx.setClipboardData({
        data: '123456',
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