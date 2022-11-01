// pages/article/article.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    html: "",
    isMuti: false,
    currentHtml: "",
  },

  back() {
    if (this.data.isMuti) {
      this.setData({
        isMuti: false,
      });
    } else {
      wx.navigateBack({
        delta: 0,
      })
    }
  },

  showQuestion(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentHtml: this.data.html[index],
      isMuti: true,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      const content = data.content;
      if (content.indexOf("题2") > -1) {
        const one = content.split("题2")[0];
        const two = "题2" + content.split("题2")[1];
        this.setData({
          html: [one, two],
        });
      } else {
        this.setData({
          html: data.content,
        });
      }
    });
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
