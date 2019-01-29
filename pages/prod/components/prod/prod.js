// pages/prod/components/prod/prod.js
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
var WxParse = require('../../../../wxParse/wxParse.js');
const dataServices = require('../../services/dataServices.js')
var _ = require('../../../../utils/underscore.modified.js');
const WebConfig = require('../../../../utils/config.js')
var OrderHelper = require('../../../../utils/preorder.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hideShopPopup: true,
    numCount:1,
    model:{},
    imageArray:[],
    hasShowvideo:false,
    selProductUnit:{},
    ShowPrice: '0',
    cartCount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    try {
      var value = wx.getStorageSync('prodinfo')
      if (value) {
        this.setData({
          model: value
        })
      }
    } catch (e) {
      return
    }
    this.loadImages();
    //初始化数据
    this.InitData();
  },

  InitData:function(){
    var self = this;
    //初始化价格
    var len = this.data.model.listproductunit.length
    var price = ''
    if (len > 1) {
      //显示价格区间
      price = this.data.model.listproductunit[0].currpice + "-" + this.data.model.listproductunit[len - 1].currpice;
    } else {
      price = this.data.model.listproductunit[0].currpice
    }
    this.setData({
      ShowPrice: price
    })
    //初始化规格选择
    _.each(this.data.model.listproductunit,item=>{
      if(item.isdefault){
        item.active= true
        this.setData({ 
          selProductUnit: item,
          model: self.data.model
         })
      }
    })
    if (!this.data.selProductUnit.currpice){
      this.data.model.listproductunit[0].active = true
      this.setData({ 
        selProductUnit: this.data.model.listproductunit[0],
        model:self.data.model })
    }
    //
    this.refreshCartCount();
    //初始化正文
    WxParse.wxParse('article', 'html', this.data.model.productcontent, self, 5);
  },

  loadImages:function(){
    var self = this;
    var postData = {
      enterpriseid: getApp().globalData.enterpriseid,
      tablename:'prod',
      tableid:this.data.model.keycode
    }
    dataServices.findImages(postData).then(res=>{
      if(res){
        _.each(res.data,function(item){
          //图片路径
          item.pic = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath + item.filepath
        })
        self.setData({
          imageArray:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onClickIcon() {
    Toast('点击图标');
  },

  onClickButton() {
    Toast('点击按钮');
  },
  swiperchange: function() {

  },
  //跳转到购物车
  gocart: function() {
    wx.switchTab({
      url: '../../../main/components/cart/cart', success: function (e) {
      },
      fail: function (err) {
      },
      complete: function () {

      }
    })
  },
  //去加入购物车
  goaddprodtocart: function() {
    //
    this.setData({
      hideShopPopup: false,
      shopType: 'addShopCar'
    })
  },

  //选择规格
  produnitClick:function(event){
    var DataItem = event.currentTarget.dataset.databind;
    _.each(this.data.model.listproductunit,item=>{
      item.active = false;
      if(item.keycode == DataItem.keycode){
        item.active = true
      }
    })
    this.setData({
      model:this.data.model,
      selProductUnit:DataItem
    })
  },

  //去立即购买
  gocostprod: function() {
    this.setData({
      hideShopPopup: false,
      shopType: 'tobuy'
    })
  },
  closePopupTap: function() {
    this.setData({
      hideShopPopup: true,

    })
  },
  onChange:function(e){
    this.data.numCount = e.detail;
  },
  //----加入购物车
  addshopcart: function() {
    if (!this.data.selProductUnit.keycode){
      wx.showModal({
        title: '提示',
        content: '请选择商品规格！',
        showCancel: false
      })
      return
    }
    if (this.data.numCount <= 0){
      wx.showModal({
        title: '提示',
        content: '请选择数量',
        showCancel: false
      })
      return
    }
    
    OrderHelper.addOrder(this.data.model,this.data.selProductUnit,this.data.numCount)

    this.refreshCartCount();
    this.closePopupTap();
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  },
  //立即购买
  buynow: function() {

  },

  refreshCartCount:function(){
    
    var cartCount = OrderHelper.countOrder();
    if(cartCount == 0){
      this.setData({
        cartCount: ''
      })
    }else{
      this.setData({
        cartCount: cartCount
      })
    }
    
  }

})