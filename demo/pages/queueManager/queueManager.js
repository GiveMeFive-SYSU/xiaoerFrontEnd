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
      url: app.globalData.prefixUrl + '/api/v1/sarchOrder?username=' + app.getOpenid(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        console.log(res);
      }
    });
  },
  finishOrder: function() {
    wx.request({
      url: app.globalData.prefixUrl + '/api/v1/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      complete: function (res) {

      }
    })
  }
})