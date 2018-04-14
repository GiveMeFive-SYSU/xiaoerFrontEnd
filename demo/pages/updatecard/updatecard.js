// changeCreditCard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pressed: "",
    bankcard:null,
    username:null,
    toastHidden:true,
    message:null
  },
  tempcardnumber:'',
  tempcardholder:'',
  changeCard: function () {
    this.setData({
      pressed: !this.data.pressed
    })
  },
  inputname:function(e) {
    this.tempcardholder = e.detail.value;
  },
  submit:function() {
    if (this.tempcardnumber.length == 0 && this.tempcardholder.length == 0) {
      this.setData({
        toastHidden: !this.data.toastHidden,
        message:"请输入卡号和持卡人"
      })
    } else if (this.tempcardnumber.length == 0 && this.tempcardholder.length != 0) {
      this.setData({
        toastHidden: !this.data.toastHidden,
        message: "请输入卡号"
      })
    } else if (this.tempcardnumber.length != 0 && this.tempcardholder.length == 0) {
      this.setData({
        toastHidden: !this.data.toastHidden,
        message: "请输入持卡人"
      })
    }
    else {
      var that = this;
      wx.request({
        url: app.globalData.prefixUrl + "/bankCard/updateCard",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: this.data.username,
          cardnumber: this.tempcardnumber,
          cardholder: this.tempcardholder
        },
        complete: function (res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
          console.log(res);
          that.setData({
            toastHidden: !that.data.toastHidden,
            message: "更改成功",
            bankcard: that.tempcardnumber,
            pressed: !that.data.pressed
          })
          that.tempcardnumber = ''
          that.tempcardholder = ''
        }
      })
    }
  },
  createSpace: function (e) {
    var card = e.detail.value;
    this.tempcardnumber = e.detail.value;
    //console.log(card);
    var len = card.length;
    //console.log(len);
    if (len > this.data.cardlen) {
      if ((len + 1) % 5 == 0) {
        card = card + ' '
      }
    } else {
      card = card.replace(/(^\s*)|(\s*$)/g, "");
    }
    this.setData({
      userInputCardNo: card
    })
    this.setData({
      cardlen: len
    })

    return this.data.userInputCardNo

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ username:options.username,pressed:false});
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + "/bankCard/queryCard",
        header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        username: options.username
      },
        complete: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        
        that.setData({ bankcard:res.data.data[0].Cardnumber});
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
  toastBindChange: function () {
    this.setData({
      toastHidden: !this.data.toastHidden
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})