const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { exam_id } = event;
  if (!exam_id) throw new Error("miss required param exam_id.");
  // 返回数据库聚合结果
  return await db.collection("exam").doc(exam_id).get();
};
