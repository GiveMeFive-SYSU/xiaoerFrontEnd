// addDish.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    wrongMessage: '',
    dishname:null,
    typename: null,
    typenum: null,
    dishprice:null,
    disholdprice:null,
    dishicon:null,
    disholdicon:null,
    description:null,
    username:'',
  },

  formSubmit: function (e) {
    console.log(e);
    var temp = false;
    var that = this;
    if (e.detail.value.name == '') {
      this.setData({
        wrongMessage: "菜名不能为空\n"
      })
      temp = true;
    }
    if (e.detail.value.price == '') {
      this.setData({
        wrongMessage: this.data.wrongMessage + "现价不能为空"
      })
      temp = true;
    }
    if (temp == true) {
      this.setData({
        showTopTips: true
      })
    } else {
      console.log(e);
      var that = this;
      if (this.data.dishicon != this.data.disholdicon) {
        console.log("Upload File");
        console.log(this.data.dishicon);
        wx.uploadFile({
          url: app.globalData.prefixUrl + '/api/v1/searchFood/updatefood',
          filePath: that.data.dishicon,
          name: that.data.username + e.detail.value.name,
          formData: {
            username: that.data.username,
            dishname: e.detail.value.name,
            dishicon: that.data.disholdicon,
            disholdprice: e.detail.value.oldprice,
            dishprice: e.detail.value.price,
            dishtypename: that.data.typename,
            dishtype: that.data.typenum,
            dishdescription: e.detail.value.description,
            key: "1430ec127e097e1113259c5e1be1ba70"
          },
          success: function (res) {
            console.log("Success");
            var data = res.data;
            console.log(res.data);
            //do something
            wx.navigateTo({
              url: '../menuDetail/menuDetail?no=' + that.data.typenum + '&typename=' + that.data.typename + '&username=' + that.data.username
            })
          },
          fail: function(res) {
            console.log(res)
          }
        })
      } else {
        console.log("No picture");
        wx.request({
          url: app.globalData.prefixUrl + '/api/v1/searchFood/updatefood',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            username: that.data.username,
            dishname: e.detail.value.name,
            dishicon: that.data.disholdicon,
            disholdprice: e.detail.value.oldprice,
            dishprice: e.detail.value.price,
            dishtypename: that.data.typename,
            dishtype: that.data.typenum,
            dishdescription: e.detail.value.description,
            key: "1430ec127e097e1113259c5e1be1ba70"
          },
          complete: function (res) {
            if (res == null || res.data == null) {
              console.error('网络请求失败');
              return;
            }
            wx.navigateTo({
              url: '../menuDetail/menuDetail?no=' + that.data.typenum + '&typename=' + that.data.typename + '&username=' + that.data.username
            })
          }
        })
      }
    }

  },
  //点击上传图片的图标
  clickToChoose: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({ dishicon: tempFilePaths });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      username: options.username,
      typename: options.typename,
      typenum: options.no,
      dishname: options.dishname,
      dishprice: options.dishprice,
      disholdprice: options.disholdprice,
      dishicon: app.globalData.prefixUrl + '/images/' + options.dishimage,
      disholdicon: app.globalData.prefixUrl + '/images/' + options.dishimage,
      description: options.dishdescription
    });
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

  },
  tipsOut: function (e) {
    this.setData({
      showTopTips: false
    })
  }
})