// businessLogin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    username: null,
    key: null,
    pwd: null,
    toastHidden: true,
    message: null,
  },
  temppwd: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad');
    console.log(options);
    this.setData({
      username: options.username,
      key: options.key
    });
    console.log(this.data);
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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
  pwdinput: function(e) {
    this.temppwd = e.detail.value;

  },
  login: function() {
    if (this.temppwd.length != 0) {
      this.setData({
        pwd: this.temppwd
      });
      var that = this;
      var utilMd5 = require('../../utils/md5.js');
      var password32 = utilMd5.hexMD5(this.data.pwd);
      var password13 = password32.substr(5, 13);
      wx.request({
        url: app.globalData.prefixUrl + "/users/login",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: that.data.username,
          password: password13
        },

        complete: function(res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
          console.log(res);
          // 登录成功
          if (res.data.err == 0) {
            console.log('登录成功');
            wx.redirectTo({
              url: '../businessMainPage/businessMainPage?username=' + that.data.username + '&shopname=' + res.data.shopname,
            })
          } else {
            console.log('密码错误');
            that.setData({
              toastHidden: !that.data.toastHidden,
              message: "密码错误"
            });
          }
        }
      })
    } else {
      this.setData({
        toastHidden: !this.data.toastHidden,
        message: "请输入密码"
      });
    }

  },
  toastBindChange: function() {
    this.setData({
      toastHidden: !this.data.toastHidden
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})