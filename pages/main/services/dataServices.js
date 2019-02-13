var baseServices = require("../../../utils/baseServices.js")
var WebConfig = require('../../../utils/config.js')
module.exports = {
  //
  Producttype: function (data) {
    return baseServices.RequestData("TObjecttypeApiService/find", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  },
  findProduct: function (data) {
    return baseServices.RequestData("TProductApiService/find", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  },
  orderstate:function(data){
    return baseServices.RequestData("TOrderApiService/orderstate", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  }
  
}