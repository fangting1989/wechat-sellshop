// pages/self/components/order-list/orderlist.js
const dataServices = require('../../services/dataServices.js')
const moment = require('../../../../utils/moment.min.js');
var _ = require('../../../../utils/underscore.modified.js');
const WebConfig = require('../../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    orderList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curType = options.orderstatus;
    if(curType){
      this.setData({
        currentType: curType
      });
    }
  },
  loadOrderData:function(){
    var self = this;
    var state = 0;
    console.log(this.data.currentType)
    switch (this.data.currentType + ''){
      case "0":state =1;break;
      case "1": state = 2; break;
      case "2": state = 3; break;
      case "3": state = 4; break;
      case "4": state = 99; break;
    }
    var postData = {
      enterpriseid: getApp().globalData.enterpriseid,
      orderisvalid:state,
      memberid: getApp().globalData.userData.keycode,
    }
    dataServices.loadOrderData(postData).then(ret=>{
      if(ret){
        _.each(ret.data,item=>{
          item.orderdate = moment(item.createdate).format('YYYY-MM-DD HH:mm:ss')
          _.each(item.list,dditem=>{
            dditem.imgpath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath + dditem.imgpath
          })
        })
        self.setData({
          orderList:ret.data
        })
        console.log(self.data.orderList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadOrderData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
})