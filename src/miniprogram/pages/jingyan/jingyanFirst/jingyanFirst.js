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
  },
  onLoad(options){
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
    common.getUnits(wx.getStorageSync('pid'),this)//获取施工单位
    common.getProject(this)//获取工程基本信息
    common.getmoduleSi(this)//获取模型
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
        common.resetJaq('/jzl3/'+this.data.info.id,{
          working_id:this.data.info.working_id,
          unit_id:this.data.info.unit_id,
          open_date:this.data.info.open_date,
          modules_id:this.data.info.modules_id
        })
      } else {
        common.resetJaq('/jzl3/'+this.data.info.id,{
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
  }
})