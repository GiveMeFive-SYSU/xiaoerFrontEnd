//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.login({
      success: function (res) {
        //我的appid：wxb0295a71214e7ca7
        //我的secret:a020b2bc99aa544bb318f8248aab7ef4
        //var appid = 'wx0b3b9d62aac2598e'; //填写微信小程序appid  
        //var secret = '95aaca9fe631361a3ad10213e85d0f40'; //填写微信小程序secret  
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.prefixUrl + '/api/v1/getOpenID?js_code=' + res.code,
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.globalData.openID = res.data.openid
              console.log(that.globalData.openID)
              console.log(res.data.openid) //获取openid  
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getOpenid: function () {
    return this.globalData.openID;
  },
  globalData: {
    userInfo: null,
    openID: null,
    prefixUrl: "http://127.0.0.1:3000",
  }
})
