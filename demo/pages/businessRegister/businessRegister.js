var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    wrongMessage: '',
    userInputCardNo: '',
    cardlen: 0
  },
  createSpace: function(e) {
    var card = e.detail.value;
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
  onLoad: function(options) {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit: function(e) {
    var temp = false;
    if (e.detail.value.restaurantName == '') {
      this.setData({
        wrongMessage: "店铺名不能为空"
      })
      temp = true;
    } else if (e.detail.value.phone == '') {
      this.setData({
        wrongMessage: "手机号不能为空"
      })
      temp = true;
    } else if (e.detail.value.password.length < 6) {
      this.setData({
        wrongMessage: "密码位数不得少于6"
      })
      temp = true;
    } else if (e.detail.value.creditNo == '') {
      this.setData({
        wrongMessage: "银行卡卡号不能为空"
      })
      temp = true;
    } else if (e.detail.value.managerName == '') {
      this.setData({
        wrongMessage: "银行卡持卡人不能为空"
      })
      temp = true;
    }
    if (temp == true) {
      this.setData({
        showTopTips: true
      })
    } else {
      var creditNo = e.detail.value.creditNo;
      var creditCardNo = "";
      for (var i = 0; i < creditNo.length; i++) {
        if (creditNo[i] != ' ') creditCardNo += creditNo[i];
      }
      console.log(creditCardNo);
      //32位小写加密，取5-17位传给后端保存
      var utilMd5 = require('../../utils/md5.js');
      var password32 = utilMd5.hexMD5(e.detail.value.password);
      var password13 = password32.substr(5, 13);
      console.log(password32);
      console.log(password13);
      var openid = app.getOpenid();
      console.log(openid);
      wx.request({
        url: app.globalData.prefixUrl + "/users/addUser",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        data: {
          username: openid,
          password: password13,
          shopname: e.detail.value.restaurantName,
          phonenum: e.detail.value.phone,
          creditcard: creditCardNo
        },
        complete: function(res) {
          if (res == null || res.data == null) {
            wx.showModal({
              title: '注册失败',
              content: '',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            return;
          } else {
            wx.request({
              url: app.globalData.prefixUrl + "/bankcard/addCard",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                username: openid,
                account: creditCardNo,
                accountname: e.detail.value.managerName
              },

              complete: function(res) {
                if (res == null || res.data == null) {
                  console.error('网络请求失败');
                  return;
                }
                console.log(res);
              }
            })
          }
          wx.navigateTo({
            url: '../start/start',
          })
        }
      })

    }
  },
  tipsOut: function(e) {
    this.setData({
      showTopTips: false
    })
  }
})