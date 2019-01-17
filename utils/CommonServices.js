var baseServices = require("./baseServices.js")

module.exports = {
  WeChatGetOpenid: function (data) {
    return baseServices.RequestBaseData("comController/getUserInfo", data, "GET")
  },
  WeChatGetToken: function (data) {
    return baseServices.RequestBaseData("comController/getwechattoken", data, "GET")
  },
  //请求获得二维码
  WeChatQRCode:function(AccessToken,data){
    return baseServices.RequestImage("https://api.weixin.qq.com/wxa/getwxacode?access_token=" + AccessToken,data,"POST")
  },
  WeChatNormalQRCode: function (AccessToken, data) {
    return baseServices.RequestImage("https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=" + AccessToken, data, "POST")
  },
  WeChatQRCodeEx:function(data){
    return baseServices.RequestImage("comController/getwechatqrcode", data, "POST")
  },
  WeChatAppQRCode: function (data) {
    return baseServices.RequestImage("comController/getwechatqrcode", data, "POST")
  },
  /*请求生成二维码，返回路径*/
  WeChatQRCodePath: function (data) {
    return baseServices.RequestData("comController/getwechatqrcodepath", data, "POST")
  },
  /*微信支付*/
  WeChatPay:function(data){
    return baseServices.RequestData("wechatpayController/wechatpay", data, "GET")
  },
  /*验证码*/
  ValidCodeSend:function(data){
    return baseServices.RequestData("smsController/validcode", data, "GET")
  }
  
} 