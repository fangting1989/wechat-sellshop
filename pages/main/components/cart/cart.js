var OrderHelper = require('../../../../utils/preorder.js')
var _ = require('../../../../utils/underscore.modified.js');
const dataServices = require('../../services/dataServices.js')
import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast";
// pages/main/components/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      totalScoreToPay: 0,
      allSelect: true,
      noSelect: false,
      list: [],
    },
    delBtnWidth: 120,    //删除按钮宽度单位（rpx）
    allChecked: false,
    totalMoney:0,
    userinfo:{},
    showTips:false
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
    var Datalist = OrderHelper.readOrder();
    if (!Datalist) {
      return
    }
    //调整成为列表
    var list = [];
    _.each(Datalist, item => {
      _.each(item.UnitArray, unititem => {
        var productitem = item;
        productitem.unitname = unititem.unitname
        productitem.currpice = unititem.currpice
        productitem.unitkeycode = unititem.keycode
        productitem.unit = unititem.unit
        productitem.unitsize = unititem.unitsize
        productitem.numCount = unititem.numCount
        productitem.currUnit = unititem;
        list.push(productitem)
      })
    })
    this.data.goodsList.list = list
    this.setData({
      goodsList: this.data.goodsList
    })
    try{
      if (getApp().globalData.userData){
        this.setData({
          userinfo: getApp().globalData.userData,
          showTips:false
        })
      }else{
        this.setData({
          showTips:true
        })
      }
    }catch(e){

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
  //全选
  onCheckAllChange:function(e){
    var state = e.detail
    _.each(this.data.goodsList.list, mitem => {
      mitem.active = state
    })
    this.setData({
      allChecked: state,
      goodsList: this.data.goodsList
    })
    //重新计算费用
    this.reCharge();
  },
  //单选
  selectTap: function (event){
    var state = event.detail
    var item = event.currentTarget.dataset.databind;
    _.each(this.data.goodsList.list,mitem =>{
      if(mitem.keycode == item.keycode){
        mitem.active = state
      }
    })
    this.setData({
      goodsList: this.data.goodsList
    })
    this.reCharge();
  },
  //数量变化
  onnumCountChange:function(event){
    var item = event.currentTarget.dataset.databind;
    var numCount = event.detail
    //修改数量
    _.each(this.data.goodsList.list, mitem => {
      if (mitem.keycode == item.keycode) {
        mitem.numCount = numCount;
      }
    })
    //修改缓存
    OrderHelper.updateOrder(item,item.currUnit,numCount)
    this.reCharge();
  },

  //重新计算
  reCharge:function(){
    var money = 0
    _.each(this.data.goodsList.list, mitem => {
      if (mitem.active) {
        money += mitem.currpice * 100 * mitem.numCount
      }
    })
    this.setData({
      totalMoney:money
    })
  },
  //删除单项
  delCartItem:function(event){
    var item = event.currentTarget.dataset.databind;
    //删除内容
    var index = _.findIndex(this.data.goodsList.list, function (mitem) {
      return item.keycode == mitem.keycode
    })
    if (index > -1) {
      this.data.goodsList.list.splice(index, 1);
      this.data.goodsList.list = this.data.goodsList.list.slice();
    }
    this.setData({
      goodsList: this.data.goodsList
    })
    //删除缓存
    OrderHelper.delOrder(item, item.currUnit)
    //重新计算
    this.reCharge();
  },

  onCreateOrder:function(){
    //跳转到支付页面
    if(this.data.totalMoney == 0){
      Toast.fail('请选择购买的商品');
      return
    }
    //判断用户信息是否存在
    var ProductList = []
    _.each(this.data.goodsList.list,function(item){
      if(item.active){
        ProductList.push(item)
      }
    })
    
    if (!this.data.userinfo && !this.data.userinfo.keycode){
      Toast.fail('对不起，请先用户授权');
      return
    }
    //
    _.each(ProductList,item =>{
      delete item.UnitArray
      delete item.listproductunit
      delete item.objecttype
      delete item.productcontent
      delete item.wechatshare
      delete item.currUnit
    })
    //商品写入缓存
    var DataItem = ProductList;
    wx.setStorage({
      key: 'topayprod-datalist',
      data: DataItem
    })

    //跳转到对应的支付页面
    wx.navigateTo({
      url: '../../../prod/components/payorder/payorder'
    })

    return;


    var self = this;
    console.log(this.data.goodsList.list)
    console.log(ProductList)
    console.log(this.data.totalMoney);
    var postData = {
      list: ProductList,
      enterpriseid: getApp().globalData.enterpriseid,
      memberkeycode: this.data.userinfo.keycode,
      membername: this.data.userinfo.membername,
      address:'浙江杭州',
      person:'zhangsan',
      tel:'18657181338',
    }
    dataServices.CreateOrderByCart(postData).then(function (ret) {
      if (ret) {
        console.log(ret)
      }
    })
  }
})