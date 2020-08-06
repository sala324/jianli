const util = require('../../../utils/util');
Page({
  data: {
    detail:'',
    bianhao:'',
    oldValues:'',
    activeNav:0,
    arr:[{title:'现场存在问题',name:'matter',val:''},{title:'监理有关措施',name:'measures',val:''}],
    navInfo:{
      type:3,
      step:3,
      lastStep:true
    },
    dateEnd:''
  },
  
  checkitem(e){
    let index=e.currentTarget.dataset.index
    let oldValues=this.data.arr[index].val
    this.setData({
      activeNav:index,
      oldValues:oldValues
    })
  },
  setGaiyao(e){
    let arr=this.data.arr
    let index=this.data.activeNav
    arr[index].val=this.data.oldValues+e.detail
    this.setData({
      arr:arr,
      oldValues:this.data.oldValues+e.detail
    })
  },
  onLoad(options){
    let that=this
    if(options.position){
      that.setData({
        project_id:options.project_id,
        config:JSON.parse(options.config),
        position:options.position,
        open_date:options.open_date
      })
    }
    if(options.default){
      let arr=JSON.parse(options.default)
      console.log(arr)
      that.setData({
        arr:arr,
        oldValues:arr[0].val,
        matter:arr[0].val,
        measures:arr[1].val,
        id:options.id,
        reset:true
      })
      wx.setNavigationBarTitle({
        title: '修改巡视记录-第三步',
      })
    }
  },
  changeDetail(e){
    let arr=this.data.arr
    let index=e.currentTarget.dataset.index
    arr[index].val=e.detail.value
    let name=arr[index].name
    this.setData({
      arr:arr,
      [name]:e.detail.value
    })
  },
  createJaq(){
    let log_type_id=wx.getStorageSync('logId')
    let project_id=wx.getStorageSync('pid')
    console.log(this.data.position,this.data.matter,this.data.measures,this.data.config,this.data.open_date,this.data.project_id,log_type_id)
    util.requests('/jaq',{
      position:this.data.position,
      matter:this.data.matter,
      assess:'评价',
      measures:this.data.measures,
      config:this.data.config,
      open_date:this.data.open_date,
      project_id:project_id,
      log_type_id:log_type_id
    },'post').then(res=>{
      if(res.data.code===0){
        wx.reLaunch({
          url: '/pages/xunshi/xunshi/xunshi?id='+res.data.data.id,
        })
      }
    })
  },
  resetJaq(){
    util.requests('/jaq/'+this.data.id,{
      matter:this.data.matter,
      measures:this.data.measures,
      project_id:this.data.project_id,
      id:this.data.id,
    },'put').then(res=>{
      if(res.data.code===0){
        wx.navigateBack({
          complete: (res) => {
            util.toasts('修改成功')
          },
        })
      }
    })
  },
  nextStep(){
    if(this.data.measures&&this.data.matter){
      if(this.data.reset){
        this.resetJaq()
      } else {
        this.createJaq()
      }
    } else {
      util.toasts('请填写完整')
    }
    
  }
})