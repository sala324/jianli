Component({
  properties: {
    navInfo:Object,
  },
  
  data: {
   
  },
  methods: {
    nextStep(){
      this.triggerEvent('myevent2', '')
    }
  }
})