// pages/user/user.js
const { USERINFO_STORAGE_KEY } = require("../../data/constants");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showNotes: false,
    userInfo: {
      logined: false,
    },
  },

  initUserState() {
    try {
      const userInfo = wx.getStorageSync(USERINFO_STORAGE_KEY);
      if (userInfo) {
        const { savedTime } = userInfo;
        if (Date.now() >= savedTime) {
          try {
            wx.removeStorageSync(USERINFO_STORAGE_KEY);
          } catch (err) {
          } finally {
            this.setData({
              userInfo: {
                logined: false,
              },
            });
          }
        } else {
          this.setData({
            userInfo: {
              ...userInfo,
              logined: true,
            },
          });
        }
      } else {
        this.setData({
          userInfo: {
            logined: false,
          },
        });
      }
    } catch (err) {}
  },

  toInfo() {
    if (this.data.userInfo.logined) {
      wx.navigateTo({
        url: "/pages/info/info",
      });
    } else {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },

  toRecords() {
    if (this.data.userInfo.logined) {
      wx.navigateTo({
        url: "/pages/exam-record/exam-record",
      });
    } else {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  },

  toLogin() {
    if (this.data.userInfo.logined) return;
    wx.navigateTo({
      url: "/pages/login/login",
    });
  },

  toggleNotes() {
    this.setData({
      showNotes: !this.data.showNotes,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initUserState();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
