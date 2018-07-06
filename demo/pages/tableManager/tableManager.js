// tableManager.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Goods: [],
    username: null,
    toastHidden: true,
    message: ''
  },
  addtablelist: [],
  addtable: null,
  tempGoods: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchTable?username=" + options.username,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          that.setData({
            toastHidden: !that.data.toastHidden,
            message: "网络请求失败"
          })
          return;
        }
        console.log(res);
        that.setData({
          username: options.username,
          Goods: res.data
        });
      }
    })
  },
  nameinput: function(e) {
    this.addtable = e.detail.value;
  },
  addfunction: function(e) {
    var Goodslen = this.data.Goods.length;
    var canadd = true;
    for (var i = 0; i < Goodslen; ++i) {
      if (this.data.Goods[i].Tablenumber == this.addtable) {
        canadd = false;
        break;
      }
    }
    if (canadd) {
      var len = this.addtablelist.length;
      this.addtablelist[len] = this.addtable;
      this.tempGoods = this.data.Goods;
      this.tempGoods[Goodslen] = new Object();
      this.tempGoods[Goodslen].Tablenumber = this.addtable;
      this.setData({
        Goods: this.tempGoods
      });
    } else {
      this.setData({
        toastHidden: !this.data.toastHidden,
        message: "桌子名字不能重复"
      })
    }
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
  toastBindChange: function() {
    this.setData({
      toastHidden: !this.data.toastHidden
    })
  },
  submit: function() {
    if (this.addtablelist.length == 0) {
      this.setData({
        toastHidden: !this.data.toastHidden,
        message: "请先添加桌子",
      })
    } else {
      var that = this;
      wx.request({
        url: app.globalData.prefixUrl + "/api/v1/searchTable/addtable",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: this.data.username,
          addtablelist: this.addtablelist
        },
        complete: function(res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            that.setData({
              toastHidden: !that.data.toastHidden,
              message: "网络请求失败"
            })
            return;
          }
          console.log(res);
          that.setData({
            toastHidden: !that.data.toastHidden,
            message: "提交成功",
          })
          that.addtablelist = [];
        }
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})