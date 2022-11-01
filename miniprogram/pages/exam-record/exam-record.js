// pages/exam-record/exam-record.js
const { retrieveExamRecords } = require("../../services/exam");
const APP = getApp()

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
    const userInfo = APP.globalData.userInfo
    const res = await retrieveExamRecords(userInfo._id);
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

});
