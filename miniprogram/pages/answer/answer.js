const { retrieveQuestions } = require("../../services/question");
const { submitExam } = require("../../services/exam");
const {
  USERINFO_STORAGE_KEY,
  USER_LOGIN_EXPIRE_DURATION,
} = require("../../data/constants");
const APP = getApp();

Page({
  data: {
    exam: {},
    submitDisabled: true,
    submitToServering: false,
    loadingExams: true,
    questions: [],
    answers: [],
    currentQuestion: {},
    currentQIndex: 0,
    currentAIndex: -1,
    currentAnswer: [],
    progress: 0,
  },

  quitConfirm() {
    wx.showActionSheet({
      alertText: "结束答题后结果不会保留，确定要结束么？",
      itemList: ["确定结束"],
      itemColor: "#A71919",
      success: ({ tapIndex }) => {
        tapIndex === 0 && this.quit();
      },
    });
  },

  quit() {
    wx.navigateBack();
  },

  async retrieveQuestions() {
    const response = await retrieveQuestions(this.data.exam._id, true);
    if (response && response.result.data?.length) {
      this.setData({
        questions: response.result.data,
        currentQuestion: response.result.data[0],
        loadingExams: false,
      });
    } else {
      wx.navigateBack();
    }
  },

  onLoad: function (options) {
    const user = APP.globalData.userInfo;
    if (!user) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
      return;
    } else if (!user.preTestDone) {
      wx.showToast({
        title: '请先完成前测',
      })
      setTimeout(() => {
        this.setData(
          {
            exam: {
              _id: 'pre_test',
              name: '学前测试'
            },
          },
          () => {
            this.retrieveQuestions();
          }
        );
      }, 500);
      return
    }
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      const { exam } = data;
      if (!exam) {
        wx.showToast({
          title: "测试ID错误",
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
      this.setData(
        {
          exam,
        },
        () => {
          this.retrieveQuestions();
        }
      );
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  handleMultiOptionSelected(e) {
    const selectedValue = e.currentTarget.dataset.value;
    const isChecked = e.currentTarget.dataset.checked;
    // 如果该选项之前选择过就葱currentAnswer删去 否则加入
    if (!isChecked) {
      if (this.data.currentAnswer.indexOf(selectedValue) == -1)
        this.setData({
          currentAnswer: [...this.data.currentAnswer, selectedValue],
          submitDisabled: false,
        });
    } else {
      const newData = this.data.currentAnswer;
      for (let i = 0, len = newData.length; i < len; i++) {
        if (newData[i] == selectedValue) {
          newData.splice(i, 1);
        }
      }
      this.setData({
        currentAnswer: newData,
        submitDisabled: false,
      });
    }
  },
  handleSingleOptionSelected(e) {
    const selectedValue = e.currentTarget.dataset.value;
    const isChecked = e.currentTarget.dataset.checked;
    // 如果选择过 不处理 否则加入 并清空之前的
    if (!isChecked) {
      if (this.data.currentAnswer.indexOf(selectedValue) == -1)
        this.setData({
          currentAnswer: [selectedValue],
          submitDisabled: false,
        });
    }
  },
  handleForward() {
    const { currentQIndex, answers, questions } = this.data
    this.setData(
      {
        answers: [...this.data.answers, this.data.currentAnswer],
        currentQIndex: currentQIndex + 1,
        progress: ((answers.length + 1) / questions.length) * 100,
        submitDisabled: true,
        currentAnswer: [],
        currentQuestion: questions[currentQIndex + 1],
      }
    );
  },
  handleQuestionSubmit() {
    const { questions, answers } = this.data;
    if (answers.length < questions.length) {
      this.setData({
        answers: [...this.data.answers, this.data.currentAnswer],
        progress: ((answers.length + 1) / questions.length) * 100
      })
    }
    this.setData(
      {
        submitToServering: true,
      },
      () => {
        this.submitToServer()
      }
    );
  },

  async submitToServer() {
    const { exam, answers } = this.data;
    const result = await submitExam({
      exam,
      result: answers,
      user: APP.globalData.userInfo,
    });
    if (result) {
      let params = {
        record: result.result._id,
      }
      if (exam._id == "pre_test") {
        const user = APP.globalData.userInfo;
        params.type = "preTest"
        if (!user) {
          wx.showToast({
            title: "登录超时",
          });
          wx.navigateTo({
            url: "/pages/login/login",
          });
          return;
        } else {
          user.preTestDone = true
          APP.globalData.userInfo = user
          // user.savedTime = Date.now() + USER_LOGIN_EXPIRE_DURATION;
          wx.setStorageSync(USERINFO_STORAGE_KEY, user);
          setTimeout(() => {
            wx.showToast({
              title: '已成功完成前测',
            })
          }, 500);
        }
      } else {
        params.type = "normalTest"
        wx.showToast({
          title: "答案提交成功",
        });
      }
      wx.navigateTo({
        url: `/pages/exam-result/exam-result?obj=${JSON.stringify(params)}`,
      });
    } else {
      this.setData({
        submitDisabled: false,
        submitToServering: false
      });
      wx.showToast({
        title: "提交失败，请重试",
        icon: "error",
      });
    }
  },

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
