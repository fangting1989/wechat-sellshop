var baseServices = require("./baseServices.js")

module.exports = {
  FindMember: function (data) {
    return baseServices.RequestData("memberController/ValidMember",data,"GET")
  },
  GetMember:function(data){
    return baseServices.RequestData("memberController/get", data, "GET")
  },
  CreateMember:function(data){
    return baseServices.RequestData("memberController/insert", data, "POST")
  },
  InsertDistinct: function (data) {
    return baseServices.RequestData("distinctController/insert", data, "POST")
  },
  FindDistinct: function (data) {
    return baseServices.RequestData("distinctController/find", data, "GET")
  },
  FindHouse: function (data) {
    return baseServices.RequestData("houseController/find", data, "GET")
  },
  FindHouseRent: function (data) {
    return baseServices.RequestData("houseController/find", data, "GET")
  },
  //查询小区对应的房屋及租客信息
  FindDistinctRenter: function(data) {
    return baseServices.RequestData("distinctController/findrenter", data, "GET")
  },
  //查询小区对应的租房及当前需要缴纳房租情况
  FindDistinctCurrRenter: function (data) {
    return baseServices.RequestData("distinctController/findcurrrenter", data, "GET")
  },
  InsertHouse: function (data) {
    return baseServices.RequestData("houseController/insert", data, "POST")
  },
  //更新小区
  updateDistinct:function(data){
    return baseServices.RequestData("distinctController/update", data, "POST")
  },
  //插入租客
  InsertRenter:function(data){
    return baseServices.RequestData("renterController/insert", data, "POST")
  },
  //用户更新提醒
  UpdateMemberDate:function(data){
    return baseServices.RequestData("memberController/updatedate", data, "POST")
  },
  //更新租房信息
  UpdateRenterHouse:function(data){
    return baseServices.RequestData("renterhouseController/update", data, "POST")
  },
  /*退租*/
  UpdateRenterHouseTz: function (data) {
    return baseServices.RequestData("renterhouseController/updattz", data, "POST")
  },
  /*获得收租列表*/
  getjzList: function (data){
    return baseServices.RequestData("renterhouseController/getjz", data, "GET")
  },
  //添加银行卡
  InsertTXCard:function(data){
    return baseServices.RequestData("txcardController/insert", data, "POST")
  },
  //设置默认银行卡
  UpdateDefaultTXCard: function (data) {
    return baseServices.RequestData("txcardController/updatedefault", data, "GET")
  },
  //提现银行
  FindTxcard: function (data) {
    return baseServices.RequestData("txcardController/find", data, "GET")
  },
  /*插入提现*/
  Inserttxdetail:function(data){
    return baseServices.RequestData("txdetailController/insert", data, "POST")
  },
  /*查询提现*/
  Findtxdetail: function (data) {
    return baseServices.RequestData("txdetailController/find", data, "GET")
  },
  //查看历史明细
  FindPayRenter:function(data){
    return baseServices.RequestData("payrenteController/find", data, "GET")
  },
  //插入用户
  UpsertMember:function(data){
    return baseServices.RequestData("memberController/upsertbycode", data, "POST")
  },
  //插入租客
  UpsertRenter: function (data) {
    return baseServices.RequestData("renterController/upsertbycode", data, "POST")
  },
  //房屋租客
  GetHouseRenters:function(data){
    return baseServices.RequestData("renterController/renterListByHouseID", data, "GET")
  },
  //删除租客
  DelRenter: function (data){
    return baseServices.RequestData("renterController/del", data, "GET")
  },
  //获得房屋信息
  GetHouse: function (data) {
    return baseServices.RequestData("houseController/get", data, "GET")
  },
  //更新房屋
  UpdateHouse:function(data){
    return baseServices.RequestData("houseController/update", data, "POST")
  },
  //房屋
  GetHouseRenter: function (data) {
    return baseServices.RequestData("houseController/getHouseRenter", data, "GET")
  },
  //收租完成
  RenterFinish:function(data){
    return baseServices.RequestData("renterController/renterfinish", data, "GET")
  },
  //会员充值,短信充值
  insertbycode:function(data){
    return baseServices.RequestData("payrenteController/insertbycode", data, "POST")
  },
  //获得会员成功分享的内容
  GetTJMemberList: function (data) {
    return baseServices.RequestData("memberController/GetTJMemberList", data, "GET")
  },
  //获得tags
  GetTagsList:function(data){
    return baseServices.RequestData("tagsController/find", data, "GET")
  },
  /*获得区域*/
  PROVINCESGet:function(data){
    return baseServices.RequestData("distinctController/PROVINCESGet", data, "GET")
  },
  /*获得小区*/
  DistinctsGet:function(data){
    return baseServices.RequestData("distinctController/DistinctsGet", data, "GET")
  },
  /*根据房屋内码查看上次获得内容*/
  elefindbyhouseID: function (data) {
    return baseServices.RequestData("powereleController/findbyhouseID", data, "GET")
  },
  elemeterFind:function(data){
    return baseServices.RequestData("elemeterController/find", data, "GET")
  },
  /*设置读取状态*/
  elemeterRead: function (data) {
    return baseServices.RequestData("elemeterController/read", data, "GET")
  },
  /*获得状态*/
  elemetergetState: function (data) {
    return baseServices.RequestData("elemeterController/getState", data, "GET")
  },
  /*已经绑定设备列表*/
  elemeterhasBindDevice: function (data) {
    return baseServices.RequestData("elemeterController/hasBindDevice", data, "GET")
  },
  /*未绑定设备列表*/
  elemeternoBindDevice: function (data) {
    return baseServices.RequestData("elemeterController/noBindDevice", data, "GET")
  },
  /*解除绑定设备*/
  elemeterunBindDevice: function (data) {
    return baseServices.RequestData("elemeterController/unBindDevice", data, "GET")
  },
  /*绑定设备*/
  elemeterBindDevice: function (data) {
    return baseServices.RequestData("elemeterController/BindDevice", data, "GET")
  },
  
} 