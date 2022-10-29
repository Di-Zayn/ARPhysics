const {retrieveCourses} = require('../../services/course');

Page({

  data: {
    courses: [],
    loading: false
  },
  getCourses: function () {
    this.setData({
      loading: true
    }, async () => {
      const coursesData = await
       retrieveCourses();
      if(coursesData){
        const {result: courses} = coursesData;
        this.setData({
          courses: courses.data || [],
          loading: false
        })
      } else {
        this.setData({
          loading: false
        })
      }
    })
  },
  onLoad: function () {
    this.getCourses()
  },
})