const { baseFaultHandler, baseLoadingHandler } = require("../utils/handler");

const retrieveExames = async (
  onFail = () => {
    baseFaultHandler("测试加载失败");
  }
) => {
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "retrieveExames",
      },
    });
  } catch (err) {
    onFail(err);
  }
};

const submitExam = async (
  data,
  onFail = () => {
    baseFaultHandler("数据提交失败");
  }
) => {
  baseLoadingHandler("答案提交中...");
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "submitExam",
        ...data,
      },
    });
  } catch (err) {
    onFail(err);
  } finally {
    wx.hideLoading();
  }
};

const retrieveRecord = async (
  recordId,
  onFail = () => {
    baseFaultHandler("记录获取失败");
  }
) => {
  baseLoadingHandler("获取考试记录中...");
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "retrieveRecordDetail",
        recordId,
      },
    });
  } catch (err) {
    onFail(err);
  } finally {
    wx.hideLoading();
  }
};

const retrieveExamDetail = async (
  exam_id,
  onFail = () => {
    baseFaultHandler("测试获取失败");
  }
) => {
  baseLoadingHandler("获测试详情中...");
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "retrieveExamDetail",
        exam_id,
      },
    });
  } catch (err) {
    onFail(err);
  } finally {
    wx.hideLoading();
  }
};
const retrieveExamRecords = async (
  user_id,
  onFail = () => {
    baseFaultHandler("记录加载失败");
  }
) => {
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "retrieveExamRecords",
        user_id: user_id
      },
    });
  } catch (err) {
    console.log(err);
    onFail(err);
  }
};

exports.retrieveExames = retrieveExames;
exports.submitExam = submitExam;
exports.retrieveRecord = retrieveRecord;
exports.retrieveExamDetail = retrieveExamDetail;
exports.retrieveExamRecords = retrieveExamRecords;
