// pages/main/components/userself/userself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName:'张三',
      avatarUrl:'/images/headimg/132.jpg'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }

})