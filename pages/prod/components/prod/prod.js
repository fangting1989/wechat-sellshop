// pages/prod/components/prod/prod.js
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
var WxParse = require('../../../../wxParse/wxParse.js');
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

    selectSizePrice: 100,
    goodsDetail: {
      pics: [{
          name: '图片',
          picUrl: '/images/timg.jpg',
          businessId: 1
        },
        {
          name: '图片',
          picUrl: '/images/timg.jpg',
          businessId: 2
        },
        {
          name: '图片',
          picUrl: '/images/timg.jpg',
          businessId: 3
        }
      ],
      basicInfo: {
        name: '苹果',
        videoId: false,
        commissionType: 1,
        data: {
          nodes: '<p>这是我的测试内容</p>'
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    WxParse.wxParse('article', 'html', this.data.goodsDetail.basicInfo.data.nodes, self, 5);
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

  },
  //去加入购物车
  goaddprodtocart: function() {
    //
    this.setData({
      hideShopPopup: false,
      shopType: 'addShopCar'
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
  //加入购物车
  addshopcart: function() {

    console.log(this.data.numCount)

    if (this.data.goodsDetail.properties && !this.data.canSubmit) {
      if (!this.data.canSubmit) {
        wx.showModal({
          title: '提示',
          content: '请选择商品规格！',
          showCancel: false
        })
      }
      this.bindGuiGeTap();
      return;
    }
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }
    //组建购物车
    var shopCarInfo = this.bulidShopCarInfo();

    this.setData({
      shopCarInfo: shopCarInfo,
      shopNum: shopCarInfo.shopNum
    });

    // 写入本地存储
    wx.setStorage({
      key: 'shopCarInfo',
      data: shopCarInfo
    })
    this.closePopupTap();
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  },
  //立即购买
  buynow: function() {

  }




})