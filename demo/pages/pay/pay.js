// pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  // param.username, param.Ordernumber, param.Ordertime, param.Tablenumber, param.Tastenote || "null", param.Price
  //param.username, param.ordernumber,param.ordertail[i].dishname, param.ordertail[i].dishcount
  data: {
    bill: [],
    total: 0,
    businessId: "",
    Ordernumber: "",
    Ordertime:"",
    Tablenumber:"",
    Tastenote:"",
    Orderdetail:{}
  },

  bindTextAreaBlur: function (e) {
    this.setData({
      Tastenote: e.detail.value
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将字符串转换成对象
    console.log("PAY test")
    console.log(options);
    this.data.businessId = options.businessId;
    this.data.Ordernumber = options.ordernum;
    this.data.Tablenumber = options.tablenum;
    this.data.Ordertime = options.paytime;

//this.data.bill = options.bill;
//console.log(this.data.bill);
    
    this.setData({
      bill: JSON.parse(options.bill)
    });

    console.log("lala");
    console.log(this.data);
    
    var j = 0;
    var temp_order = [];
    for (var i = 0; i < this.data.bill.length; i++) {
      var perorderdetail =[]
      var t = this.data.bill[i].price*this.data.bill[i].num;
      j += t;
      perorderdetail['dishname'] = this.data.bill[i].name;
      perorderdetail['dishcount'] = this.data.bill[i].num;
      perorderdetail['dishprice'] = this.data.bill[i].price;
      temp_order.push(perorderdetail);
    }
    this.setData({
      total:j,
      Orderdetail: temp_order
    })
   // for (var i = 0; i < this.data.bill.length; i++) this.data.text += this.data.bill[i].name + '\n';
  },
  submitOrder: function() {
    console.log("提交订单");
    var that = this;
    var temp_order = {};
    for (var i = 0; i < this.data.bill.length; i++) {
      var perorderdetail = {}
      perorderdetail['dishname'] = this.data.bill[i].name;
      perorderdetail['dishcount'] = this.data.bill[i].num;
      perorderdetail['dishprice'] = this.data.bill[i].price;
      temp_order[i] = perorderdetail;
    }
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchOrder/addorder",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: {
        ordertail: JSON.stringify(temp_order),
        username: that.data.businessId,
        Ordernumber: that.data.Ordernumber,
        Ordertime: that.data.Ordertime,
        Tablenumber: that.data.Tablenumber,
        Tastenote: that.data.Tastenote,
        Price: that.data.total,
      },
      complete: function (res) {
        console.log("增加订单成功");
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    wx.request({
      url: app.globalData.prefixUrl + "/api/v1/searchOrder/addorderDetail",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: {
        ordertail: JSON.stringify(temp_order),
        username: that.data.businessId,
        Ordernumber: that.data.Ordernumber,
        Orderlen: that.data.bill.length
      },
      complete: function (res) {
        console.log("增加订单详情成功");
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
/*wx.request({
	url:,//后台php地址
	data:{
		"type":"join_free",
		access_token:that.data.access_token,
		touser:openid,
		template_id:'B0X3AJc7od4P3BRTLsuNubSHr9mm_RzM9-Z287V4HRQ',
		page:,//进入小程序的页面
		form_id:,//wxml表单的form的id
		keyword1,
		keyword2,
		keyword3,
		color:'',
		emphasis_keyword:'keyword1.DATA'
	},
	header:{
		"Content-Type":"application/x-www-form-urlencoded"
	},
	method:'POST',
	success:function(res) {
		console.log(res.data);
	},
	fail:function(err) {
		console.log(err);
	}
});
<form bindsubmit="submitForm" report-submit >
    <view class="form_group">
        <text>姓  名：text>
        <input type="text" placeholder="请输入姓名" name="data_name" maxlength="20" value="" auto-focus/>
    view>
    <button class="save_btn" form-type="submit">确认参加button>
form>
 */