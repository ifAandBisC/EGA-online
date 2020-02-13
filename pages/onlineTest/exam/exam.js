const URL = require('../../../utils/url.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false,
    progressHidden: true,
    currentIndex: 0, //当前显示题目
    total_micro_second: 0,
    clock: '',
    progress: 0,
    idx: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    questionCnt: 0,
    questionList: [{
        questionId: "",
        questionType: 0,
        title: "世界上是先有鸡还是现有蛋？",
        content: "",
        options: ["鸡", "蛋", "生活所迫"],
        answer: "C",
        parse: "hello world!"
      },
      {
        questionId: "",
        questionType: 0,
        title: "你喜欢下列哪张图片",
        content: "",
        optionType: "图片",
        options: ["https://cdn.pixabay.com/photo/2019/12/05/00/36/leaves-4673997_960_720.jpg", "https://cdn.pixabay.com/photo/2019/12/05/21/07/snowman-4676142_960_720.jpg", "https://cdn.pixabay.com/photo/2019/11/21/19/15/tiger-4643233__340.jpg"],
        answer: "C",
        parse: "hello world!"
      },
      {
        questionId: "",
        questionType: 0,
        title: "下图是什么动物",
        content: "",
        medias: [{
          type: "图片",
          content: "http://upload4.hlgnet.net/bbsupfile/2010/2010-04-18/20100418113614_33.jpg"
        }],
        options: ["猫", "虎", "狗", "熊"],
        answer: "C",
        parse: "hello world!"
      },
      {
        questionId: "",
        questionType: 0,
        title: "视频题目",
        content: "",
        medias: [{
          type: "视频",
          content: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
        }],
        options: ["猫", "虎", "狗", "熊"],
        answer: "C",
        parse: "hello world!"
      },
      {
        questionId: "",
        questionType: 1,
        title: "要调动群众的积极性，必须做到：",
        content: "",
        options: ["同群众打成一片", "与群众同呼吸，共命运", "关心群众的生活", "为群众排忧解难"],
        answer: "A,B,C"
      },
      {
        questionId: "",
        questionType: 3,
        title: "入党宣誓词是：",
        content: "",
        //studentAnswer: "我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。",
        answer: "我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。",
        parse: "我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。"
      }
    ]
  },

  submitExam: function(e) {
    let that = this
    if (that.data.questionList.length > that.data.progress) {
      wx.showModal({
        title: '还有' + (that.data.questionList.length - that.data.progress) + '道题未作，是否仍要提交？',
        success(res) {
          if (res.confirm) {
            that.submitAnswers()
            wx.navigateBack({
              delta: 1,
              success(res) {
                wx.showToast({
                  title: '提交成功',
                  duration: 2000
                })
              }
            })
          } else {
            that.setData({
              progressHidden: false
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '确认提交试卷',
        success(res) {
          if (res.confirm) {
            // wx.navigateTo({
            //   url: '',
            // })
            that.submitAnswers()
            wx.navigateBack({
              delta: 1,
              success(res) {
                wx.showToast({
                  title: '提交成功',
                  duration: 2000
                })
              }
            })
          }
        }
      })
    }
  },

  showProgress: function() {
    this.setData({
      progressHidden: !this.data.progressHidden
    })
  },

  problemChange: function(e) {
    let detail = e.detail
    if (detail.source == "touch") { // 解决微信bug
      this.setData({
        currentIndex: detail.current
      })
    }
  },

  doAnswer: function(e) {
    let items = this.data.questionList
    /**
     * 用于显示做题进度：
     */
    let answer = e.detail.value // 当前学生的作答
    let stuAnswer = items[this.data.currentIndex].studentAnswer // 存储下来的学生该题的作答

    // console.log("Do answer method:")
    // console.log(stuAnswer, answer)

    // 更新已做题数
    if (answer == "" && stuAnswer) {
      this.setData({
        progress: this.data.progress - 1
      })
    } else if (answer != "" && !stuAnswer && this.data.progress <= this.data.questionCnt) {
      this.setData({
        progress: this.data.progress + 1
      })
    }

    // 更新作答数据
    // console.log(answer)
    if (items[this.data.currentIndex].questionType == 3) {
      items[this.data.currentIndex].studentAnswer = answer
    } else if (items[this.data.currentIndex].questionType == 1) {
      // console.log("Multi choice:")
      if (answer.length > 0) {
        items[this.data.currentIndex].studentAnswer = answer.map(function(currentValue) {
          // console.log(currentValue)
          return String.fromCharCode('A'.charCodeAt() + parseInt(currentValue))
        }).sort().toString()
      } else {
        items[this.data.currentIndex].studentAnswer = ""
      }
    } else {
      items[this.data.currentIndex].studentAnswer = String.fromCharCode(65 + parseInt(answer))
    }
    this.setData({
      questionList: items
    })
  },

  switchQuestion: function(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      progressHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面渲染
   */
  onShow: function(options) {
    // 获取考试信息：
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('examInfo', function(data) {
      that.setData({
        exam: data.exam,
        isTranscript: data.isTranscript
      })
    })
    console.log('Exam informations:');
    console.log(that.data.exam);

    // 获取试卷信息：
    wx.request({
      url: URL.getQuestions + that.data.exam.paperId,
      method: 'GET',
      header: {
        'Career-user': app.globalData.token
      },
      success: function(res) {
        // 获取试卷题目多了一层结构，用于区分题目信息，和学生作答：
        let questionList = []
        console.log("Paper informations:")
        console.log(res)
        for (let i=0;i<res.data.data.length;i++){
          questionList.push(res.data.data[i].questionBaseVO)
        }
        that.setData({
          questionCnt: questionList.length,
          questionList: questionList
        })
      }
    });

    if (!this.data.isTranscript) {
      this.setData({
        total_micro_second: 30 * 60 * 1000 //1.5 * 60 * 60 * 1000
      })
      this.count_down(this);
    }
  },

  onUnload: function() {
    if (!this.data.isSubmit) {
      this.submitAnswers()
      wx.showModal({
        title: '异常退出！',
        content: '已自动提交试卷',
      })
      console.log("Do exam page unload.")
    }
    // 刷新试卷列表：
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象 
      var prePage = pages[pages.length - 2];
      //关键在这里,这里面是触发上个界面的方法 
      prePage.freshExam()
    }
  },

  submitAnswers: function () {
    this.setData({
      isSubmit: true
    })
    let answers = []
    let studentId = app.globalData.userId
    let exam = this.data.exam
    let questions = this.data.questionList
    // console.log("Details of submiting paper:")
    // console.log(exam)
    // console.log(this.data.questionList)
    for (let i in questions) {
      answers.push({
        examId: exam.examId,
        paperId: exam.paperId,
        questionId: questions[i].questionId,
        studentId: studentId,
        myAnswer: questions[i].studentAnswer
      })
    }
    console.log("What I submit:")
    console.log(answers)

    wx.request({
      url: URL.submitAnswers,
      method: 'POST',
      header: {
        'Career-user': app.globalData.token
      },
      data: answers,
      success: function(res) {
        console.log("Response of submiting answers:")
        console.log(res)
      }
    })
  },


  /**
   * 倒计时函数：
   */
  /* 毫秒级倒计时 */
  count_down: function(that) {
    // 渲染倒计时时钟
    let total_micro_second = that.data.total_micro_second
    that.setData({
      clock: that.date_format(total_micro_second)
    });

    if (this.data.isSubmit) {
      return;
    }

    if (total_micro_second <= 0) {
      that.setData({
        clock: "已经截止"
      });
      // timeout则跳出递归
      that.submitAnswers()
      wx.showModal({
        title: '时间到了',
        showCancel: false,
        complete(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
              success(res) {
                wx.showToast({
                  title: '提交成功',
                  duration: 2000
                })
              }
            })
          }
        }
      })
      return;
    }
    setTimeout(function() {
      // 放在最后--
      that.setData({
        total_micro_second: that.data.total_micro_second - 1000
      })
      that.count_down(that);
    }, 1000)
  },

  // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
  date_format: function(micro_second) {
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = Math.floor(second / 3600);
    // 分钟位
    var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
    // 秒位
    var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
    // 毫秒位，保留2位
    var micro_sec = this.fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

    return hr + ":" + min + ":" + sec;
  },

  // 位数不足补零
  fill_zero_prefix: function(num) {
    return num < 10 ? "0" + num : num
  }
})