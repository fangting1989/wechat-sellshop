// pages/prod/components/select-address/select-address.js
const dataServices = require('../../services/dataServices.js')
var _ = require('../../../../utils/underscore.modified.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    userData:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userData = getApp().globalData.userData
  },
  loadAddress:function(){
    var self = this;
    var postData = {
      usercode: this.data.userData.keycode,
      Enterpriseid: getApp().globalData.enterpriseid
    }
    dataServices.findalladdress(postData).then(ret => {
      if (ret) {
        if (ret.data) {
          ret.data.address = ret.data.province + ret.data.city + ret.data.contry + ret.data.address
          self.setData({
            addressList: ret.data
          })
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

  },
  addAddess:function(){
    //跳转到对应的
    wx.navigateTo({
      url: '../../../self/components/add-address/add-address'
    })
  },
  selectTap:function(e){
    var self = this
    var DataItem = e.currentTarget.dataset.databind;
    if(DataItem.isdefault){
      return
    }
    var postData = {
      enterpriseid:getApp().globalData.enterpriseid,
      usercode:getApp().globalData.userData.keycode,
      keycode:DataItem.keycode
    }
    dataServices.changedefaultaddress(postData).then(ret=>{
      if(ret.data){
        _.each(self.data.addressList,item =>{
          item.isdefault = 0
          if(item.keycode == DataItem.keycode){
            item.isdefault = 1
          }
        })

        self.setData({
          addressList: self.data.addressList
        })

        //关闭退回
        setTimeout(function () { wx.navigateBack() }, 800)
      }
    })
  }
})