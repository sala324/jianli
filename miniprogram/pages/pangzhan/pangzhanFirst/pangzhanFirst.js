const util = require('../../../utils/util');
const common = require('../../../utils/common');
Page({
  data: {
    detail:'',
    dateEnd:'',
    authority:true,
    gongXuArr:[],
    unitsArr:[],
    info:{
      index2:0,
      index:0,
      index3:0,
    },
    navInfo:{
      type:1,
      step:1
    },
    shuru:false
  },
  setGaiyao(e){
    let info=this.data.info
    info.position=e.detail
    this.setData({
      info:info
    })
  },
  onLoad(options){
    // this.getmoduleSi()
    
    if(options.default){
      wx.setNavigationBarTitle({
        title: '修改旁站记录——第一步',
      })
      this.setData({
        info:JSON.parse(options.default),
        oldValues:JSON.parse(options.default).matter,
        unit_id:JSON.parse(options.default).unit_id,
        reset:true
      })
    }
    common.getmoduleSi(this)//获取模型
    common.getProject(this)//获取工程基本信息
    common.getUnits(wx.getStorageSync('pid'),this)//获取施工单位
    common.loadWeather(this)//获取天气信息
  },
  changeDetail(e){
    this.setData({
      detail:e.detail.value
    })
  },
  // getworking(){
  //   util.requests('/working',{mid:this.data.modules_id |this.data.info.modules_id}).then(res=>{
  //     if(res.data.code===0){
  //       let arr1=res.data.data.map(item=>{return item.name})
  //       let info=this.data.info
        
  //       this.setData({
  //         gongXuArr:arr1,
  //         working_id:res.data.data[0].id,
  //         gongXuArrs:res.data.data
  //       })
  //       if(!this.data.reset){
  //         info.working_id=res.data.data[0].id
  //         info.index2=0
  //         info.outline=res.data.data[0].name
  //         console.log(this.data.info)
  //       } else {
  //         info.index2=this.data.gongXuArr.findIndex((item,index,arr)=>{
  //           return item==info.outline
  //         })
  //         console.log(this.data.info)
  //       }
  //       this.setData({
  //         info:info
  //       })
  //     }
  //   })
  // },
  // getmoduleSi(){
  //   util.requests('/moduleSi',{tid:wx.getStorageSync('logId')}).then(res=>{
  //     if(res.data.code===0){
  //       let arr1=res.data.data.map(item=>{return item.name})
        
  //       let info=this.data.info
  //       if(!this.data.reset){
  //         info.modules_id=res.data.data[0].id
  //       } else {
  //         let index=res.data.data.findIndex((val)=>val.id==this.data.info.modules_id)
  //         info.index=index
  //       }
  //       this.setData({
  //         typeArr:arr1,
  //         modules_id:res.data.data[0].id,
  //         typeArrs:res.data.data,
  //         info:info
  //       })
  //       this.getworking()
  //     }
  //   })
  // },
  resetInfo(id){
    util.requests('/jxm9/'+id,{
      start_time:this.data.info.open_date+' '+this.data.info.start_time,
      end_time:this.data.info.open_date+' '+this.data.info.end_time,
      open_date:this.data.info.open_date,
      position:this.data.info.position,
      weather:this.data.info.weather,
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
  nextStep(){
    if(this.data.info.position){
      if(this.data.reset){
        this.resetInfo(this.data.info.id)
      } else {
        wx.navigateTo({
          url: '/pages/pangzhan/pangzhanSecond/pangzhanSecond?step1Value='+JSON.stringify(this.data.info)
        })
      }
    } else {
      util.toasts('请输入旁站监理的部位')
    }
  },
  changeItem(e){
    common.changeItem(e.currentTarget.dataset.name,e.detail.value,this)
  },
  onShow: function () {
    let that=this
    wx.getSetting({
      success(res) {
        console.log(res)
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
      info.start_time=util.formatTime(new Date())
      info.end_time=util.formatTime2(new Date())
      info.open_date=util.formatDate(new Date())
      info.dateEnd=util.formatDate(new Date())
      this.setData({
        info:info
      })
    }
    
  }
})