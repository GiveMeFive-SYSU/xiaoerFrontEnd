// menuDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
      selectItem:[],
      typename:null,
      typenum:null,
      foods:[],
      foodslength:null,
      username:''
  },
  tempfoods:null,
  delfoods:[],
  strlist:[],
  delimage:[],
  selectDish:function(e) {
    console.log(e.currentTarget.dataset.itemIndex);
    console.log(this.data.selectItem);
  },
  correctFunction:function(e) {
    console.log(e);
    wx.redirectTo({
      url: '../updateDish/updateDish?typename=' + this.data.typename + "&username=" + this.data.username + '&no=' + this.data.typenum + "&dishname=" + this.data.foods[e.currentTarget.dataset.itemIndex].name + "&disholdprice=" + this.data.foods[e.currentTarget.dataset.itemIndex].oldprice + "&dishprice=" + this.data.foods[e.currentTarget.dataset.itemIndex].price + "&dishdescription=" + this.data.foods[e.currentTarget.dataset.itemIndex].description + "&dishimage=" + this.data.foods[e.currentTarget.dataset.itemIndex].icon ,
    })
  },
  addDish:function() {
    wx.redirectTo({
      url: '../addDish/addDish?typename=' + this.data.typename + '&no=' + this.data.typenum + '&username=' + this.data.username,
    })
  },
  countfoods:function() {
    var count = 0;
    for (var obj in this.data.foods) {
      count++;
    }
    this.setData({foodslength:count});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.typename,
    })
    console.log(options);
    this.tempfoods = new Object();
    this.setData({ typename: options.typename, typenum: options.no, username:options.username});
    for (var i = 0; i < 100; i++) this.data.selectItem[i] = false;
    if (this.data.foods.length == 0) {
      var that = this;
      wx.request({
        url: app.globalData.prefixUrl + "/api/v1/searchFood/queryType",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: that.data.username,
          dishtypename: options.typename
        },
        complete: function (res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
          console.log(res);
          that.setData({foods:res.data[0].foods});
          that.countfoods();
          console.log(that.data.foods);
          console.log("test");
        }
      })
    }
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
  removeFunction:function(e) {
    for (var i = 0; i < this.data.foodslength; ++i) {
      this.tempfoods[i] = new Object();
      for (var pro in this.data.foods[i]) {
        this.tempfoods[i][pro] = this.data.foods[i][pro];
      }
    }
    for (var i = this.data.foodslength - 1; i >= 0; --i) {
      if (i == e.currentTarget.dataset.itemIndex) {
        var removestr = 'D' + e.currentTarget.dataset.itemIndex;
        this.strlist.push(removestr);
        var len = this.delfoods.length;
        this.delfoods[len] = new Object();
        for (var pro in this.data.foods[i]) {
          this.delfoods[len][pro] = this.data.foods[i][pro];
        }
        delete this.tempfoods[i];
        break;
      }
    }
    this.setData({ foods: this.tempfoods });
    this.countfoods();
  },
  Undo:function() {
    if (this.strlist.length != 0) {
      var changenum = this.strlist[this.strlist.length - 1][1];
      for (var i = 0; i < this.data.foodslength; ++i) {
        this.tempfoods[i] = new Object();
        for (var pro in this.data.foods[i]) {
          this.tempfoods[i][pro] = this.data.foods[i][pro];
        }
      }
      this.tempfoods[this.data.foodslength] = new Object();
      for (var i = this.data.foodslength; i > changenum; --i) {
        for (var pro in this.tempfoods[i]) {
          this.tempfoods[i][pro] = this.tempfoods[i - 1][pro];
        }
      }
      for (var pro in this.delfoods[this.delfoods.length - 1]) {
        this.tempfoods[changenum][pro] = this.delfoods[this.delfoods.length - 1][pro];
      }
      this.delfoods.length -= 1;
      this.strlist.length -= 1;
      this.setData({ foods: this.tempfoods});
      this.countfoods();
    }
  },
  Submit:function() {
    console.log(this.delfoods);
    var that = this;
    if (this.strlist.length != 0) {
      for (var i = 0; i < this.delfoods.length; ++i) {
        this.delimage[i] = this.delfoods[i].icon;
        this.delfoods[i] = this.delfoods[i].name;
      }
      wx.request({
        url: app.globalData.prefixUrl + "/api/v1/searchFood/delfood",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: that.data.username,
          deletelist: that.delfoods,
          delimage:that.delimage,
          typenum: that.data.typenum
        },
      complete: function (res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
          console.log(res);
          that.delfoods = [];
          that.delimage = [];
        }
      })
    }
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