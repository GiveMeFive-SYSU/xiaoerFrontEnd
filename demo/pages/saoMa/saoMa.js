Page({

  data: {
    username : '',
    tablenum : ''
  },

  onLoad: function (options) {
    var that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        var url = res.result;
        var usename = url.substring(url.indexOf('=') + 1, url.indexOf('&'));
        var tablenum = url.substring(url.lastIndexOf('=')+1);
        that.setData({
          usename: usename,
          tablenum: tablenum
        });
        wx.navigateTo({
          url: '../customerMainPage/customerMainPage?username=' + that.data.username + '&tablenum=' + that.data.tablenum
        })
      }
    })
  },

})