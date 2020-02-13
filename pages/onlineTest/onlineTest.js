const URL = require('../../utils/url.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: true,
    examList: [
      {
        examId: "0",
        examName: "云计算期末考",
        examDate: "2019-11-21",
        examTeacher: "邓磊"
      },
      {
        examId: "1",
        examName: "JavaWeb期末考",
        examDate: "2019-11-17",
        examTeacher: "宋铁"
      }
    ]
  },

  navigate: function (e) {
    var exam = e.currentTarget.dataset.exam
    console.log("online test page: current target data: ");
    console.log(e.currentTarget);
    if (e.currentTarget.dataset.exam.examStudentState == "已完成") {
      wx.showToast({
        title: '该考试已完成'
      })
    } /* else if (e.currentTarget.dataset.exam.examState == "未开始") {
      wx.showToast({
        title: '该考试尚未开始',
        icon: 'loading'
      })
    } */ else {
      var that = this
      wx.showModal({
        title: '确认开始',
        content: '考试：' + exam.examName,
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'exam/exam',
              events: {
                acceptData: function (data) {
                  console.log(data)
                }
              },
              success: function (res) {
                res.eventChannel.emit('examInfo', {
                  exam: exam
                })
              }
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面渲染
   */
  onShow: function () {
    let that = this;
    // 底bar切换：
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }

    // 获取考试列表：
    const classInfo = app.globalData.classInfo;
    wx.request({
      url: URL.getExams + classInfo.classList[classInfo.selected].classId,
      method: 'GET',
      header: {
        'Career-user': app.globalData.token
      },
      success: function (res) {
        console.log('Response from get exams:');
        console.log(res.data);
        if (res.data.code == 400){
          let classInfo = app.globalData.classInfo
          that.setData({
            isEmpty: true,
            className: classInfo.classList[classInfo.selected].className
          })
        } else {
          that.setData({
            isEmpty: false,
            examList: res.data.data
          })
        }
      }
    })
  },

  // 当监听到当前班级切换时，刷新当前考试列表
  freshExams: function() {
    console.log("Online test page fresh exams.")
    this.onShow();
  }
})