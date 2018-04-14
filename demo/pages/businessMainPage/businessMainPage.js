// page/component/new-pages/user/user.js
var app = getApp();
Page({
  data: {
    thumb: '',
    nickname: '',
    name:'杨小贤',
    cases:0,
    money:0,
    menusetting:null,
    tablesetting:null,
    paysetting:null,
    bankcardsetting:null,
    userInfo:[]
  },
  onLoad(options) {
    var self = this;
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    console.log(options);
    var menu = "../menuManager/menuManager?username=" + options.username;
    var table = "../tableManager/tableManager?username=" + options.username;
    var pay = "../payManager/payManager?username=" + options.username;
    var card = "../updatecard/updatecard?username=" + options.username;
    this.setData({ bankcardsetting:card,menusetting: menu, tablesetting: table, name: options.shopname, paysetting:pay});
  }
 
  
})