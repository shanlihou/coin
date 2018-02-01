// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 非显示数据
    serviceChargeLock: true,

    serviceCharge: 0.0005,

    dealAction:"买入",

    coinArray:['btc', 'eth', 'bnb'],
    coinIndex:0,
    buyerArray:['usdt', 'rmb'],
    buyerIndex:0,
    amount:0,
    rate:0,
    cost:"",
    buyOrSale:false,
    business:'买卖',
    overview:'概览',
    tabColor: ['skyblue', ''],
    tabIndex:0,


    tabViewChosen:'skyblue',
    indicatorDots:false,
    autoplay:false,
    interval:5000,
    duration:500,
    types:['success', 'info', 'warn'],
    viewBlock:[{
      "top":"持有数量",
      "bottom":0,
      "units": "块"
    },{
      "top": "平均买入价格",
      "bottom": 0,
      "units":"btc/usdt"
    },{
        "top": "收益",
        "bottom": 0,
        "units":"usdt"
    },
    {
      "top": "成本",
      "bottom": 0,
      "units":"usdt"
    }
    ],

    legend:[{
      "inputTitle":"汇率",
      "padTop":5,
      "id":"rate"
    },
    {
      "inputTitle": "数量",
      "padTop": 15,
      "id":"amount"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  calcCost:function(){
    var cost = this.data.rate * this.data.amount;
    if (cost != 0) {
      cost += this.data.buyOrSale ? this.data.serviceCharge : -this.data.serviceCharge;
    }
    else {
      cost = "";
    }
    this.setData({
      cost:cost
    })
  },
  onInputBusiness:function(e){
    var id = e.target.id;
    var value = parseFloat(e.detail.value);
    var rate = this.data.rate;
    var amount = this.data.amount;
    if (id == 'rate'){
      rate = value;
    }else if (id == 'amount'){
      amount = value;
    }
    this.setData({
      rate: rate,
      amount: amount
    })
    this.calcCost();
  },
  onTapOverview:function(e){
    this.setTab(0);
    this.setData({
      tabIndex:0
    })
  },
  onTapBusiness: function (e) {
    this.setTab(1);
    this.setData({
      tabIndex: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  setTab:function(index){
    var tabColor = new Array();
    for (var i = 0; i < this.data.tabColor.length; i++)
    {
      if(i == index){
        tabColor.push('skyblue')
      }
      else{
        tabColor.push('')
      }
    }
    this.setData({
      tabColor:tabColor
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onChangeTab:function(e){
    console.log(e.detail.current)
    this.setTab(e.detail.current);
  },
  coinChange:function(e){
    this.setData({
      coinIndex:e.detail.value
    })
  },
  buyerChange:function(e){
    this.setData({
      buyerIndex:e.detail.value
    })
  },
  ioChange:function(e){
    console.log(e.detail.value)
    this.setData({
      ioSwitch: e.detail.value ? 0 : 1
    })
  },
  calc:function(e){
    
  },
  // 买卖行为切换
  dealActionChange:function(e) {
    console.log(e.detail.value)
    this.setData({
      dealAction: e.detail.value ? "卖出": "买入",
      buyOrSale: e.detail.value
    });
    this.calcCost();
  },

  changeServiceCharge:function(e) {
    this.setData({
      serviceChargeLock: e.detail.value
    })
  },
})