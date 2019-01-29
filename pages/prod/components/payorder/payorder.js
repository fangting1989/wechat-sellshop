// pages/prod/components/payorder/payorder.js
const dataServices = require('../../services/dataServices.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ProdList:[],
    isNeedLogistics:1,
    hasNoCoupons:true,            //没有优惠券
    yunPrice:0,                   //运费
    curAddressData:null,
    userData:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userData = getApp().globalData.userData
    try {
      var value = wx.getStorageSync('topayprod-datalist')
      if (value) {
        this.setData({
          ProdList: value
        })
      }
    } catch (e) {
      return
    }
   
  },
  loadAddress:function(){
    var self = this;
    var postData = {
      usercode:this.data.userData.keycode,
      Enterpriseid: getApp().globalData.enterpriseid
    }
    dataServices.finddefaultaddress(postData).then(ret=>{
      if(ret){
        if (ret.data){
          ret.data.address = ret.data.province + ret.data.city + ret.data.contry + ret.data.address
          self.setData({
            curAddressData:ret.data
          })
        }
      }
    })
  },
  //新增地址
  addAddress:function(){
    //跳转到对应的
    wx.navigateTo({
      url: '../../../self/components/add-address/add-address'
    })
  },
  //选择地址
  selectAddress:function(){
    wx.navigateTo({
      url: '../select-address/select-address'
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
    this.loadAddress();
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

  }
})