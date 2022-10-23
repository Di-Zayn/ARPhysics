const { retrieveRecord } = require("../../services/exam");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    record: null,
    current: 0,
    score: 0,
    countTimer: null,
  },

  countInterval: function () {
    this.countTimer = setInterval(() => {
      if (this.data.current <= 2 * this.data.record.score) {
        this.circle.drawCircle(
          "circle_draw1",
          80,
          8,
          this.data.current / this.data.record.total_score
        );
        this.data.current++;
      } else {
        clearInterval(this.countTimer);
      }
    }, 10);
  },

  retrieveRecordDetail: async function (recordId) {
    const response = await retrieveRecord(recordId);
    if (response && response.result?.data) {
      this.setData(
        {
          record: response.result.data,
        },
        () => {
          this.circle = this.selectComponent("#circle1");
          this.circle.drawCircleBg("circle_bg1", 80, 8);
          this.countInterval();
        }
      );
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { record } = options;
    if (!record) {
      wx.showToast({
        title: "找不到结果",
        icon: "error",
        complete: () => {
          const timer = setTimeout(() => {
            wx.navigateBack();
            clearTimeout(timer);
          }, timer);
        },
      });
      return;
    }
    this.retrieveRecordDetail(record);
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
