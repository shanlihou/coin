// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coinArray:['btc', 'eth', 'bnb'],
    coinIndex:0,
    buyerArray:['usdt', 'rmb'],
    buyerIndex:0,
    amount:0,
    profit:0,
    ioSwitch:0,
    ioRateStr:['买入汇率', '卖出汇率'],
    ioAmountStr:['买入数量', '卖出数量'],
    ioCostStr:['买入耗资(加上手续费)', '卖出收益(扣掉手续费)'],
    ioStr:['买卖', '卖'],
    ioCost:0,
    overview:'概览',

    tabViewChosen:'skyblue',
    indicatorDots:false,
    autoplay:false,
    interval:5000,
    duration:500,
    types:['success', 'info', 'warn'],
    test:[{
      "top":"持有数量",
      "bottom":"100",
      "units": "块"
    },{
      "top": "平均买入价格",
      "bottom": "10.123",
      "units":"btc/usdt"
    },{
        "top": "收益",
        "bottom": "123",
        "units":"usdt"
    },
    {
      "top": "成本",
      "bottom": "3212",
      "units":"usdt"
    }
    ],

    legend:[{
      "input_title":"数量",
    }
    ]
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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
    
  }
})