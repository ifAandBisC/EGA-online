const URL = require('/utils/url.js')

App({
  onLaunch: function() {
  },
  globalData: {
    token: null,
    userId: null,
    userInfo: null,
    isTeacher: false,
    classInfo: {
      selected: 0,
      classList: []
      /* [
        {
          classId: '',
          name: '礼仪班01班', 
          teacherName: '朱一旦'
        }, {
          classId: '',
          name: '形象班02班',
          teacherName: '刘艾佳'
      }] */
    }
  }
})