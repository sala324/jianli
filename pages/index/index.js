const app = getApp()
const util = require('../../utils/util');
Page({
  data: {
    showAll:false,
    size:5,
    index:1,
    projectArr:[{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    },
    {
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'2'
    },
    {
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'2'
    },{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    },{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    }],
    projectArr2:[{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    },
    {
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'2'
    },
    {
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'2'
    },{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    },
    {
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'2'
    },
    {
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'2'
    },{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    },{
      name:'白沙洲变电枢纽二期项目',
      date:'你最近更新: 2020-09-22',
      state:'1'
    }]
  },
  //事件处理函数
  turnDetail: function() {
    wx.navigateTo({
      url: '/pages/projectDetail/projectDetail'
    })
  },
  judgeUser(){
    let that=this
    wx.login({
      success: res => {
        util.requests('/getWxLogin',{code:res.code},'post').then(res=>{
          
          if(res.data.code===10101){
            that.setData({
              login:false
            })
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            that.setData({
              login:true
            })
          }
        })
      }
    })
  },
  projectList(){
    util.requests('/project',{pageSize:this.data.size,pageIndex:this.data.index}).then(res=>{
      if(res.data.code==0){
        
      }
    })
  },
  onLoad: function () {
    // this.judgeUser()
    this.projectList()
  },
})
