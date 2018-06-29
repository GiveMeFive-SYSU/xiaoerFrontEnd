// updateShopname.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pressed: "",
    shopname: '123',
    username: null,
    toastHidden: true,
    message: null
  },
  tempcardnumber: '',
  tempcardholder: '',
  inputNewShopname: function(e) {
    this.setData({
      shopname: e.detail.value
    })
  },
  updateShopname: function() {
    var newShopname = this.data.shopname;
    console.log('newShopname=' + newShopname);
    wx.request({
      url: app.globalData.prefixUrl + "/users/updateName?username=" + app.getOpenid() + "&newshopname=" + newShopname,
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
        // 根据openId查询店铺名
        if (res.data.err == 0) {
          console.log('更新店铺名成功');
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          console.log('更新店铺名错误');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + "/users/queryshopname?username=" + app.getOpenid(),
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
        // 根据openId查询店铺名
        if (res.data.err == 0) {
          console.log('查询店铺名成功');
          that.setData({
            shopname: res.data.shopname
          });
        } else {
          console.log('查询店铺名错误');
        }
      }
    })

    this.setData({
      username: options.username,
      pressed: false
    });
    var that = this;
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