const { login } = require("../../services/student");
const { checkPreTest } = require("../../services/student");
const {
  USERINFO_STORAGE_KEY,
  USER_LOGIN_EXPIRE_DURATION,
} = require("../../data/constants");
const App = getApp();

// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: "",
    password: "",
    isLogin: false,
  },

  handleAccountChange: function ({ detail: { value } }) {
    this.setData({
      account: value.trim(),
    });
  },

  handlePasswordChange: function ({ detail: { value } }) {
    this.setData({
      password: value.trim(),
    });
  },

  handleSubmit: async function () {
    this.setData({
      isLogin: true,
    });
    const response = await login(this.data.account, this.data.password);
    if (response) {
      const {
        result: { data },
      } = response;
      if (!data || !data[0]) {
        wx.showToast({
          title: "学号或密码错误",
          icon: "error",
        });
        this.setData({
          isLogin: false,
        });
      } else {
        wx.showToast({
          title: "登录成功",
          icon: "error",
        });
        const userInfo = data[0];
        // 检查是否完成前测 并存入到全局信息中
        const isPreTestDone = await checkPreTest({id: userInfo._id})
        userInfo.preTestDone = isPreTestDone.result
        App.globalData.userInfo = userInfo;
        // 调试时每次保存都会清空globaldata并重加载缓存数据 因此需要存一下
        userInfo.savedTime = Date.now() + USER_LOGIN_EXPIRE_DURATION;
        wx.setStorageSync(USERINFO_STORAGE_KEY, userInfo);
        setTimeout(() => {
          this.setData({
            isLogin: false,
          });
          // 没有进行前测则进入测试界面
          if (!userInfo.preTestDone) {
            wx.navigateTo({
              url: '/pages/answer/answer',
              success: (res) => {
                res.eventChannel.emit("acceptDataFromOpenerPage", {
                  exam: {
                    _id: 'pre_test',
                    name: '学前测试'
                  },
                });
              },
            })
          } else {
            wx.switchTab({
              url: "/pages/user/user",
            });
          }
        }, 1500);
      }
    } else {
      this.setData({
        isLogin: false,
      });
    }
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
