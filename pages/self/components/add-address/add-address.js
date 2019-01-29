// pages/self/components/add-address/add-address.js
var address = require('../../../../utils/city.js')
const dataServices = require('../../services/dataServices.js')
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:{
    
    },
    userData:null,
    value: [0, 0, 0],
    addressMenuIsShow: false,
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    areaInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置用户信息
    this.data.userData = getApp().globalData.userData
    //加载动画
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
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
  //区域选择------------------------------
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    this.startAddressAnimation(false)
    this.houseTypeAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  //--------属性赋值---------------------------------
  onChange_linkman:function(e){
    this.data.model.linkman = e.detail
    this.setData({
      model:this.data.model
    })
  },
  onChange_linktel:function(e){
    this.data.model.linktel = e.detail
    this.setData({
      model: this.data.model
    })
  },
  onChange_address:function(e){
    this.data.model.address = e.detail
    this.setData({
      model: this.data.model
    })
  },
  onChange_District:function(e){
    //区域
    console.log(e)
  },
  onChange_zipcode:function(e){
    this.data.model.zipcode = e.detail
    this.setData({
      model: this.data.model
    })
  },
  //------------------------------
  SaveClick:function(){
    //拆分
    var dataArray = this.data.areaInfo.split(',')
    if(dataArray.length >=1){
      this.data.model.province = dataArray[0]
    }
    if (dataArray.length >= 2) {
      this.data.model.city = dataArray[1]
    }
    if (dataArray.length >= 3) {
      this.data.model.contry = dataArray[2]
    }
    var postData = {
      ...this.data.model,
      keycode: this.data.userData.keycode,
      enterpriseid: getApp().globalData.enterpriseid
    }
    console.log(postData)
    dataServices.insertAddress(postData).then(ret=>{
      if(ret){
        Toast.success("地址保存成功!")
        console.log(ret)
        //关闭退回
        setTimeout(function () { wx.navigateBack() }, 800)
      }
    })
  }
})