const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { id } = event;
  // 返回数据库聚合结果
  return await db
    .collection("student")
    .where({
      _id: id
    })
    .update({
      data: {
        preTestDone: true
      }
    });
};