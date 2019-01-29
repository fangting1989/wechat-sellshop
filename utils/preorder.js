/**订单情况 */
var WebConfig = require("./config.js")
var _ = require('./underscore.modified.js');
module.exports = {
  addOrder:function(productData,unitData,numCount){
    var orderData = null;
    try {
      var value = wx.getStorageSync(WebConfig.TokenCartName)
      if (value) {
        orderData = value
      }
    } catch (e) {
      console.log("读取订单数据错误")
      return;
    }
    if(!orderData){
      orderData = [];
      productData.UnitArray = [];
      unitData.numCount = numCount;
      productData.UnitArray.push(unitData)
      orderData.push(productData)
    }else{
      var findProduct = false;
      var findProductUnit = false;
      _.each(orderData,function(item){
        if (item.keycode == productData.keycode){
          findProduct = true;
          //判断当前是否为相同的产品
          _.each(item.UnitArray,function(unitItem){
            if(unitItem.keycode == unitData.keycode){
              //找到对应的类型
              findProductUnit = true;
              unitItem.numCount += numCount
            }
          })
          if (!findProductUnit){
            //没有找到规格
            unitData.numCount = numCount;
            item.UnitArray.push(unitData);
          }
        }
      })
      if (!findProduct){
        //没有找到产品
        productData.UnitArray = [];
        unitData.numCount = numCount;
        productData.UnitArray.push(unitData)
        orderData.push(productData)
      }
    }
    //保存缓存
    try {
      wx.setStorageSync(WebConfig.TokenCartName, orderData)
    } catch (e) {
    }
  },
  delOrder: function (productData, unitData){
    var self = this;
    var orderData = null;
    try {
      var value = wx.getStorageSync(WebConfig.TokenCartName)
      if (value) {
        orderData = value
      }
    } catch (e) {
      console.log("读取订单数据错误")
      return;
    }
    if(!orderData){
      console.log("无订单数据")
      return;
    }
    var ProductItem = null;
    _.each(orderData, function (item) {
      if (item.keycode == productData.keycode) {
        //判断当前是否为相同的产品
        var index = _.findIndex(item.UnitArray, function(mitem){
          return mitem.keycode == unitData.keycode
        })
        if (index > -1) {
          item.UnitArray.splice(index, 1);
          item.UnitArray = item.UnitArray.slice();
        }
        if(item.UnitArray.length == 0){
          ProductItem = item
        }
      }
    })
    if (ProductItem){
      var index = _.findIndex(orderData, function (mitem) {
        return mitem.keycode == ProductItem.keycode
      })
      if (index > -1) {
        orderData.splice(index, 1);
        orderData = orderData.slice();
      }
    }
    //保存缓存
    try {
      wx.setStorageSync(WebConfig.TokenCartName, orderData)
    } catch (e) {
    }
  },
  updateOrder: function (productData, unitData, numCount){
    var orderData = null;
    try {
      var value = wx.getStorageSync(WebConfig.TokenCartName)
      if (value) {
        orderData = value
      }
    } catch (e) {
      console.log("读取订单数据错误")
      return;
    }
    if (!orderData) {
      console.log("无订单数据")
      return;
    }
    _.each(orderData, function (item) {
      if (item.keycode == productData.keycode) {
        //判断当前是否为相同的产品
        _.each(item.UnitArray, function (unitItem) {
          if (unitItem.keycode == unitData.keycode) {
            //找到对应的类型
            unitItem.numCount = numCount
          }
        })
      }
    })

    //保存缓存
    try {
      wx.setStorageSync(WebConfig.TokenCartName, orderData)
    } catch (e) {
    }
  },
  clearOrder:function(){
    try {
      wx.removeStorageSync(WebConfig.TokenCartName)
    } catch (e) { }
  },
  readOrder:function(){
    var orderData = null;
    try {
      var value = wx.getStorageSync(WebConfig.TokenCartName)
      if (value) {
        orderData = value
      }
    } catch (e) {
      console.log("读取订单数据错误")
      return null;
    }
    return orderData;
  },
  countOrder:function(){
    var orderData = null;
    try {
      var value = wx.getStorageSync(WebConfig.TokenCartName)
      if (value) {
        orderData = value
      }
    } catch (e) {
      console.log("读取订单数据错误")
      return null;
    }
    if (!orderData){
      return 0
    }else{
      var numCount = 0;
      _.each(orderData,function(item){
        _.each(item.UnitArray,it =>{
          numCount ++;
        })
      })
      return numCount;
    }
  }

}