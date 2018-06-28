var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:null,
    tablenumber:null,
    username:null,
    deltablelist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var url = app.globalData.prefixUrl + "/api/v1/searchQRcode/generateQR?username=" + options.username + "&tablenum=" + options.tablenumber;
    console.log(url+"url");
    this.setData({ username:options.username,imageUrl: url, tablenumber:options.tablenumber});
    wx.setNavigationBarTitle({
      title: options.tablenumber,
    })
  },
  download:function() {
    console.log("Test");
    wx.downloadFile({
      url: this.data.imageUrl,
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePath;
        console.log(tempFilePaths);
        wx.saveFile({
          tempFilePath: tempFilePaths,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            console.log(res.savedFilePath);
            wx.showToast({
              title: '下载成功',
              icon: 'success',
              duration: 2000,
              mask: true
            })
            wx.saveImageToPhotosAlbum({
              filePath: savedFilePath,
              success: function (res) {
                console.log(res)
              },
              fail: function (res) {
                console.log(res)
                console.log('fail')
              }
            })
          },
          fail: function (res) {
            console.log(res);
            console.log('fail');
            wx.showToast({
              title: '下载失败',
              duration: 2000,
              mask: true
            })
          }
        })
      }
    })
  },
  remove:function() {
    var that = this;
    var mydeltablelist = "";
    mydeltablelist = this.data.tablenumber;
    console.log(mydeltablelist)
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchTable/deltable",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        username: this.data.username,
        deltablelist: mydeltablelist,
      },
      complete: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        console.log(res);
        that.data.deltablelist = [];
        wx.redirectTo({
          url: '../tableManager/tableManager?username=' + that.data.username
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})