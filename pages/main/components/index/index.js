// pages/main/components/index/index.js
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

    curPage: 1,
    pageSize: 20
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

    //商品数据
    self.data.goods = [
      { name: '苹果', minPrice: '20.00', originalPrice: '38.00', pic:'/images/prod/timg.jpg'},
      { name: '苹果', minPrice: '20.00', originalPrice: '38.00', pic: '/images/prod/timg.jpg' },
      { name: '苹果', minPrice: '20.00', originalPrice: '38.00', pic: '/images/prod/timg.jpg' },
      { name: '苹果', minPrice: '20.00', originalPrice: '38.00', pic: '/images/prod/timg.jpg' },
      { name: '苹果', minPrice: '20.00', originalPrice: '38.00', pic: '/images/prod/timg.jpg' },
      { name: '苹果', minPrice: '20.00', originalPrice: '38.00', pic: '/images/prod/timg.jpg' }
    ]
    self.setData({
      goods:self.data.goods,
      loadingMoreHidden:false
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
  toDetailsTap:function(){
    wx.navigateTo({
      url: '../../../prod/components/prod/prod?id=1'
    })
  }
})