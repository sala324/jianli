const app = getApp()
const util = require('../../utils/util');
Page({
  data: {
    showAll:false,
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
  onLoad: function () {
    wx.login({
      success: res => {
        console.log(res.code)
        util.requests('/getWxLogin',{code:res.code},'post').then(res=>{
          console.log(res)
        })
      }
    })
    // util.requests('/getWxLogin')
  },
})
