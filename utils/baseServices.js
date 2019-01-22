const WebConfig = require('./config.js')
var Promise = require("./bluebird.min.js")
module.exports = {
  RequestData:function(methodurl, data, method,exturl) {
    return new Promise(function (resolve, reject) {
      let url = WebConfig.BaseUrl + exturl + methodurl
      wx.showLoading({title:"加载数据中...",mask:false})
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data && res.data.errid < 0){
            wx.showToast({
              title: res.data.errmsg,
              icon: 'none',
              duration: 2000
            })
            if (res.data.errid == -200){
              resolve(res.data)
            }else{
              resolve(null)
            }
          }else{
            resolve(res.data)
          }
        },
        fail: function (err) {
          wx.showToast({
            title: "网络连接错误",
            icon: 'none',
            duration: 2000
          })
          reject(err)
        },
        complete:function(){
          wx.hideLoading()
        }
      })
    })
  },
  RequestBaseData: function (methodurl, data, method, exturl) {
    return new Promise(function (resolve, reject) {
      let url = WebConfig.BaseUrl + exturl + methodurl
      wx.showLoading({ title: "加载数据中...", mask: false })
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: "网络连接错误："+err.errMsg,
            icon: 'none',
            duration: 5000
          })
          reject(err)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },
  Request: function (url, data, method, exturl) {
    return new Promise(function (resolve, reject) {
      wx.showLoading({ title: "加载数据中...", mask: false })
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: "网络连接错误：" + err.errMsg,
            icon: 'none',
            duration: 5000
          })
          reject(err)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },
  RequestImage: function (methodurl, data, method, exturl) {
    return new Promise(function (resolve, reject) {
      let url = WebConfig.BaseUrl + exturl + methodurl
      wx.showLoading({ title: "加载数据中...", mask: false })
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          resolve('data:image/png;base64,' + res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: "网络连接错误：" + err.errMsg,
            icon: 'none',
            duration: 5000
          })
          reject(err)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  }

} 
