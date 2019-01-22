// pages/prod/components/prod/prod.js
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
var WxParse = require('../../../../wxParse/wxParse.js');
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
    hideShopPopup: true,
    numCount:1,
    model:{},
    imageArray:[],
    hasShowvideo:false,
    selProductUnit:{},

    ShowPrice: '0',
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

        console.log(self.data.model)
      }
    })
    if (!this.data.selProductUnit.currpice){
      this.data.model.listproductunit[0].active = true
      this.setData({ 
        selProductUnit: this.data.model.listproductunit[0],
        model:self.data.model })
      console.log(self.data.model)
    }
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

  },
  /**
   * 组建购物车信息
   */
  bulidShopCarInfo: function () {
    // 加入购物车
    var shopCarMap = {};
    shopCarMap.goodsId = this.data.goodsDetail.basicInfo.id;
    shopCarMap.pic = this.data.goodsDetail.basicInfo.pic;
    shopCarMap.name = this.data.goodsDetail.basicInfo.name;
    // shopCarMap.label=this.data.goodsDetail.basicInfo.id; 规格尺寸 
    shopCarMap.propertyChildIds = this.data.propertyChildIds;
    shopCarMap.label = this.data.propertyChildNames;
    shopCarMap.price = this.data.selectSizePrice;
    shopCarMap.score = this.data.totalScoreToPay;
    shopCarMap.left = "";
    shopCarMap.active = true;
    shopCarMap.number = this.data.buyNumber;
    shopCarMap.logisticsType = this.data.goodsDetail.basicInfo.logisticsId;
    shopCarMap.logistics = this.data.goodsDetail.logistics;
    shopCarMap.weight = this.data.goodsDetail.basicInfo.weight;

    var shopCarInfo = this.data.shopCarInfo;
    if (!shopCarInfo.shopNum) {
      shopCarInfo.shopNum = 0;
    }
    if (!shopCarInfo.shopList) {
      shopCarInfo.shopList = [];
    }
    var hasSameGoodsIndex = -1;
    for (var i = 0; i < shopCarInfo.shopList.length; i++) {
      var tmpShopCarMap = shopCarInfo.shopList[i];
      if (tmpShopCarMap.goodsId == shopCarMap.goodsId && tmpShopCarMap.propertyChildIds == shopCarMap.propertyChildIds) {
        hasSameGoodsIndex = i;
        shopCarMap.number = shopCarMap.number + tmpShopCarMap.number;
        break;
      }
    }
    shopCarInfo.shopNum = shopCarInfo.shopNum + this.data.buyNumber;
    if (hasSameGoodsIndex > -1) {
      shopCarInfo.shopList.splice(hasSameGoodsIndex, 1, shopCarMap);
    } else {
      shopCarInfo.shopList.push(shopCarMap);
    }
    shopCarInfo.kjId = this.data.kjId;
    return shopCarInfo;
  },




})