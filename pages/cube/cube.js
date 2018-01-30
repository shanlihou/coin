// pages/cube/cube.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ctxWidth:300,
    ctxHeight:400
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ctx = wx.createCanvasContext('myCanvas');
    this.setData({
      ctx: ctx
    });

    //this.draw3DArray();
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
  draw3DArray: function (point3d, angle){
    var point3D = new Array();
    for (var i = 1; i < point3d.length; i++)
    {
      var point = this.turnAngle(point3d[i], angle);
      point.x += point3d[0].x;
      point.y += point3d[0].y;
      point.z += point3d[0].z;
      /*
      var point = {
        x: point3d[i].x + point3d[0].x,
        y: point3d[i].y + point3d[0].y,
        z: point3d[i].z + point3d[0].z
      };*/
      point3D.push(point);
    }

    var point2D = new Array();
    for (var i = 0; i < point3D.length; i++)
    {
      var point = this.convertCoor(point3D[i])
      point2D.push(point);
    }
    this.draw2DArray(point2D);
  },
  draw2DArray:function(pointArray){
    console.log(pointArray);
    this.data.ctx.moveTo(pointArray[0].x, pointArray[0].y);
    for (var i = 1; i < pointArray.length; i++){
      this.data.ctx.lineTo(pointArray[i].x, pointArray[i].y);
    }
    this.data.ctx.fill()
    this.data.ctx.draw(true)
  },
  convertCoor: function(point){
    return {
      x:150 + point.x * 150 / point.y,
      y:200 - point.z * 150 / point.y
    }
  },
  turnAngle:function(point, angle){
    var hAngle = angle.h * Math.PI / 180;
    var vAngle = angle.v * Math.PI / 180;
    var x = point.x * Math.cos(hAngle) - point.y * Math.sin(hAngle)
    var y = point.x * Math.sin(hAngle) + point.y * Math.cos(hAngle)
    y += point.y * Math.cos(vAngle) - point.z * Math.sin(vAngle)
    var z = point.y * Math.sin(vAngle) + point.z * Math.cos(vAngle)
    return {x:x,y:y,z:z};
  },
  start:function(e){
    this.setData({
      xCoor: e.touches[0].x,
      yCoor: e.touches[0].y
    })
  },
  move: function (e) {
    var xOff = e.touches[0].x - this.data.xCoor;
    var yOff = e.touches[0].y - this.data.yCoor;
    var point3d = [
      { x: 0, y: 100, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 50, y: 0, z: 0 },
      { x: 50, y: 0, z: 50 },
      { x: 0, y: 0, z: 50 }
    ];
    var point2 = [
      { x: 0, y: 100, z: 0 },
      { x: 0, y: 50, z: 0 },
      { x: 50, y: 50, z: 0 },
      { x: 50, y: 50, z: 50 },
      { x: 0, y: 50, z: 50 }
    ];
    this.data.ctx.clearRect(0, 0, 300, 400);
    this.draw3DArray(point3d, {h:xOff,v:yOff});
    this.draw3DArray(point2, { h: xOff, v: yOff });
  }
})