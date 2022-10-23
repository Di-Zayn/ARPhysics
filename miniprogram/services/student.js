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

const setPreTestDone = async ({id}, onFail = () => {}) => {
  try {
    console.log(id)
    return await wx.cloud.callFunction({
      name: "quickstartFunctions",
      data: {
        type: "setPreTestDone",
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
exports.setPreTestDone = setPreTestDone;