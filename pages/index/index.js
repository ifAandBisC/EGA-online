const app = getApp();
const URL = require("../../utils/url.js")

Page({
  data: {
    labList: [{
      labName: '微笑测试',
      labDescription1: '表情时个人修养、魅力的外在体现',
      labDescription2: '快来测测你的微笑能得几分',
      labIcon: '/images/bar_icon_smile.png'
    }, {
      labName: '体型着装',
      labDescription1: '得体的衣着能够给HR留下好的印象',
      labDescription2: 'AI根据肤色体型推荐穿搭',
      labIcon: '/images/bar_icon_clothes.png'
    }, {
      labName: '化妆模拟',
      labDescription1: '化淡妆时对面试尊重的体现',
      labDescription2: '模拟各种妆容效果，找到适合自己的面妆',
      labIcon: '/images/bar_icon_makeup.png'
    }, {
      labName: '无领导小组讨论',
      labDescription1: '用情景模拟的方式进行集体面试',
      labDescription2: '考察组织协调、口头表达能力等个性特征',
      labIcon: '/images/bar_icon_discuss.png'
    }, {
      labName: '自我介绍',
      labDescription1: '不可忽视的面试必备环节',
      labDescription2: '测试一下你的自我介绍能得几分',
      labIcon: '/images/bar_icon_selfintroduction.png'
    }, ]
  },
  navigate: function(e) {
    var lab = e.currentTarget.dataset.lab
    var url
    if (lab.labName == "微笑测试" || lab.labName == "体型着装" || lab.labName == "化妆模拟") {
      url = '../labs/etiquetteDress/etiquetteDress'
    } else if (lab.labName == "自我介绍") {
      url = '../labs/interviewSkill/selfIntroduction/selfIntroduction'
    } else {
      url = '../labs/interviewSkill/selfIntroduction/selfIntroduction'
    }
    console.log(url)
    var that = this
    wx.navigateTo({
      url: url,
      events: {
        acceptData: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        res.eventChannel.emit('acceptData', {
          lab: lab
        })
      }
    })
  },

  onShow: function(options) {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  onLoad: function(e) {

    let that = this;
    let token = null;

    // 获取缓存
    new Promise(function(resolve, reject) {
      wx.getStorage({
        key: 'token',
        success: function(res) {
          console.log("Get token storage:")
          console.log(res)
          token = res.data
        },
        fail: function(res) {
          reject()
        }
      })
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          app.globalData.userId = res.data
          console.log("Get userId storage: ")
          console.log(res.data)
          resolve()
        },
        fail: function (res) {
          reject(res)
        }
      })
      resolve()
    }).then(function() {
      console.log("Get storage successed:")
      if (token == null) {
        that.login()
      } else {
        app.globalData.token = token
        // 检查wx token是否过期：
        wx.checkSession({
          success() {
            console.log("Session of wechat available.")
            // 检查服务端token是否过期：
            let inTime = true
            new Promise(function(resolve, reject) {
              inTime = that.checkSession()
              if (inTime) {
                resolve()
              } else {
                reject()
              }
            }).then(function () {
              console.log("Session of server available.")
              that.getInfo()
            }).catch(function() {
              console.log("Session of server unavailable!")
              that.login()
            })
          },
          failed() {
            console.log("Session of wechat unavailable.")
            that.login()
          }
        })
      }
    }).catch(function(e) {
      console.log("Get storage failed:")
      console.log(e)
      that.login()
    })
  },

  getInfo: function() {
    const that = this
    // 获取班级列表
    wx.request({
      url: URL.viewClass,
      method: 'GET',
      header: {
        'Career-user': app.globalData.token
      },
      success: function(res) {
        console.log('Response from show all classes:');
        console.log(res.data);

        app.globalData.classInfo.classList.push(...res.data.data);
        console.log(app.globalData.classInfo.classList);

        // 刷新 classHeader 组件的班级信息
        console.log("Fresh component's class info.")
        that.selectComponent("#classHeader").freshClass();
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },

  checkSession: function() {
    console.log("Check session function:")
    const info = app.globalData
    const that = this
    new Promise(function (resolve, reject) {
      wx.request({
        url: URL.checkSession + '?userId=' + info.userId + '&token=' + info.token,
        method: 'GET',
        success(res) {
          console.log("Response from check back end token:")
          console.log(res)
          if (res.data.code == 200) {
            resolve()
          } else {
            reject()
          }
        }
      })
    }).then(function() {
      return true
    }).catch(function(){
      return false
    })
  },

  login: function() {
    let that = this
    // 微信登陆：
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code;
          console.log('wx.login code:' + code);

          new Promise(function(resolve,reject) {
            // Server 登陆
            wx.request({
              url: URL.login + code,
              method: 'POST',
              success: function (res) {
                console.log('Server login response data:')
                console.log(res.data);
                app.globalData.token = res.data.data.token.token;
                wx.setStorage({
                  key: 'token',
                  data: res.data.data.token.token
                })
                wx.setStorage({
                  key: 'userId',
                  data: res.data.data.token.userId
                })
                app.globalData.token = res.data.data.token.token
                app.globalData.userId = res.data.data.token.userId
                resolve()
              },
              fail: function(res) {
                console.log('Server login request failed!', res)
                reject()
              }
            });
          }).then(function() {
            that.getInfo()
          }).catch(function() {
            console.log('Ah o...')
            wx.showToast({
              title: '服务器开小差了...请退出重试',
              icon: 'loading'
            })
          })
        }
      },
      fail: function (res) {
        console.log("Wechat login failed:");
        console.log(res);
        wx.showToast({
          title: '微信服务器开小差了...请退出重试',
          icon: 'loading'
        })
      }
    })
  }

})