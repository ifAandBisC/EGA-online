const app = getApp()
const URL = require('../../utils/url.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWindow: false,
    examWindow: false,
    addClassWindow: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  switchRole: function() {
    app.globalData.isTeacher = !app.globalData.isTeacher
    this.setData({
      isTeacher: app.globalData.isTeacher
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.login()
    if (app.globalData.isTeacher) {
      this.setData({
        isTeacher: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 切换底部 bar selected状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }

    this.getClassInfo()
  },

  login: function() {
    // 获取用户微信数据 头像 昵称 等
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  showWindow: function() {
    this.setData({
      showWindow: true
    })
  },

  closeWindow: function() {
    this.setData({
      showWindow: false,
      paperWindow: false,
      examWindow: false,
      addClassWindow: false
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    this.getClassInfo()
  },

  // Student functions:

  showExams: function() {
    this.getTranscripts()
    this.setData({
      examWindow: true
    })
    this.showWindow()
  },

  showPapers: function() {
    // this.getPapers()
    this.setData({
      paperWindow: true
    })
    this.showWindow()
  },

  getClassInfo: function() {
    let classInfo = app.globalData.classInfo;
    this.setData({
      className: classInfo.classList[classInfo.selected].className,
      teacher: classInfo.classList[classInfo.selected].teacherName
    });
  },

  getTranscripts: function() {
    let that = this
    wx.request({
      url: URL.getTranscripts,
      method: 'GET',
      header: {
        'Career-user': app.globalData.token
      },
      success: function(res) {
        console.log("Response from get all transcripts:")
        console.log(res)

        that.setData({
          examList: res.data.data
        })
      }
    })
  },

  showTranscript: function(e) {
    console.log("Show this transcript:")
    console.log(e)
    wx.request({
      url: URL.getTranscriptDetail + e.currentTarget.dataset.exam.transcriptId,
      method: 'GET',
      header: {
        'Career-user': app.globalData.token
      },
      success: function(res) {
        console.log("Response from get one perticular transcripts:")
        console.log(res)
        let transcriptInfo = res.data.data

        wx.navigateTo({
          url: 'transcript/transcript',
          events: {
            acceptData: function(data) {
              console.log(data)
            }
          },
          success: function(res) {
            res.eventChannel.emit('examInfo', {
              exam: transcriptInfo
            })
          }
        })
      }
    })
  },

  joinClass: function(classId) {
    let that = this;
    console.log(app.globalData.token)
    wx.request({
      url: URL.joinClass + classId,
      method: 'POST',
      header: {
        'Career-user': app.globalData.token
      },
      success: function(res) {
        console.log("Response from join class url:");
        console.log(res.data);

        new Promise(function(resolve) {
          wx.request({
            url: URL.viewClass,
            method: 'GET',
            header: {
              'Career-user': app.globalData.token
            },
            success: function(res) {
              app.globalData.classInfo.classList = res.data.data;
              resolve()
            }
          })
        }).then(function() {
          let classInfo = app.globalData.classInfo;

          // 将当前班级切换到新加入的班级：
          classInfo.selected = classInfo.classList.length - 1;
          that.setData({
            className: classInfo.classList[classInfo.selected].className
          });


          wx.showToast({
            title: '已加入 ' + classInfo.classList[classInfo.selected].className,
            duration: 2000
          })
        })
      }
    })
  },

  scanCode: function() {
    let that = this;
    wx.scanCode({
      success: function(res) {
        console.log("Scan code successfully.")
        let info = JSON.parse(res.result)
        if (info.action == 1) {
          that.joinClass(info.classId);
        }
      },
      fail: function(res) {
        console.log("Scan cod failed.")
      }
    })
  },

  changeClass: function() {
    let that = this;
    let classInfo = app.globalData.classInfo;
    let classNameList = classInfo.classList.map(function(e) {
      return e.className;
    });
    console.log(classNameList);
    if (classNameList.length == 0) {
      wx.showToast({
        title: '暂未加入班级',
        icon: 'loading',
        duration: 2000
      })
    }
    wx.showActionSheet({
      itemList: classNameList,
      success: function(res) {
        classInfo.selected = res.tapIndex
        console.log(classInfo.selected)
        that.setData({
          className: classInfo.classList[res.tapIndex].className,
          teacher: classInfo.classList[res.tapIndex].teacherName
        })
      }
    })
  },

  // Teacher functions:

  showAddClass: function() {
    this.setData({
      addClassWindow: true
    })
    this.showWindow()
  },

  addExam: function() {
    wx.navigateTo({
      url: 'newExam/newExam',
    })
  },

  addPaper: function() {
    wx.navigateTo({
      url: 'newPaper/newPaper',
    })
  },

  toStudentList: function() {
    wx.navigateTo({
      url: 'viewStudents/viewStudents',
    })
  }
})