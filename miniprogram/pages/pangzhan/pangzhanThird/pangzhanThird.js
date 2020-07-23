const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    arr:[{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:false},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true},{val:'核对杆号或停电间隔及回路',checked:true}],
    navInfo:{
      type:1,
      step:3
    },
    dateEnd:''
  },
  resetState(e){
    let arr=this.data.arr
    arr[e.currentTarget.dataset.index].values=(arr[e.currentTarget.dataset.index].values==0)?1:0
    this.setData({
      arr:arr
    })
  },
  onLoad(options){
    if(options.default){
      this.setData({
        arr:JSON.parse(options.default),
        id:JSON.parse(options.default).id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第三步',
      })
    }
    if(options.step1Value){
      console.log(options.describe1)
      this.setData({
        describe1:options.describe1,
        step1Value:JSON.parse(options.step1Value),
        config:JSON.parse(options.config),
        arr:JSON.parse(options.nextArr),
      })
    }
  },
  nextStep(){
    if(this.data.reset){
      this.resetInfo(this.data.id)
    } else {
      wx.navigateTo({
        url: '/pages/pangzhan/pangzhanfourth/pangzhanfourth?step1Value='+JSON.stringify(this.data.step1Value)+'&config='+JSON.stringify(this.data.config)+'&describe1='+this.data.describe1+'&describe2='+JSON.stringify(this.data.arr),
      })
    }
  },
  resetInfo(id){
    util.requests('jxm9/'+id,{
      config:this.data.arr
    },'put').then(res=>{
      if(res.data.code==0){
        wx.navigateBack({
          complete: (res) => {
            util.toasts('修改成功')
          },
        })
      }
    })
  },
})