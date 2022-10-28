const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { id } = event;
  // 返回数据库聚合结果
  let result = false
  await db.collection("exam_record").where({
    user_id: id,
    exam_id: 'pre_test'
  }).get().then((res) => {
    if (res.data.length != 0) {
      result = true
    }
  }).catch((err)=>{
    console.log(err)
  })
  return result
};