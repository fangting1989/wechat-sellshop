var baseServices = require("../../utils/baseServices.js")
var WebConfig = require('../../utils/config.js')
module.exports = {
  //
  saveMember: function (data) {
    return baseServices.RequestData("TMemberApiService/savebyopenid", data, "POST", WebConfig.RequestUrl.sellsiteservice)
  },
  //微信
  GetUserOpenidByCode:function(data){
    return baseServices.RequestData("WeChatApiService/GetUserOpenidByCode", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  }
}