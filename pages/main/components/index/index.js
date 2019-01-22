// pages/main/components/index/index.js

const dataServices = require('../../services/dataServices.js')
var _ = require('../../../../utils/underscore.modified.js');
const WebConfig = require('../../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: 0,
    loadingMoreHidden: true,
    
    hasNoCoupons: true,
    coupons: [],
    searchInput: '',

    active: 0,
    pagenum: 1,
    pagesize: 20,
    prodtypeArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.data.banners = [{ name: '图片', picUrl: '/images/timg.jpg', businessId:1},
      { name: '图片', picUrl: '/images/timg.jpg', businessId: 2},
      { name: '图片', picUrl: '/images/timg.jpg', businessId: 3 }]
    self.setData({
      banners: self.data.banners
    });
    self.setData({
      loadingMoreHidden:false
    })

    //加载类别
    this.loadProducttype()
  },

  loadData:function(){
   

  },
  //加载类别
  loadProducttype:function(){
    var self = this;
    var postData = {
      pagesize: this.data.pagesize,
      pagenum: this.data.pagenum,
      enterpriseid: getApp().globalData.enterpriseid,
      pid:-1,
      isvalid:1
    }
    dataServices.Producttype(postData).then(function(ret){
      if(ret){
        self.setData({
          prodtypeArray :ret.data
        })
        //加载对应的商品
        console.log(self.data.prodtypeArray)
        if (self.data.prodtypeArray.length > 0){
          self.loadProduct(self.data.prodtypeArray[0])
        }
      }
    })
  },
  loadProduct:function(typeitem){
    var self = this;
    var postData = {
      pagesize: this.data.pagesize,
      pagenum: this.data.pagenum,
      enterpriseid: getApp().globalData.enterpriseid,
      producttype: typeitem.objectTypeID,
      productvalid:1,
      pid: -1
    }
    dataServices.findProduct(postData).then(function (ret) {
      if (ret) {
        //设置价格
        _.each(ret.data,function(item){
          if (item.listproductunit.length == 0){
            item.nowprice = item.productcurprice
          }else{
            item.nowprice = item.listproductunit[0].currpice
          }
          //图片路径
          item.pic = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath + item.productimage
        })
        console.log(ret)
        self.setData({
          goods:ret.data
        })
      }else{
        self.setData({
          goods: []
        })
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
  swiperchange:function(){

  },
  //商品详情
  toDetailsTap: function (event){
    var DataItem = event.currentTarget.dataset.databind;
    console.log(DataItem)
    wx.setStorage({
        key: 'prodinfo',
        data: DataItem
      })

    wx.navigateTo({
      url: '../../../prod/components/prod/prod'
    })
  },
  onChange_prodtype: function (e){
    var self = this;
    if (this.data.prodtypeArray.length > e.detail.index){
      self.loadProduct(this.data.prodtypeArray[e.detail.index])
    }
  }
})