var baseServices = require("../../../utils/baseServices.js")
var WebConfig = require('../../../utils/config.js')
module.exports = {
  //
  findImages: function (data) {
    return baseServices.RequestData("TFileApiService/find", data, "GET", WebConfig.RequestUrl.fileuploadpath)
  },

  
}