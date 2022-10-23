// pages/exam-record/exam-record.js
const { retrieveExamRecords } = require("../../services/exam");


Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  toReview(event) {
    wx.navigateTo({
      url: `/pages/review/review?recordId=${event.currentTarget.dataset.id}`,
    });
  },

  retrieveRecords: async function () {
    const res = await retrieveExamRecords();
    if (res?.result?.data) {
      res.result.data.forEach((item, index) => {
        const date = new Date(item.time);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const min = date.getMinutes();
        const s = date.getSeconds();
        res.result.data[index].date = `${y}-${m}-${d} ${h}:${min}:${s}`;
      });
      this.setData({
        list: res.result.data,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.retrieveRecords();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
