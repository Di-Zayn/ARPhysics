const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { withAnswer, exam_id } = event;
  if (!exam_id) {
    throw new Error("miss required param exam_id.");
  }
  const fieldConfig = {
    _id: true,
    exam_id: true,
    option: true,
    question: true,
    score: true,
    img: true,
  };
  if (withAnswer == true) {
    fieldConfig.answer = true;
  }
  // 返回数据库聚合结果
  return await db
    .collection("exam_question")
    .where({
      exam_id: exam_id,
    })
    .field(fieldConfig)
    .get();
};
