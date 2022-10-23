const { retrieveExames } = require("../../services/exam");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    exam_group1: [],
    exam_group2: [],
  },

  retrieveExames: function () {
    this.setData(
      {
        isLoading: true,
      },
      async () => {
        const response = await retrieveExames();
        if (response) {
          const data = response.result.data,
            group1 = [],
            group2 = [];
          data.forEach((item) => {
            if (item.type == 1) {
              group1.push(item);
            } else if (item.type == 2) {
              group2.push(item);
            }
          });
          this.setData({
            exam_group1: group1,
            exam_group2: group2,
            isLoading: false,
          });
        } else {
          this.setData({
            isLoading: false,
          });
        }
      }
    );
  },

  toanswer: (e) => {
    wx.navigateTo({
      url: "/pages/answer/answer",
      success: (res) => {
        res.eventChannel.emit("acceptDataFromOpenerPage", {
          exam: e.currentTarget.dataset.exam,
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.retrieveExames();
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
