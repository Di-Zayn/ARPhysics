const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  // 返回数据库聚合结果
  const { user_id } = event
  if (!user_id) throw new Error("missed required param user_id.");
  return await db.collection("exam_record")
  .where({
    user_id: user_id
  })
  .get();
};
