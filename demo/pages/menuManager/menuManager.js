// menuManager.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断是否是点击了置顶或删除
    isPressed: false,
    Goods: [],
    toastHidden: true,
    message: '',
    username: '',
  },
  strlist: [],
  Typelist: [],
  dellist: [],
  addlist: [],
  addinput: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.Goods.length == 0) {
      var that = this;
      wx.request({
        url: app.globalData.prefixUrl + "/api/v1/searchFood/searchType?username=" + options.username,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        complete: function(res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            that.setData({
              toastHidden: !that.data.toastHidden,
              message: '网络请求失败'
            })
            return;
          }
          that.setData({
            Goods: res.data,
            username: options.username,
            FirstGoods: res.data
          });

        }
      })

    }
  },
  removeFunction: function(e) {
    this.data.isPressed = true;
    var removestr = 'D' + e.currentTarget.dataset.itemIndex;
    this.strlist.push(removestr);
    for (var i = this.data.Goods.length - 1; i >= 0; --i) {
      if (i == e.currentTarget.dataset.itemIndex) {
        for (var j = this.addlist.length - 1; j >= 0; --j) {
          if (this.addlist[j] == this.data.Goods[i].name) {
            this.addlist.splice(j, 1);
          }
        }
        this.dellist.push(this.data.Goods[i]);
        this.data.Goods.splice(i, 1);
        break;
      }
    }
    this.setData({
      Goods: this.data.Goods
    });
  },
  toTopFunction: function(e) {
    this.data.isPressed = true;
    if (e.currentTarget.dataset.itemIndex != 0) {
      var Topstr = 'C' + e.currentTarget.dataset.itemIndex;
      this.strlist.push(Topstr);
      var TotopArray = this.data.Goods[e.currentTarget.dataset.itemIndex];
      for (var i = e.currentTarget.dataset.itemIndex; i > 0; --i) {
        this.data.Goods[i] = this.data.Goods[i - 1];
      }
      this.data.Goods[0] = TotopArray;
      this.setData({
        Goods: this.data.Goods
      });
    }
  },
  Undo: function(e) {
    if (this.strlist.length != 0) {
      if (this.strlist[this.strlist.length - 1][0] == 'C') {
        var changenum = parseInt(this.strlist[this.strlist.length - 1][1]);
        var changegood = this.data.Goods[0];
        for (var i = 0; i < changenum; ++i) {
          this.data.Goods[i] = this.data.Goods[i + 1];
        }
        this.data.Goods[changenum] = changegood;
      } else if (this.strlist[this.strlist.length - 1][0] == 'D') {
        var changenum = parseInt(this.strlist[this.strlist.length - 1][1]);
        this.data.Goods.splice(changenum, 0, this.dellist[this.dellist.length - 1]);
        this.dellist.length -= 1;
      } else {
        var changenum = parseInt(this.strlist[this.strlist.length - 1][1]);
        var delstr = null;
        for (var i = this.data.Goods.length - 1; i >= 0; --i) {
          if (i == changenum) {
            delstr = this.data.Goods[i].name;
            this.data.Goods.splice(i, 1);
          }
        }
        for (var j = this.addlist.length - 1; j >= 0; --j) {
          if (this.addlist[j] == delstr) {
            this.addlist.splice(j, 1);
          }
        }
      }
      this.setData({
        Goods: this.data.Goods
      });
      this.strlist.length -= 1;
    }

  },
  Submit: function(e) {
    if (this.strlist.length != 0) {

      for (var i = 0; i < this.data.Goods.length; ++i) {
        this.Typelist[i] = this.data.Goods[i].name;
        this.data.Goods[i].no = i;
      }
      for (var i = 0; i < this.dellist.length; ++i) {
        if (this.dellist[i] != null && this.dellist[i].name != null) {
          this.dellist[i] = this.dellist[i].name;
        }

      }
      console.log("this is testing typelist!pay attention!");
      console.log(this.Typelist);
      console.log("this is testing dellist!pay attention!");
      console.log(this.dellist);
      console.log("this is testing addlist!pay attention!");
      console.log(this.addlist);
      var that = this;
      wx.request({
        url: app.globalData.prefixUrl + "/api/v1/searchFood/changeType",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: that.data.username,
          currentlist: that.Typelist,
          deletelist: that.dellist,
          addlist: that.addlist
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
          that.strlist = [];
          that.dellist = [];
          that.Typelist = [];
          that.addlist = [];
          that.setData({
            Goods: that.data.Goods,
            toastHidden: !that.data.toastHidden,
            message: '更改成功'
          })
        }
      })
    }
  },
  dishtypeInput: function(e) {
    this.addinput = e.detail.value;
  },
  addFunction: function(e) {
    console.log(this.addinput);
    if (this.addinput == null) {
      wx.showToast({
        title: '请输入菜系名字',
        icon: 'none'
      })
      return;
    }
    var len = this.data.Goods.length;
    var foodobj = new Object();
    foodobj['name'] = this.addinput;
    foodobj['no'] = len;
    this.addlist.push(this.addinput);
    this.data.Goods.splice(this.data.Goods.length, 0, foodobj);
    this.setData({
      Goods: this.data.Goods
    });
    var addstr = 'A' + len;
    this.strlist.push(addstr);
  },
  selectMenu: function(e) {
    if (this.data.isPressed == false) console.log(e.currentTarget.dataset.itemIndex);
    this.data.isPressed = false;
    console.log("sdjhasdhajsdasjdasjdasdasdasd");
    console.log(this.data.Goods[e.currentTarget.dataset.itemIndex]);
    wx.navigateTo({
      url: '../menuDetail/menuDetail?no=' + this.data.Goods[e.currentTarget.dataset.itemIndex].no + '&typename=' + this.data.Goods[e.currentTarget.dataset.itemIndex].name + '&username=' + this.data.username
    })
  },
  toastBindChange: function() {
    this.setData({
      toastHidden: !this.data.toastHidden
    })
  }
})