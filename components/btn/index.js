Component({
  properties: {
    title:String,
  },
  data: {
   
  },
  methods: {
    clickBtn(){
      this.triggerEvent('myevent', '')
    }
  }
})