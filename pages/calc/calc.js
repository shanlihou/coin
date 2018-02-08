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
    totalAmount:0,
    totalCost:0,
    soldAmount:0,
    soldEarn:0,
    amount:0,
    rate:0,
    cost:"",
    buyOrSale:false,
    buyDisabled:true,
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
    var common = wx.getStorageSync('common');
    if (common){
      this.setData(common);
      this.setData({
        common: common
      })
    }
    else{
      common = {
        coinIndex:0,
        buyerIndex:0
      };
      this.setData({
        common: common
      })
    }
    // load the data of some blockChain
    var key = this.data.coinArray[this.data.coinIndex] + '_' + this.data.buyerArray[this.data.buyerIndex];
    var that = this;
    wx.getStorage({
      key: key,
      success: function (res) {
        that.setData(res.data);
      }
    });
    this.loadHistory();
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
    var buyDisabled = true;
    if (cost) {
      cost += (this.data.buyOrSale ? -this.data.serviceCharge : this.data.serviceCharge) * cost;
      buyDisabled = false;
    }
    else {
      cost = "";
    }
    this.setData({
      cost: cost, 
      buyDisabled: buyDisabled
    });
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
    this.setTab(e.detail.current);
  },
  clear:function(what){
    var clearData = {
      viewBlock: [{
        "top": "持有数量",
        "bottom": 0,
        "units": "块"
      }, {
        "top": "平均买入价格",
        "bottom": 0,
        "units": "btc/usdt"
      }, {
        "top": "收益",
        "bottom": 0,
        "units": "usdt"
      },
      {
        "top": "成本",
        "bottom": 0,
        "units": "usdt"
      }
      ],
      totalAmount: 0,
      totalCost: 0,
      soldEarn: 0,
      soldAmount: 0
    };
    if (what == 'bus') {
      clearData.rate = 0;
      clearData.legend = [{
        "inputTitle": "汇率",
        "padTop": 5,
        "id": "rate",
        "value": ""
      },
      {
        "inputTitle": "数量",
        "padTop": 15,
        "id": "amount",
        "value": ""
      }];
      this.setData(clearData);
    }
    else if (what == 'overview') {
      var key = this.data.coinArray[this.data.coinIndex] + '_' + this.data.buyerArray[this.data.buyerIndex];
      this.setData(clearData);
      clearData.rate = this.data.rate;
      clearData.legend = this.data.legend;
      wx.setStorage({
        key: key,
        data: clearData,
      })
    }
  },
  coinChange: function (e) {//will load the data
    var common = this.data.common;
    if (e.target.id == 'coin') {
      this.setData({
        coinIndex: e.detail.value
      });
      common.coinIndex = e.detail.value;
    }
    else {
      this.setData({
        buyerIndex: e.detail.value
      });
      common.buyerIndex = e.detail.value;
    }
    wx.setStorage({
      key: 'common',
      data: common,
    });
    this.setData({
      common:common
    })

    this.clear('bus');
    var key = this.data.coinArray[this.data.coinIndex] + '_' + this.data.buyerArray[this.data.buyerIndex]
    var that = this;
    wx.getStorage({
      key: key,
      success: function(res) {
        that.setData(res.data);
        that.setData({
          busData: res.data
        })
      },
    })
  },
  ioChange:function(e){
    this.setData({
      ioSwitch: e.detail.value ? 0 : 1
    })
  },
  calc:function(e){
    
  },
  // 买卖行为切换
  dealActionChange:function(e) {
    this.setData({
      dealAction: e.detail.value ? "卖出": "买入",
      buyOrSale: e.detail.value
    });
    this.calcCost();
  },
  decimal:function(num){
    return Math.round(num * 10000) / 10000;
  },
  saveBus: function (key) {
    var legend = this.data.legend;
    legend[0].value = this.data.rate;
    var value = {
      viewBlock: this.data.viewBlock,
      rate: this.data.rate,
      legend: legend,
      totalAmount: this.data.totalAmount,
      totalCost: this.data.totalCost,
      soldEarn: this.data.soldEarn,
      soldAmount: this.data.soldAmount
    }
    wx.setStorage({
      key: key,
      data: value,
    });
    var hisKey = this.createHistoryKey('_history');
    wx.setStorage({
      key: hisKey,
      data: this.data.history,
    });

  },
  onBuy:function(e){//will save the data
    var viewBlock = this.data.viewBlock;
    var totalAmount = this.data.totalAmount;
    var totalCost = this.data.totalCost;
    var soldAmount = this.data.soldAmount;
    var soldEarn = this.data.soldEarn;
    if (this.data.buyOrSale){//sale
      if (totalAmount - soldAmount < this.data.amount)
        return;
      soldAmount += this.data.amount;
      soldEarn += this.data.cost;
    }
    else{//buy
      totalAmount += this.data.amount;
      totalCost += this.data.cost;
    }
    viewBlock[0].bottom = this.decimal(totalAmount - soldAmount);
    viewBlock[1].bottom = this.decimal(totalCost / totalAmount);
    viewBlock[2].bottom = this.decimal(soldEarn);
    viewBlock[3].bottom = this.decimal(totalCost);

    this.setData({
      viewBlock:viewBlock,
      totalAmount:totalAmount,
      totalCost:totalCost,
      soldEarn:soldEarn,
      soldAmount:soldAmount
    });
    var history = this.data.history;
    history.push({
      chain: this.data.coinArray[this.data.coinIndex],
      buyer: this.data.buyerArray[this.data.buyerIndex],
      rate:this.data.rate,
      amount:this.data.amount,
      cost:this.data.cost,
      action: this.data.buyOrSale
    });
    this.setData({
      history:history
    });
  },

  changeServiceCharge:function(e) {
    this.setData({
      serviceChargeLock: e.detail.value
    })
  },
  saveRecord:function(e){
    var key = this.data.coinArray[this.data.coinIndex] + '_' + this.data.buyerArray[this.data.buyerIndex];
    this.saveBus(key);
  },

  clearRecord:function(e) {
    var that = this;
    wx.showModal({
      title: '清空内容',
      content: '确定要清空该币种么？',
      success: function(res) {
        if (res.confirm) {
          that.clear('overview');
        }else if (res.cancel) {
        }
      }
    })

  },
  loadHistory(){
    var hisKey = this.createHistoryKey('_history');
    var that = this;
    wx.getStorage({
      key: hisKey,
      complete: function(res) {
        if ('data' in res){
          that.setData({
            history:res.data
          });
        }
        else{
          that.setData({
            history:[]
          })
        }
      },
    })
  },
  createHistoryKey(key){
    var dateStr = new Date().toLocaleDateString();
    return dateStr + key;
  }
})