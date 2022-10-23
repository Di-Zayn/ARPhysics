const { baseFaultHandler, baseLoadingHandler } = require("../utils/handler");

const retrieveQuestions = async (
  exam_id,
  withAnswer = false,
  onFail = () => {
    baseFaultHandler("题目加载失败");
  }
) => {
  baseLoadingHandler("题目加载中...");
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "retrieveQuestions",
        exam_id: exam_id,
        withAnswer: withAnswer,
      },
    });
  } catch (err) {
    onFail(err);
  } finally {
    wx.hideLoading();
  }
};

module.exports.retrieveQuestions = retrieveQuestions;
