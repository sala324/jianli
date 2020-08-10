
let plugin = requirePlugin("QCloudAIVoice");
let manager = plugin.getRecordRecognitionManager()
plugin.setQCloudSecret(1302473051, 'AKIDdz5VfYsBcpthJfs65sERO5VekZ7QMXIn', 'TO4XmsnWy9G6g1LOUJq9D0WoIVR0OVx8', true); 
Component({
  properties: {
    
  },
  data: {
    talking:false
  },
  methods: {
    recordingStart(){
      let that=this
      that.setData({
        talking:true
      })
      manager.start({duration:30000, engine_model_type: '16k_0'});
      manager.onRecognize((res) => {
        if (res.result) {
          that.triggerEvent('myevent', res.result)
          console.log("current result", res.result)
        } else if (res.errMsg) {
          console.log("recognize error", res.errMsg)
        }
      })
    },
    recordingStop() {
      manager.stop()
      this.setData({
        talking:false
      })
    },
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