// pages/draw/draw.js
var ctx = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:0,
    y:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ctx = wx.createCanvasContext('myCanvas');
    this.setData({
      ctx:ctx,
      leftLength: 100
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

  },
  start:function(e){
    //ctx.stroke()
    //ctx.draw()
    this.setData({
      x:e.touches[0].x,
      y:e.touches[0].y,
      bDraw:true
    });
  },
  move: function (e) {
    //const ctx = this.data.ctx;
    if (this.data.bDraw && this.data.leftLength > 0) {
      this.draw(e.touches[0].x, e.touches[0].y)
    }
  },
  end: function (e) {
    //const ctx = this.data.ctx;
    //ctx.lineTo(e.touches[0].x, e.touches[0].y)
    console.log(e)
    if (this.data.bDraw && this.data.leftLength > 0){
      this.draw(e.touches[0].x, e.touches[0].y)
    }
    this.setData({
      bDraw:false
    })
  },
  draw: function (x, y) {
    var tmpLength = this.data.leftLength;
    var xLen = x > this.data.x ? x - this.data.x : this.data.x - x;
    var yLen = y > this.data.y ? y - this.data.y : this.data.y - y;
    var len = Math.sqrt(xLen * xLen + yLen * yLen);
    console.log('start')
    console.log(x, y)
    if (len > tmpLength) {
      x = Math.round(this.data.x + (x - this.data.x) * tmpLength / len);
      y = Math.round(this.data.y + (y - this.data.y) * tmpLength / len);
      tmpLength = 0;
    } else {
      tmpLength -= len;
    }
    //var color = this.penColor.css("background-color");
    //this.mCxt.strokeStyle = color;
    //this.mCxt.beginPath();
    ctx.moveTo(this.data.x, this.data.y);
    ctx.lineTo(x, y);
    console.log(x,y);
    //this.colors.push(color);
    //this.points.push({ "sx": that.x, "sy": that.y, "dx": x, "dy": y });
    ctx.stroke();
    ctx.draw(true);
    //$("#progress").css("width", this.mLength + "%");
    this.setData({
      x:x,
      y:y,
      leftLength:tmpLength
    })
  },
  reDraw:function(){
    
  }
})