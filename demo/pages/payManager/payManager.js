// pages/payManager/payManager.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startdate: null,
    startdateValue: '1970-01-01',
    startdate: '1970-01-01',
    enddateValue: null,
    month: null,
    monthmoney: 0,
    monthnumber: 0,
    year: null,
    yearmoney: 0,
    yearnumber: 0,
    allmoney: 0,
    allnumber: 0,
    username: null,
    toastHidden: true,
    message: ''
  },
  querylist: [],
  dataArr: [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  ],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var util = require('../../utils/util.js');
    var datetime = util.formatTime(new Date);
    var date = datetime.split(' ');
    date[0] = date[0].replace(/\//g, "-");
    var timefactor = date[0].split('-');
    this.setData({
      username: options.username,
      month: timefactor[1],
      year: timefactor[0],
      enddateValue: date[0],
      enddate: date[0]
    });
    var curmonthprev = timefactor[0] + '-' + timefactor[1] + '-' + timefactor[2];
    var yearnum = parseInt(timefactor[0]);
    var curmonthnext = timefactor[0] + '-' + timefactor[1] + '-';
    if ((yearnum % 4 == 0) && (yearnum % 100 != 0 || yearnum % 400 == 0)) {
      curmonthnext = curmonthnext + this.dataArr[1][parseInt(timefactor[1]) - 1];
    } else {
      curmonthnext = curmonthnext + this.dataArr[0][parseInt(timefactor[1]) - 1];
    }
    var curmonth = curmonthprev + '$' + curmonthnext;
    var curyear = timefactor[0] + '-' + '01-01' + '$' + timefactor[0] + '-12-31';
    this.querylist = [];
    this.querylist.push(curmonth);
    this.querylist.push(curyear);
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchOrder",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        username: options.username,
        currentlist: that.querylist
      },
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          that.setData({
            toastHidden: !that.data.toastHidden,
            message: '网络请求失败'
          })
          return;
        }
        console.log(res);
        for (var i in res.data) {
          if (res.data[i].flag == 'm') {
            var tempmonthmoney = 0;
            for (var j in res.data[i].data) {
              tempmonthmoney += res.data[i].data[j].Price;
            }
            that.setData({
              monthmoney: tempmonthmoney,
              monthnumber: res.data[i].data.length
            });
          } else {
            var tempmyearmoney = 0;
            for (var j in res.data[i].data) {
              tempmyearmoney += res.data[i].data[j].Price;
            }
            console.log('year number: ' + res.data);
            that.setData({
              yearmoney: tempmyearmoney,
              yearnumber: res.data[i].data.length
            });
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  toastBindChange: function() {
    this.setData({
      toastHidden: !this.data.toastHidden
    })
  },
  query: function(e) {
    this.querylist = [];
    var that = this;
    var querystr = this.data.startdate + '$' + this.data.enddate;
    console.log(querystr);
    this.querylist.push(querystr);
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchOrder",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        username: this.data.username,
        currentlist: this.querylist
      },
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          that.setData({
            toastHidden: !that.data.toastHidden,
            message: '网络请求失败'
          })
          return;
        }
        console.log(res);
        that.setData({
          toastHidden: !that.data.toastHidden,
          message: '查询成功'
        })
        var tempmoney = 0;
        for (var j in res.data[0].data) {
          tempmoney += res.data[0].data[j].Price;
        }
        that.setData({
          allmoney: tempmoney,
          allnumber: res.data[0].data.length
        });
      }
    })
  },
  startdatePickerBindchange: function(e) {
    this.setData({
      startdate: e.detail.value
    })
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

  }
})