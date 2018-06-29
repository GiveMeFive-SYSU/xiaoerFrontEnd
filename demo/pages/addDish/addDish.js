// addDish.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    wrongMessage: '',
    typename: null,
    typenum: null,
    username: null,
    image: null,
    dishname: null,
    disholdprice: null,
    dishprice: null,
    dishdescription: null
  },
  tempdishname: null,
  tempdisholdprice: null,
  tempdishprice: null,
  tempdishdescription: null,
  formSubmit: function(e) {
    console.log(e);
    var temp = false;
    if (e.detail.value.name == '') {
      this.setData({
        wrongMessage: "菜名不能为空\n"
      })
      temp = true;
    }
    if (e.detail.value.price == '') {
      this.setData({
        wrongMessage: this.data.wrongMessage + "现价不能为空\n"
      })
      temp = true;
    }
    if (e.detail.value.description == '') {
      this.setData({
        wrongMessage: this.data.wrongMessage + "菜品介绍不能为空\n"
      })
      temp = true;
    }
    if (this.data.image == null) {
      this.setData({
        wrongMessage: this.data.wrongMessage + "图片不能为空\n"
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
      if (e.detail.value.oldprice == '') {
        e.detail.value.oldprice = e.detail.value.price;
      }
      wx.uploadFile({
        url: app.globalData.prefixUrl + '/api/v1/searchFood/addfood',
        filePath: that.data.image,
        name: that.data.username + e.detail.value.name,
        formData: {
          username: that.data.username,
          dishname: e.detail.value.name,
          disholdprice: e.detail.value.oldprice,
          dishprice: e.detail.value.price,
          dishtypename: this.data.typename,
          dishtype: this.data.typenum,
          dishdescription: e.detail.value.description,
          key: "1430ec127e097e1113259c5e1be1ba70"
        },
        success: function(res) {
          var data = res.data
          //do something
          wx.navigateTo({
            url: '../menuDetail/menuDetail?no=' + that.data.typenum + '&typename=' + that.data.typename + '&username=' + that.data.username
          })
        }
      })
    }

  },
  //点击上传图片的图标
  clickToChoose: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          image: tempFilePaths
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      typename: options.typename
    });
    this.setData({
      typenum: options.no
    });
    this.setData({
      username: options.username
    });
  },
  nameinput: function(e) {
    this.tempdishname = e.detail.value;
  },
  oldpriceinput: function(e) {
    this.tempdisholdprice = e.detail.value;
  },
  nameinput: function(e) {
    this.tempdishprice = e.detail.value;
  },
  descriptioninput: function(e) {
    this.tempdishdescription = e.detail.value;
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
  tipsOut: function(e) {
    this.setData({
      showTopTips: false,
      wrongMessage: ''
    })
  }
})