const {baseFaultHandler, baseLoadingHandler} = require("../utils/handler");

const retrieveCourses = async (onFail = () => {baseFaultHandler("课程加载失败")}) => {
 baseLoadingHandler('课程加载中...');
 try{
   return await wx.cloud.callFunction({
     name: 'quickstartFunctions',
     data: {
       type: 'retrieveCourses'
     }
   });
 }catch(err){
  onFail(err);
 }finally{
   wx.hideLoading();
 }
}

const retrieveCourseContent = async (content_id, onFail = () => {baseFaultHandler("课程加载失败")}) => {
  baseLoadingHandler('课程内容加载中...');
  try{
    return await wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'retrieveCourseContent',
        _id: content_id,
      }
    });
  }catch(err){
   onFail(err);
  }finally{
    wx.hideLoading();
  }
}



module.exports.retrieveCourses = retrieveCourses;
module.exports.retrieveCourseContent = retrieveCourseContent;