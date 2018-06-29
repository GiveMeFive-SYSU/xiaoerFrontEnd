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
          ordernum: 1,
          dishes: [
            {
              dishname: "菜品1",
              num: 5,
              price: 19
            }
          ],
          note: "不要辣的"
        }
      }
    ]
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
        console.log(res.data.data);
        that.setData({
          tables: res.data.data
        })
      }
    });
  },
  finishOrder: function(e) {
    let orderid = e.currentTarget.dataset.ordernum;
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + '/api/v1/searchOrder/setFinished?username=' + app.getOpenid() + '&ordernum=' + orderid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
      complete: function (res) {
        console.log(res);
        if (res == null || res.data == null) {
          console.log("网络连接失败");
          wx.showToast({
            title: "网络连接失败",
            icon: "none"
          })
          return;
        }
        let len = that.data.tables.length;
        for (let i = 0; i < len; i++) {
          if (that.data.tables[i].ordernum == orderid) {
            let newTable = that.data.tables;
            newTable.splice(i, 1);
            console.log(newTable);
            that.setData({
              tables: newTable
            })
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