
let plugin = requirePlugin("QCloudAIVoice");
let manager = plugin.getRecordRecognitionManager()
plugin.setQCloudSecret(1302214974, 'AKIDvafTyD2uf9O5Wdie4C2gYDYhbFdN799s', 'e2A2eHdttbMrFNE8lIYquze3BNek59xO', true); 
Component({
  properties: {
    authority:Boolean
  },
  data: {
    talking:false,
    showDialog:false
  },
  methods: {
    callback(){
      this.setData({
        showDialog:false
      })
    },
    recordingStart(){
      let that=this
      if(!this.data.authority){
        this.setData({
          showDialog:true
        })
      } else {
        that.setData({
          talking:true
        })
        manager.start({duration:30000, engine_model_type: '16k_0'});
        manager.onRecognize((res) => {
          if (res.result) {
            // that.triggerEvent('myevent', res.result)
            that.setData({
              voiceValue:res.result
            })
          } else if (res.errMsg) {
            console.log("recognize error", res.errMsg)
          }
        })
      }
      
      
    },
    recordingStop() {
      manager.stop()
      this.setData({
        talking:false
      })
      setTimeout(() => {
        if(this.data.voiceValue){
          this.triggerEvent('myevent',this.data.voiceValue)
        } else {
          if(!this.data.showDialog){
            wx.showToast({
              icon:'none',
              title: '时间太短未识别',
            })
          }
          
        }
      }, 500);
      // console.log(this.data.voiceValue)
      
    },
    clickBtn(){
      this.triggerEvent('myevent2', '')
    }
  },
  ready(){
    manager.onStart((res) => {
      console.log('recorder start', res.msg);
})
manager.onStop((res) => {
      console.log('recorder stop', res.tempFilePath);
})
manager.onError((res) => {
      console.log('recorder error', res.errMsg);
})
manager.onRecognize((res) => {
  if (res.result) {
    that.setData({
      text: res.result
    })
    console.log("current result", res.result)
  } else if (res.errMsg) {
    console.log("recognize error", res.errMsg)
  }
})
  }
})