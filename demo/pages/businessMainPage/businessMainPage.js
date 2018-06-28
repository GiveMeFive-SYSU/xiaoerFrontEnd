// page/component/new-pages/user/user.js
var app = getApp();
var utils = require("../../utils/util.js")
Page({
  data: {
    thumb: '',
    nickname: '',
    name:'杨小贤',
    cases:0,
    money:0,
    menusetting:null,
    tablesetting:null,
    paysetting:null,
    shopnamesetting:null,
    userInfo:[]
  },
  onLoad(options) {
    var self = this;
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.request({
      url: app.globalData.prefixUrl + "/users/queryshopname?username=" + options.username,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      complete: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        console.log(res);
        // 登录成功
        if (res.data.err == 0) {
          console.log('查询成功');
          that.setData({
            name: res.data.shopname
          })
          console.log(res.data.shopname);
        } else {
          console.log('密码错误');
        }
      }
    })
    // wx.request({
    //   url: app.globalData.prefixUrl + "/users/querTodayOrder?username=" + options.username + "&ordertime=" + utils.getDate(),
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "GET",
    //   complete: function (res) {
    //     if (res == null || res.data == null) {
    //       console.error('网络请求失败');
    //       return;
    //     }
    //     console.log(res);
    //     // 登录成功
    //     if (res.data.err == 0) {
    //       console.log('查询成功');
    //       that.setData({
    //         name: res.data.shopname
    //       })
    //       console.log(res.data.shopname);
    //     } else {
    //       console.log('密码错误');
    //     }
    //   }
    // })
    console.log(options);
    var menu = "../menuManager/menuManager?username=" + options.username;
    var table = "../tableManager/tableManager?username=" + options.username;
    var queue = "../queueManager/queueManager?username=" + options.username;
    var pay = "../payManager/payManager?username=" + options.username;
    var shopname = "../updateShopname/updateShopname";
    this.setData({
      shopnamesetting: shopname,
      menusetting: menu,
      tablesetting: table,
      name: options.shopname,
      paysetting: pay,
      queuesetting: queue
    });
  }
 
  
})