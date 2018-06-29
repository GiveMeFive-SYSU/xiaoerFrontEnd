var app = getApp();
Page({
  data: {
    Username: null
  },
  onLoad: function() {
    console.log(app.getOpenid());


  },
  toBusi: function() {
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + "/users/Checkexist?username=" + app.getOpenid(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        console.log(res);
        if (res.data.err == 0) {
          that.setData({
            Username: app.getOpenid()
          });
          wx.navigateTo({
            url: '../businessLogin/businessLogin?username=' + that.data.Username + "&key=" + res.data.accessKey,
          })
        } else {
          wx.navigateTo({
            url: '../businessRegister/businessRegister'
          })
        }
      }
    })

  },
  toCust: function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        var url = res.result;
        var username = url.substring(url.indexOf('=') + 1, url.indexOf('&'));
        var tablenum = url.substring(url.lastIndexOf('=') + 1);
        that.setData({
          username: username,
          tablenum: tablenum
        });
        wx.navigateTo({
          url: '../customerMainPage/customerMainPage?username=' + that.data.username + '&tablenum=' + that.data.tablenum
        })
      }
    })
  }
})