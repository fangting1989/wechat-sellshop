var baseServices = require("../../../utils/baseServices.js")
var WebConfig = require('../../../utils/config.js')
module.exports = {
  //保存地址
  insertAddress: function (data) {
    return baseServices.RequestData("TAddressApiService/insert", data, "POST", WebConfig.RequestUrl.sellsiteservice)
  },
}