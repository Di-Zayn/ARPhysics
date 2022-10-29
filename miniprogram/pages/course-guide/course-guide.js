// pages/course-guide/course-guide.js
const { COURSE_CONTENT_TYPES } = require('../../data/constants');
const {baseFaultHandler} = require('../../utils/handler');
const {retrieveCourseContent} = require('../../services/course');
const APP = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_id: '',
    content_id: '',
    detail: {}
  },

  retrieveDetail: async function(_id, onFail){
    const data = await retrieveCourseContent(_id);
    if(data?.result){
      this.setData({
        detail: data.result.data || {}
      })
    }
  },

  /**
   * 
   * @param {integer} type 1=video 2=model 3=video
   * @param {*} data passed to target page
   */
  toDetailPage(event){
    const { openType: type, data } = event.currentTarget.dataset || {};
    let path = '', extraData = data;
    switch(parseInt(type)){
      case 1:
        path = '/pages/video/video';
        break;
      case 2:
        path = "/pages/model/model";
        extraData = null;
        break;
      case 3:
        path ='/pages/video1/video1';
        break;
      case 4:
        path='/pages/article1/article1';
        break;
      default:
        path = '/pages/article/article';
        break;
    }
    wx.navigateTo({
      url: path,
      success: function(res){
        extraData && res.eventChannel.emit('acceptDataFromOpenerPage', {content: extraData})
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {course_id, content_id} = options;
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
      return
    }
    if(!course_id || !content_id){
      baseFaultHandler('课程不存在', 1500, () => {
        wx.navigateBack()
      })
    }else{
      this.setData({
        course_id,
        content_id,
      }, () => {
        this.retrieveDetail(this.data.content_id)
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})