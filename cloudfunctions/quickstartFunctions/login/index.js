const cloud = require("wx-server-sdk");

// cloud.init({
//   env: 'cloud1-0gwuxkfae8d5a879',
// });
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { number, password } = event;
  if (!number) throw new Error("missed required param number.");
  if (!password) throw new Error("missed required param password");
  // 返回数据库聚合结果
  return await db
    .collection("student")
    .where({
      number: number,
      password: password,
    })
    .field({
      _id: true,
      class: true,
      name: true,
      number: true,
      major: true,
    })
    .get();
};
