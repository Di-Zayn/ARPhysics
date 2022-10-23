// pages/info/info.js
const {
  USERINFO_STORAGE_KEY,
} = require('../../data/constants');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  initUserState(){
    try{
      const userInfo = wx.getStorageSync(USERINFO_STORAGE_KEY);
      if(userInfo){
        const {savedTime} = userInfo;
        if(Date.now() >= savedTime ){
          try{
            wx.removeStorageSync(USERINFO_STORAGE_KEY);
          }catch(err){}finally{
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }else{
          this.setData({
            userInfo: {
              ...userInfo,
            }
          })
        }
        
      }else{
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }catch(err){}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserState();
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