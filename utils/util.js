const moment = require('./moment.min.js');
const CommonServices = require('./CommonServices.js');
const WeChatServices = require('./WeChatServices.js');
const WebConfig = require('./config.js')
//公共方法
module.exports = {
  //首页相关
  setMainPageReloadState:function(){
    try {
      wx.setStorageSync('m_wechat_reloadmain', '1')
      //首页重新加载
    } catch (e) {
    }
  },
  clearMainPageReloadState:function(){
    try {
      wx.removeStorageSync('m_wechat_reloadmain')
    } catch (e) { }
  },
  setHouseEditReloadState:function(){
    try {
      wx.setStorageSync('m_wechatapp_houseedit', '1')
    } catch (e) {
    }
  },
  clearHouseEditReloadState: function () {
    try {
      wx.removeStorageSync('m_wechatapp_houseedit')
    } catch (e) { }
  },
  //过期提醒
  ShowExpireTip:function(that){
    var showmodaltext = "";
    that.data.showModal = false;
    //刚开始试用提示 条件，当前时间 = 账户创建时间 并且本地缓存不存在
    var text1 = "尊敬的用户您好，您的帐户为试用帐户，有效时间到"+moment(getApp().globalData.userData.END_DATE).format("YYYY年MM月DD日")+"，试用到期后如需继续使用，请办理年费会员。感谢您的支持!"
    //试用期三天倒计时 条件,到期时间-当前时间 <=2 并且本地缓存不存在
    var text2 = "尊敬的用户您好，您的帐户为试用帐户，试用到期时间为" + moment(getApp().globalData.userData.END_DATE).format("YYYY年MM月DD日") + "，试用到期后如需继续使用，请办理会员。感谢您的支持!"
    //已经到期用户 条件，当前时间 > 到期时间
    var text3 = "尊敬的用户您好，您的帐户为试用帐户，试用到期时间为" + moment(getApp().globalData.userData.END_DATE).format("YYYY年MM月DD日") + "，试用已经到期如需继续使用，请办理会员。感谢您的支持!"
    if (moment().format("YYYY-MM-DD") == moment(getApp().globalData.userData.REG_DATE).format("YYYY-MM-DD")) {
      //试用当天提示
      var showmodaltext = text1;
      that.data.showModal = true;
      getApp().globalData.Expire = false;
      if (getApp().globalData.userData.MEM_TYPE == 20){
        //已经充值
        that.setData({
          modalShowText: '',
          showModal: false
        })
        return
      }
    } else if (moment(getApp().globalData.userData.END_DATE).diff(moment(), 'days') < 3 && moment(getApp().globalData.userData.END_DATE).diff(moment(), 'days') >= 0) {
      //快到期三天提示
      //console.log(moment(getApp().globalData.userData.END_DATE).diff(moment(), 'days'))
      var showmodaltext = text2;
      that.data.showModal = false;
      getApp().globalData.Expire = false;
    } else if (moment().diff(moment(getApp().globalData.userData.END_DATE)) > 0) {
      //超过截止时间提示
      var showmodaltext = text3;
      that.data.showModal = true;
      getApp().globalData.Expire = true
      getApp().globalData.OutTimeOpenFun = true;
    }
    
    that.setData({
      modalShowText: showmodaltext,
      showModal: that.data.showModal
    })
  },
  //启动支付
  PayFun:function(paycode,paymoney,cb){
    var thatobj = this;
    var postData = {
      openId: getApp().globalData.userData.OPENID,
      orderNo: paycode,
      TOTALFEE: paymoney
    }
    CommonServices.WeChatPay(postData).then(function (ret) {
      if (!ret) {
        return;
      }
      wx.requestPayment({
        timeStamp: ret.timeStamp,
        nonceStr: ret.nonceStr,
        package: ret.package,
        signType: ret.signType,
        paySign: ret.paySign,
        'success': function (successret) {
          console.log('支付成功');
          if(cb){
            cb(1,successret)
          }else{
            thatobj.goBackReloadMember()
          }
        }, 'fail': function (res) {
          if (cb) {
            cb(0, res)
          }
        }
      })
    })
  },
  goBackReloadMember:function(reload){
    //加载会员信息
    var postData = {
      MEMBER_ID: getApp().globalData.userData.MEMBER_ID
    }
    WeChatServices.GetMember(postData).then(function (ret) {
      if (!ret) {
        return;
      }
      getApp().globalData.userData = ret[0]
      //修改本地缓存
      wx.setStorage({
        key: WebConfig.TokenName,
        data: ret[0]
      })
      setTimeout(function () { wx.navigateBack() }, 800)
    })
  },
  ReLoadMemberData:function(that){
    var postData = {
      MEMBER_ID: getApp().globalData.userData.MEMBER_ID
    }
    WeChatServices.GetMember(postData).then(function (ret) {
      if (!ret) {
        return;
      }
      getApp().globalData.userData = ret[0]
      //修改本地缓存
      wx.setStorage({
        key: WebConfig.TokenName,
        data: ret[0]
      })
      if(that){
        try {
          that.setData({
            userinfo: ret[0]
          })
        } catch (e) {

        }
      }
    })
  }
}