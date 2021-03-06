const util = require('../../../utils/util');
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth;//设备宽度
    // canvash = res.windowWidth * 7 / 15;
    canvash = res.windowHeight
  }
});
//注册页面
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
//开始
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
    //context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y);

  },
//过程
  canvasMove: function (event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()

    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);

    context.setStrokeStyle('#000000');
    context.setLineWidth(2);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  cleardraw: function () {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },
  imgUpload(val){
    let me = this;
    let hearderToken = wx.getStorageSync('token');
    let logCode = wx.getStorageSync('logCode');
    let logId = wx.getStorageSync('logId');
    wx.uploadFile({
      url: 'https://api.zkx.leoanrd.com/upload',
      filePath: val,
      name: 'file',
      formData: {
        'tag': logCode,
        'project_log_id':me.data.logid
      },
      header: {
        'Authorization': hearderToken // 默认值
      },
      success(res) {
        console.log(res)
        let resData = JSON.parse(res.data);
        console.log(resData)
        
        
      }
    })
    
  },
  //导出图片
  getimg: function () {
    let that=this
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    //生成图片
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        console.log(res.tempFilePath);
        wx.getFileSystemManager().readFile({   // 文件管理系统按照base64方式读取生成的图片
          filePath: res.tempFilePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // callback('data:image/png;base64,' + res.data)
            console.log('data:image/png;base64,' + res.data)
            util.requests('/jaq/postdo/'+that.data.id,{
              signName:'data:image/png;base64,' + res.data
            },'post').then(res=>{
              if(res.data.code==0){
                wx.reLaunch({
                  url: '/pages/xunshi/xunshiDetail/xunshiDetail?id='+that.data.id,
                })
              }
              
            })
          }
        })
        //存入服务器
        // util.requests('/jaq/postdo/'+that.data.id,{
        //   signName:res.tempFilePath
        // },'post').then(res=>{
        //   if(res.data.code==0){
        //     wx.reLaunch({
        //       url: '/pages/xunshi/xunshiDetail/xunshiDetail?id='+that.data.id,
        //     })
        //   }
          
        // })
      }
    })

  },
  data: {
    src: ""
  },
  onLoad(options) {
    this.setData({
      id:options.id
    })
    console.log(options)
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(2);
    context.setLineCap('round');
    context.setLineJoin('round');
    
  }
})