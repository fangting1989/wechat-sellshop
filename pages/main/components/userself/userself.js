// pages/main/components/userself/userself.js
const dataServices = require('../../services/dataServices.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
    }, 
    userData:null,
    showAuthButton:false,
    prepayorder:null,
    prereceiveorder:null,
    presendorder:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用户信息
    this.setData({
      userInfo: getApp().globalData.userInfo,
      userData: getApp().globalData.userData
    })
    //是否包含用户信息
    if (getApp().globalData.userData && getApp().globalData.userData.keycode ){
      this.setData({
        showAuthButton:false
      })
    }else{
      this.setData({
        showAuthButton: true
      })
    }
  },
  loadOrderState:function(){
    var self = this
    //加载订单情况
    var postData = {
      enterpriseid: getApp().globalData.enterpriseid,
      usercode:this.data.userData.keycode
    }
    dataServices.orderstate(postData).then(ret=>{
      if(ret){
        if(ret.data){
          if (ret.data.prepayorder){
            this.setData({
              prepayorder: ret.data.prepayorder
            })
          }
          if (ret.data.presendorder) {
            this.setData({
              presendorder: ret.data.presendorder
            })
          }
          if (ret.data.prereceiveorder) {
            this.setData({
              prereceiveorder: ret.data.prereceiveorder
            })
          }
        }
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
    if(this.data.userData){
      this.loadOrderState();
    }
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
  //地址管理
  addressmanager:function(){
    wx.navigateTo({
      url: '../../../self/components/select-address/select-address'
    })
  },
  //全部订单
  allorder:function(){
    wx.navigateTo({
      url: '../../../self/components/order-list/orderlist'
    })

    // orderstatus
  },
  //"待付款", "待发货", "待收货", "已完成"
  prepayorder:function(){
    wx.navigateTo({
      url: '../../../self/components/order-list/orderlist?orderstatus=0'
    })
  },
  presendorder:function(){
    wx.navigateTo({
      url: '../../../self/components/order-list/orderlist?orderstatus=1'
    })
  },
  prereceiveorder:function(){
    wx.navigateTo({
      url: '../../../self/components/order-list/orderlist?orderstatus=2'
    })
  },
  finishorder:function(){
    wx.navigateTo({
      url: '../../../self/components/order-list/orderlist?orderstatus=4'
    })
  },
  //联系商户
  contactbus:function(){
    
  },
  //测试图标
  testchartsclick:function(){
    wx.navigateTo({
      url: '../../../self/components/mcharts/mcharts'
    })
  },
  authButtonClick:function(){
    //授权按钮点击
  }

})