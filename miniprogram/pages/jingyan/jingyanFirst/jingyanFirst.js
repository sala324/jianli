const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    dateEnd:'',
    authority:true,
    activeNav:'production',
    array:['材料','工序'],
    array2:[],
    array3:[],
    reset:false,
    info:{
      name:'',
      specifications:'',
      production:'',
      position:'',
      index:0,
      index2:0,
      index3:0,
    },
    navInfo:{
      type:2,
      step:1
    },
    shuru:false
  },
  chooseItem(e){
    let name=e.currentTarget.dataset.index
    this.setData({
      activeNav:name
    })
  },
  changeValue(e){
    let name=e.currentTarget.dataset.index
    let info=this.data.info
    info[name]=e.detail.value
    this.setData({
      info:info,
      activeNav:name
    })
  },
  setGaiyao(e){
    let name=this.data.activeNav
    let info=this.data.info
    info[name]=e.detail
    this.setData({
      info:info
    })
  },
  changeItem(e){
    common.changeItem(e.currentTarget.dataset.index,e.detail.value,this)
    // let info=this.data.info
    // let index=e.currentTarget.dataset.index
    // info[index]=e.detail.value
    // console.log(info)
    // if(index=='index2'){
    //   info.working_id=this.data.gongXuArrs[e.detail.value].id
    //   info.name=this.data.gongXuArrs[e.detail.value].name
    //   this.setData({
    //     working_id:this.data.gongXuArrs[e.detail.value].id
    //   })
    // }
    // if(index=='index3'){
    //   info.unit_id=this.data.arr2[e.detail.value].id
    // }
    
    // if(index=='index'){
    //   info.modules_id=this.data.typeArrs[e.detail.value].id
    //   this.setData({
    //     modules_id:this.data.typeArrs[e.detail.value].id
    //   })
    //   this.getworking()
    // }
    // this.setData({
    //   info:info
    // })
  },
  getUnits(id){
    let that=this
    util.requests('/units',{p:id}).then(res=>{
      if(res.data.code==0){
        let arr=res.data.data.map(item=>{
          return item.name
        })
        if(this.data.info.unit_id){
          let index=res.data.data.findIndex((val)=>val.id==this.data.info.unit_id)
          let info=this.data.info
          info.index3=index
          this.setData({
            info:info
          })
        } else {
          let info=this.data.info
          info.unit_id=res.data.data[0].id
          this.setData({
            info:info
          })
        }
        that.setData({
          unitsArr:arr,
          arr2:res.data.data
        })
      }
    })
  },
  getworking(){
    util.requests('/working',{mid:this.data.modules_id |this.data.info.modules_id}).then(res=>{
      if(res.data.code===0){
        let arr1=res.data.data.map(item=>{return item.name})
        let info=this.data.info
        
        this.setData({
          gongXuArr:arr1,
          working_id:res.data.data[0].id,
          gongXuArrs:res.data.data
        })
        if(!this.data.reset){
          info.working_id=res.data.data[0].id
          info.index2=0
        } else {
          info.index2=this.data.gongXuArrs.findIndex((item,index,arr)=>{
            return item.id==info.working_id
          })
        }
        this.setData({
          info:info
        })
      }
    })
  },
  getmoduleSi(){
    util.requests('/moduleSi',{tid:wx.getStorageSync('logId')}).then(res=>{
      if(res.data.code===0){
        let arr1=res.data.data.map(item=>{return item.name})
        let info=this.data.info
        if(!this.data.reset){
          info.modules_id=res.data.data[0].id
          info.index=0
        } else {
          info.index=res.data.data.findIndex((val)=>val.id==this.data.info.modules_id)
        }
        
        this.setData({
          typeArr:arr1,
          modules_id:res.data.data[0].id,
          typeArrs:res.data.data
        })
        this.setData({
          info:info
        })
        this.getworking()
      }
    })
  },
  onLoad(options){
    this.getmoduleSi()
    if(options.default){
      let info=JSON.parse(options.default)
      if(info.type==1){
        //工序
        info.index=this.data.array3.findIndex((val,index)=>{
          return val==info.buildUnits
        })
        info.index2=this.data.array2.findIndex((val,index)=>{
          return val==info.processName
        })
        this.setData({
          index3:index,
          index2:index2,
        })
      }
      this.setData({
        info:info,
        reset:true,
        index:Number(info.type)
      })
      wx.setNavigationBarTitle({
        title: '修改平行经验-第一步',
      })
    }
    this.getUnits(wx.getStorageSync('pid'))
    common.getProject(this)//获取工程基本信息
  },
  resetJzl3(id,params){
    util.requests('/jzl3/'+id,params,'put').then(res=>{
      if(res.data.code==0){
        wx.navigateBack({
          complete: (res) => {
            util.toasts('修改成功')
          },
        })
      }
    })
  },
  nextStep(){
    if(this.data.reset){
      if(this.data.info.index==1){
        this.resetJzl3(this.data.info.id,{
          working_id:this.data.info.working_id,
          unit_id:this.data.info.unit_id,
          open_date:this.data.info.open_date,
          modules_id:this.data.info.modules_id
        })
      } else {
        this.resetJzl3(this.data.info.id,{
          name:this.data.info.name,
          working_id:this.data.info.working_id,
          specifications:this.data.info.specifications,
          production:this.data.info.production,
          position:this.data.info.position,
          open_date:this.data.info.open_date,
          modules_id:this.data.info.modules_id
        })
      }
    } else {
      if(this.data.info.index==0&& this.data.info.name&& this.data.info.specifications&& this.data.info.production&& this.data.info.position){
        wx.navigateTo({
          url: '/pages/jingyan/jingyanSecond/jingyanSecond?step1Value='+JSON.stringify(this.data.info)
        })
      } else if(this.data.info.index==1){
        wx.navigateTo({
          url: '/pages/jingyan/jingyanSecond/jingyanSecond?step1Value='+JSON.stringify(this.data.info)
        })
      } else {
        util.toasts('请全部输入完整')
      }
    }
  },
  bindDateChange(e){
    let info=this.data.info
    info.open_date=e.detail.value
    this.setData({
      info: info
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this
    wx.getSetting({
      success(res) {
        let name='scope.record'
        if(res.authSetting[name]===false){
          that.setData({
            authority:false
          })
          
        } else {
          that.setData({
            authority:true
          })
        }
      }
    })
    if(!this.data.reset){
      let info=this.data.info
      info.open_date=util.formatDate(new Date())
      this.setData({
        info:info
      })
    }
    this.setData({
      dateEnd:util.formatDate(new Date())
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})