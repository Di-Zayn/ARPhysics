const { baseFaultHandler, baseLoadingHandler } = require("../utils/handler");

const login = async (account, password, onFail = () => {}) => {
  baseLoadingHandler("登录中...");
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "login",
        number: account,
        password,
      },
    });
  } catch (err) {
    baseFaultHandler(err.message || JSON.stringify(err));
  } finally {
    wx.hideLoading();
  }
};

const checkPreTest = async ({id}, onFail = () => {}) => {
  try {
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "checkPreTest",
        id: id,
      },
    });
  } catch (err) {
    baseFaultHandler(err.message || JSON.stringify(err));
  } finally {
    wx.hideLoading();
  }
};

exports.login = login;
exports.checkPreTest = checkPreTest;