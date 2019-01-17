
var baseServices = require("./baseServices.js")

module.exports = {
  FindPayRenter: function (data) {
    return baseServices.RequestData("payrenteController/findbyrenter", data, "GET")
  },
  //获得房东电话
  FindOwnerMobile: function (data){
    return baseServices.RequestData("renterController/gethouseownermobile", data, "GET")
  },
  //获得小区通知
  GetHouseNotice:function(data){
    return baseServices.RequestData("renterController/getHouseNotice", data, "GET")
  },
  //支付金额
  PayMoney:function(data){
    return baseServices.RequestData("renterController/PayMoney", data, "GET")
  },
  //获得房屋信息
  GetHouse: function (data) {
    return baseServices.RequestData("houseController/get", data, "GET")
  },
  GetRenterHouseByCode:function(data){
    return baseServices.RequestData("renterController/getRenterHouseByRenterCode", data, "GET")
  },
  //微信收费完成
  RenterFinishCode: function (data) {
    return baseServices.RequestData("renterController/renterfinishbycode", data, "GET")
  },
  findhousebyrentercode: function (data){
    return baseServices.RequestData("renterController/findhousebyrentercode", data, "GET")
  }
  
  
}