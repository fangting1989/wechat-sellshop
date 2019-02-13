// pages/prod/components/payorder/payorder.js
const dataServices = require('../../services/dataServices.js')
var _ = require('../../../../utils/underscore.modified.js');
import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast";
var OrderHelper = require('../../../../utils/preorder.js')
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
    totalMoney:0,                 //总金额
    totalPoints:0,                //总积分
    loadding:false,
    remark:null,
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
    //
    this.refreshMoney();
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
  BindInputRemark:function(e){
    this.data.remark = e.detail.value;
  },
  refreshMoney:function(){
    //总费用,商品费用 + 运费 - 优惠金额
    var money = 0;
    _.each(this.data.ProdList,function(item){
      money += item.numCount * item.currpice * 100
    })
    //运费
    money += this.data.yunPrice * 100
    //优惠券
    money = money / 100.00
    
    this.setData({
      totalMoney:money
    })
  },
  SubmitOrder:function(){
    // _.each(this.data.ProdList, mmitem => {
    //   console.log(mmitem)
    //   // OrderHelper.delOrder(item, item.currUnit)
    // })
    // return;


    //提交订单
    if (this.data.ProdList.length == 0){
      Toast.fail("未找到商品~")
      return
    }
    if (this.data.loadding){
      return;
    }
    this.data.loadding = true
    var self = this;
    var postData = {
      list: this.data.ProdList,
      enterpriseid: getApp().globalData.enterpriseid,
      memberkeycode: this.data.userData.keycode,
      membername: this.data.userData.membername || this.data.userData.wechatname,
      address: this.data.curAddressData.address,
      person: this.data.curAddressData.linkman,
      tel: this.data.curAddressData.linktel,
      zipamount: this.data.yunPrice,
      remark: this.data.remark
    }
    dataServices.CreateOrderByCart(postData).then(function (ret) {
      self.data.loadding = false
      if (ret) {
        console.log(ret)
        if(ret.data.order.keycode){
          Toast.success("订单提交成功!")
          //清楚购物车
          _.each(self.data.ProdList,mmitem=>{
            console.log(mmitem)
            OrderHelper.delOrder(mmitem, { keycode: mmitem.unitkeycode,unitname:mmitem.unitname})
          })

          //1秒后跳转到购物车
          setTimeout(function(){
            wx.switchTab({
              url: '../../../main/components/cart/cart', success: function (e) {
              },
              fail: function (err) {
              },
              complete: function () {

              }
            })
          },1000)

        }
      }
    })
  }
})