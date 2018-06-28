// menuManager.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tables: [
      {
        tableno: 1,
        order: {
          orderid: 1,
          dishes: [
            {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }, {
              dishname: 'dishname1',
              price: 10,
              num: 5
            }
          ]
        }
      },
      {
        tableno: 2,
        order: {
          dishes: [
            {
              dishname: 'dishname2',
              price: 9,
              num: 3
            }
          ]
        }
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // if (this.data.tables.length != 0) return;
    wx.request({
      url: app.globalData.prefixUrl + '/api/v1/searchOrder/showUnfinishedOrder?username=' + app.getOpenid(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      complete: function(res) {
        console.log("#####排队管理")
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        console.log(res);
      }
    });
  },
  finishOrder: function(orderid) {
    wx.request({
      url: app.globalData.prefixUrl + '/api/v1/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      complete: function (res) {
        if (res == null || res.data == null) {
          console.log("网络连接失败");
          wx.showToast({
            title: "网络连接失败",
            icon: "none"
          })
          return;
        }
        len = that.data.tables.length;
        for (i = 0; i < len; i++) {
          if (that.data.tables[i].order.orderid == orderid) {
            that.data.tables.splice(i, 1);
            break;
          }
        }
        wx.showToast({
          title: "订单完成",
          icon: "success"
        })
      }
    })
  }
})