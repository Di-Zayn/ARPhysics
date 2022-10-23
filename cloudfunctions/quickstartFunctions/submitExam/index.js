const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

exports.main = async (event, context) => {
  const { exam, result, user } = event;
  const questions = await db
    .collection("exam_question")
    .where({
      exam_id: exam._id,
    })
    .get();
  const wrongQuestions = [];
  let totalScore = 0, maxScore = 0;
  if (questions && questions.data && questions.data.length) {
    questions.data.forEach((question, index) => {
      const { _id, answer, score } = question;
      if (
        JSON.stringify(answer.sort()) != JSON.stringify(result[index].sort())
      ) {
        wrongQuestions.push({
          _id,
          answer: result[index],
        });
      } else {
        totalScore += Number(score);
      }
      maxScore += Number(score);
    });
    var a = {
      data: {
        exam_id: exam._id,
        exam_name: exam.name,
        list: wrongQuestions,
        score: totalScore,
        user_id: user._id,
        total_score: maxScore,
        time: Date.now(),
      },
    }
    console.log(a)
    return await db.collection("exam_record").add({
      data: {
        exam_id: exam._id,
        exam_name: exam.name,
        list: wrongQuestions,
        score: totalScore,
        user_id: user._id,
        total_score: maxScore,
        time: Date.now(),
      },
    });
  }
};
