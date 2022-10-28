const { retrieveRecord, retrieveExamDetail } = require("../../services/exam");
const { retrieveQuestions } = require("../../services/question");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    exam: {},
    loading: true,
    record: {},
    questions: [],
    list: [],
  },

  toExam() {
    wx.switchTab({
      url: "/pages/exam/exam",
    });
  },

  extractData: function () {
    const { record, questions } = this.data;
    const temp = [];
    record.list.forEach((item, index, arr) => {
      let problem = { ...item, your_answer: item.answer };
      for (let q of questions) {
        if (q._id == item._id) {
          problem.answer = q.answer;
          problem.option = q.option;
          problem.name = q.question;
          problem.score = q.score;
        }
      }
      temp.push(problem);
    });
    this.setData({
      list: temp,
      loading: false,
    });
  },

  retrieveQuestions: async function () {
    const response = await retrieveQuestions(this.data.record.exam_id, true);
    if (response && response.result?.data) {
      this.setData(
        {
          questions: response.result.data,
        },
        () => {
          this.extractData();
        }
      );
    } else {
      wx.navigateBack({
        delta: 0,
      });
    }
  },

  retrieveExamDetail: async function () {
    const response = await retrieveExamDetail(this.data.record.exam_id);
    console.log(response)
    if (response && response.result?.data) {
      this.setData(
        {
          exam: response.result.data,
        },
        () => {
          this.retrieveQuestions();
        }
      );
    } else {
      wx.navigateBack({
        delta: 0,
      });
    }
  },

  retrieveRecord: async function (recordId) {
    const response = await retrieveRecord(recordId);
    if (response && response.result?.data) {
      this.setData(
        {
          record: response.result.data,
        },
        () => {
          this.retrieveExamDetail();
        }
      );
    } else {
      wx.navigateBack({
        delta: 0,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.recordId = '';
    const { recordId } = options;
    if (!recordId) {
      wx.showToast({
        title: "找不到记录",
        icon: "error",
        complete: () => {
          const timer = setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            });
            clearTimeout(timer);
          }, 1500);
        },
      });
      return;
    }
    this.retrieveRecord(recordId);
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
