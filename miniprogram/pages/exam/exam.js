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

  onLoad: function (options) {
    this.retrieveExames();
  },
});
