var app = getApp();
Page({
  data: {
    goods: [],
    toView: '0',
    scrollTop: 100,
    foodCounts: 0,
    totalPrice: 0,// 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    fold: true,
    selectFoods: [{ price: 20, count: 2 }],
    cartShow: 'none',
    businessId:0
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString()
    })
    console.log(this.data.toView);
  },
  //移除商品
  decreaseCart: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].num--;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var num = this.data.goods[parentIndex].foods[index].num;
    var name = this.data.goods[parentIndex].foods[index].name;
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    if (this.data.goods[parentIndex].foods[index].num == 0)
      this.setData({
        carArray: carArray1,
        goods: this.data.goods
      })
      else {
      var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
      carArray1.push(obj);
      this.setData({
        carArray: carArray1,
        goods: this.data.goods})
      }
    this.calTotalPrice()
  },
  decreaseShopCart: function (e) {
    this.decreaseCart(e);
  },
  //添加到购物车
  addCart(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    console.log(index);
    console.log(parentIndex);
    this.data.goods[parentIndex].foods[index].num++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var num = this.data.goods[parentIndex].foods[index].num;
    var name = this.data.goods[parentIndex].foods[index].name;
    var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
    this.calTotalPrice();
  },
  addShopCart: function (e) {
    this.addCart(e);
  },
  empty:function() {
    this.setData({
      carArray:[],
      fold: !this.data.fold
    })
    
    this.calTotalPrice();
    var goodslen = this.data.goods.length;
    for (var i = 0;i < goodslen; i++) {
      var foodslen = this.data.goods[i].foods.length;
      for (var j = 0; j < foodslen; j++) {
          if (this.data.goods[i].foods[j].Count > 0) {
            this.data.goods[i].foods[j].Count =0
            this.setData({
              goods:this.data.goods
            })
          }
        }
    }
    var fold = this.data.fold
    this.cartShow(fold)
  },
  //计算总价
  calTotalPrice: function () {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].num;
      totalCount += carArray[i].num
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount
    });
  },
  //結算
  pay() {
    if (this.data.totalPrice < 1) {
      return;
    }
    console.log(this.data.carArray)
    console.log(JSON.stringify(this.data.carArray))
    wx.navigateTo({
      url: '../pay/pay?bill=' + JSON.stringify(this.data.carArray)
    })
  },
  //彈起購物車
  toggleList: function () {
    if (!this.data.totalCount) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    this.cartShow(fold)
  },
  cartShow: function (fold) {
    console.log(fold);
    if (fold == false) {
      this.setData({
        cartShow: 'block',
      })
    } else {
      this.setData({
        cartShow: 'none',
      })
    }
    console.log(this.data.cartShow);
  },
  listShow() {
    if (!this.data.totalCount) {
      this.data.fold = true;
      return false;
    }
    let show = !this.fold;
    // if (show) {
    //     this.$nextTick(() => {
    //         if (!this.scroll) {
    //             this.scroll = new BScroll(this.$refs.listContent, {
    //                 click: true
    //             });
    //         } else {
    //             this.scroll.refresh();
    //         }
    //     });
    // }
    return show;
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      businessId:options.username,
      tablenum: options.tablenum
    })
    console.log(options);
    if (this.data.goods.length == 0) {
      var that = this;
      wx.request({
        url: app.globalData.prefixUrl + "/api/v1/searchFood?username=" + that.data.businessId,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        complete: function (res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }
          console.log(res.data);
          that.setData({ goods: res.data });
        }
      })
    }
  },
  toBusi:function() {
    wx.navigateTo({
      url: '../businessRegister/businessRegister',
    })
  }
  ,
  onReady: function () {
    // 页面渲染完成
    console.log(this.data.businessId);

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
    console.log(this.data.carArray[0]);
  },
  onUnload: function () {
    // 页面关闭
  }
}
)
