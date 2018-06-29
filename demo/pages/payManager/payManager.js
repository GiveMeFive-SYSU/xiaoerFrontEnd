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
    var curmonthprev = timefactor[0] + '-' + timefactor[1] + '-' + '01';
    var yearnum = parseInt(timefactor[0]);
    var curmonthnext = timefactor[0] + '-' + timefactor[1] + '-';
    if ((yearnum % 4 == 0) && (yearnum % 100 != 0 || yearnum % 400 == 0)) {
      curmonthnext = curmonthnext + this.dataArr[1][parseInt(timefactor[1]) - 1];
    } else {
      curmonthnext = curmonthnext + this.dataArr[0][parseInt(timefactor[1]) - 1];
    }
    var curmonth = curmonthprev + '$' + curmonthnext;
    var yearstart = timefactor[0] + '-' + '01-01';
    var yearend = timefactor[0] + '-12-31';
    var curyear = timefactor[0] + '-' + '01-01' + '$' + timefactor[0] + '-12-31';
    this.querylist = [];
    this.querylist.push(curmonth);
    this.querylist.push(curyear);
    var that = this;
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchOrder/queryOrderByTime?username=" + options.username + "&timeStart=" + curmonthprev + " 00:00:00&timeEnd=" + curmonthnext + " 23:59:59",
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
        // 查询
        if (res.data) {
          console.log('查询成功');
          if (res.data.data[0].total == null) {
            res.data.data[0].total = 0;
          }
          that.setData({
            monthnumber: res.data.data[0].cases,
            monthmoney: res.data.data[0].total
          })

        } else {
          console.log('查询错误');
        }
      }
    });
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchOrder/queryOrderByTime?username=" + options.username + "&timeStart=" + yearstart + " 00:00:00&timeEnd=" + yearend + " 23:59:59",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        // 查询
        if (res.data) {
          console.log('查询成功');
          if (res.data.data[0].total == null) {
            res.data.data[0].total = 0;
          }
          that.setData({
            yearnumber: res.data.data[0].cases,
            yearmoney: res.data.data[0].total
          })

        } else {
          console.log('查询错误');
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
      url: app.globalData.prefixUrl + "/api/v1/searchOrder/queryOrderByTime?username=" + that.data.username + "&timeStart=" + that.data.startdate + " 00:00:00&timeEnd=" + that.data.enddate + " 23:59:59",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      complete: function(res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        // 查询
        if (res.data) {
          console.log('查询成功');
          if (res.data.data[0].total == null) {
            res.data.data[0].total = 0;
          }
          that.setData({
            allnumber: res.data.data[0].cases,
            allmoney: res.data.data[0].total
          })

        } else {
          console.log('查询错误');
        }
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