const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

exports.main = async (event, context) => {
  const {_id} = event;
  if(!_id) throw new Error("missed required param _id.");
  // 返回数据库聚合结果
  return await db.collection('course_article').doc(_id).get()
}