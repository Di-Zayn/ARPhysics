// pages/fuya/fuya.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showFuyaPdf:function(){
    wx.downloadFile({
      url: 'https://636c-cloud1-1g6gf2io118b9a8f-1314507429.tcb.qcloud.la/CN209900188U.pdf?sign=65a0d6646db60a448a491510d92059d9&t=1667308379',      //要预览的PDF的地址
      success: function (res) {                           
        console.log(res);
        if (res.statusCode === 200) {                     //成功
          var Path = res.tempFilePath                     //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,               //要打开的文件路径
            success: function (res) {
              console.log('打开PDF成功');
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);                                  //失败
      }
  })
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

  }
})