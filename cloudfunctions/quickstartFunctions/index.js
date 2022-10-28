const getOpenId = require("./getOpenId/index");
const getMiniProgramCode = require("./getMiniProgramCode/index");
const createCollection = require("./createCollection/index");
const selectRecord = require("./selectRecord/index");
const updateRecord = require("./updateRecord/index");
const retrieveCourses = require("./retrieveCourses/index");
const retrieveCourseContent = require("./retrieveCourseContent/index");
const login = require("./login/index");
const retrieveExames = require("./retrieveExames/index");
const retrieveQuestions = require("./retrieveQuestions/index");
const submitExam = require("./submitExam/index");
const retrieveRecordDetail = require("./retrieveRecordDetail/index");
const retrieveExamDetail = require("./retrieveExamDetail/index");
const retrieveRecords = require("./retrieveRecords/index");
const checkPreTest = require("./checkPreTest/index");


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "getOpenId":
      return await getOpenId.main(event, context);
    case "getMiniProgramCode":
      return await getMiniProgramCode.main(event, context);
    case "createCollection":
      return await createCollection.main(event, context);
    case "selectRecord":
      return await selectRecord.main(event, context);
    case "updateRecord":
      return await updateRecord.main(event, context);
    case "retrieveCourses":
      return await retrieveCourses.main(event, context);
    case "retrieveCourseContent":
      return await retrieveCourseContent.main(event, context);
    case "login":
      return await login.main(event, context);
    case "retrieveExames":
      return await retrieveExames.main(event, context);
    case "retrieveQuestions":
      return await retrieveQuestions.main(event, context);
    case "submitExam":
      return await submitExam.main(event, context);
    case "retrieveRecordDetail":
      return await retrieveRecordDetail.main(event, context);
    case "retrieveExamDetail":
      return await retrieveExamDetail.main(event, context);
    case "retrieveExamRecords":
      return await retrieveRecords.main(event, context);
    case "checkPreTest":
      return await checkPreTest.main(event, context);
  }
};
