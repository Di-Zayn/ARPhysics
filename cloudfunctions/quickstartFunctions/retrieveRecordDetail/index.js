const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { recordId } = event;
  if (!recordId) {
    throw new Error("miss required param recordId.");
  }
  // 返回数据库聚合结果
  return await db.collection("exam_record").doc(recordId).get();
};
