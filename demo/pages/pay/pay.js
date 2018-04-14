// pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将字符串转换成对象
//console.log(options.bill);
//this.data.bill = options.bill;
//console.log(this.data.bill);
    
    this.setData({
      bill: JSON.parse(options.bill)
    });
    console.log("lala");
    console.log(this.data.bill);
    var j = 0;
    for (var i = 0; i < this.data.bill.length; i++) {
      
      var t = this.data.bill[i].price*this.data.bill[i].num;
      j += t;
    }
    this.setData({
      total:j
    })
   // for (var i = 0; i < this.data.bill.length; i++) this.data.text += this.data.bill[i].name + '\n';
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