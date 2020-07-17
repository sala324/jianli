Component({
  properties: {
    projectItem:Object,
  },
  data: {
    right:0,
    delBtnWidth:160,
  },
  methods: {
    drawStart: function (e) { 
      var touch = e.touches[0]
      this.setData({
        startX: touch.clientX,
      })
    },
    drawMove: function (e) {
      var touch = e.touches[0]
      var disX = this.data.startX - touch.clientX
      if(disX<0){
        this.data.right = this.data.right+disX
        this.data.right=Math.max(this.data.right,0)
      } else {
        if (disX >= 20) {
          if (disX > this.data.delBtnWidth) {
            disX = this.data.delBtnWidth
          }
          this.data.right = disX
        } else {
          this.data.right = 0
        }
      }
      
      this.setData({
        right:this.data.right
      })
    },  
    drawEnd: function (e) {
      if (this.data.right >= this.data.delBtnWidth/2) {
        this.data.right = this.data.delBtnWidth
      } else {
        this.data.right = 0
      }
      this.setData({
        right:this.data.right
      })
    },
    delItem(){
      let that=this
      wx.showModal({
        title: "是否删除该项",
        success: function (res) {
          if (res.confirm) {
            that.triggerEvent('delItem', '')
          }
        }
      })
      
    }
  }
})