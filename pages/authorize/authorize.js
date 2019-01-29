const dataServices = require('./dataServices.js')
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";
const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    //登入
    this.AutoAuthUser();
    // var that = this;
    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     console.log("==================")
    //     console.log(res)
    //     console.log("==================")
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //           //从数据库获取用户信息
    //           that.UpinsertMember(res.userInfo)
    //         }
    //       });
    //     }
    //   }
    // })
  },
  //按钮点击授权
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userInfo = e.detail.userInfo;
      this.AutoAuthUser();
      //this.UpinsertMember(app.globalData.userInfo)
      // wx.login({
      //   success: function (loginCode) {
      //     console.log(loginCode)
      //   }
      // })
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //后台数据库交互
  AutoAuthUser:function(){
    var self = this;
    wx.login({
      success: function (loginCode) {
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            //获得对应的Openid
            dataServices.GetUserOpenidByCode({ code: loginCode.code }).then(function (ret){
              if (ret) {
                ret = JSON.parse(ret.data)
                app.globalData.userInfo = res.userInfo
                //登入后台记录
                self.UpinsertMember(ret.openid, res.userInfo)
              }
            })
          }
        })
      }
    })
  },
  UpinsertMember: function (openid, userinfo) {
    var postData = {
      enterpriseid: app.globalData.enterpriseid,
      weChatOpenID:openid,
      weChatImg: userinfo.avatarUrl,
      weChatName: userinfo.nickName
    }
    dataServices.saveMember(postData).then(ret => {
      if (ret) {
        //将用户信息保存在全局对象中
        app.globalData.userData = ret.data;
        //授权成功后，跳转进入小程序首页
        wx.switchTab({
          url: '/pages/main/components/index/index'
        })
      } 
    })
   }
})