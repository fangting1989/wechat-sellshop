var baseServices = require("../../../utils/baseServices.js")
var WebConfig = require('../../../utils/config.js')
module.exports = {
  //
  findImages: function (data) {
    return baseServices.RequestData("TFileApiService/find", data, "GET", WebConfig.RequestUrl.fileuploadpath)
  },

  finddefaultaddress:function(data){
    return baseServices.RequestData("TAddressApiService/finddefaultaddress", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  },
  findalladdress:function(data){
    return baseServices.RequestData("TAddressApiService/findalladdress", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  },
  changedefaultaddress:function(data){
    return baseServices.RequestData("TAddressApiService/changedefaultaddress", data, "GET", WebConfig.RequestUrl.sellsiteservice)
  }
  
}