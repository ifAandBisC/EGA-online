const URL = require('../../../utils/url.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    questionList: []
  },

  savePaper: function() {
    if (this.checkPaper()) {
      console.log("It is aviable to submit now!")
    }
  },

  checkPaper: function() {
    let qList = this.data.questionList
    let info = ""

    if (!this.data.paperTitle) {
      info += "试卷标题未输入！\r\n"
    }
    if (!qList.length) {
      info += "当前试卷没有题目！\r\n"
    } else {
      for (let i = 0; i < qList.length; i++) {
        let item = "第" + (i + 1) + "题："
        let check = false
        if (!qList[i].title || !qList[i].title.length) {
          check = true
          item += "\r\n题目未输入"
        }
        if (qList[i].questionType != 3) {
          if (!qList[i].optionList) {
            if (check) {
              item += '，'
            }
            check = true
            item += "\r\n未设置选项"
          } else if (qList[i].optionList.length < 2) {
            if (check) {
              item += '，'
            }
            check = true
            item += "\r\n选项信息不完整"
          } else {
            let checkOption = false
            for (let j = 0; j < qList[i].optionList.length; j++) {
              if (!qList[i].optionList[j]) {
                checkOption = true
                break
              }
            }
            if (checkOption) {
              if (check) {
                item += '，'
              }
              check = true
              item += "\r\n选项信息不完整"
            }
          }
        }
        if (!qList[i].answer) {
          if (check) {
            item += '，'
          }
          check = true
          item += "\r\n未设置答案"
        }
        if (check) {
          item += "！\r\n"
          info += item
        }
      }
    }
    console.log("Check info: ", info)
    if (info.length) {
      wx.showModal({
        title: '内容缺漏！',
        content: info,
      })
      return false
    } else {
      wx.showToast({
        title: '试卷无误'
      })
      return true
    }
  },

  deleteQuestion: function(e) {
    let that = this
    wx.showModal({
      title: '确认删除第' + (e.currentTarget.dataset.idx + 1) + '题？',
      success(res) {
        if (res.confirm) {
          let questionList = that.data.questionList
          questionList.splice(e.currentTarget.dataset.idx, 1)
          that.setData({
            questionList: questionList
          })
        }
      }
    })
  },

  addSingle: function() {
    let questionList = this.data.questionList
    let item = ({
      questionType: 0
    })
    questionList.push(item)
    this.setData({
      questionList: questionList
    })
  },

  addMulti: function() {
    let questionList = this.data.questionList
    let item = ({
      questionType: 1
    })
    questionList.push(item)
    this.setData({
      questionList: questionList
    })
  },

  addSubjective: function() {
    let questionList = this.data.questionList
    let item = ({
      questionType: 3
    })
    questionList.push(item)
    this.setData({
      questionList: questionList
    })
  },

  addOption: function(e) {
    let questionList = this.data.questionList
    if (!questionList[e.currentTarget.dataset.idx].optionList) {
      questionList[e.currentTarget.dataset.idx].optionList = []
    }
    questionList[e.currentTarget.dataset.idx].optionList.push("")
    this.setData({
      questionList: questionList
    })
  },

  deleteOption: function(e) {
    // console.log(e)
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index.index].optionList.splice(index.optIndex, 1)
    this.setData({
      questionList: questionList
    })
  },

  inputPaperTitle: function(e) {
    this.setData({
      paperTitle: e.detail.value
    })
  },

  inputAnswer: function(e) {
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index].answer = e.detail.value
    this.setData({
      questionList: questionList
    })
  },

  inputOption: function(e) {
    // console.log("Input option:")
    // console.log(e)
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index.index].optionList[index.optIndex] = e.detail.value
    this.setData({
      questionList: questionList
    })
  },

  inputTitle: function(e) {
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index].title = e.detail.value
    this.setData({
      questionList: questionList
    })
  },

  inputContent: function(e) {
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index].content = e.detail.value
    this.setData({
      questionList: questionList
    })
  },

  inputParse: function(e) {
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index].parse = e.detail.value
    this.setData({
      questionList: questionList
    })
  },

  setAnswer: function(e) {
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    questionList[index.index].answer = index.optIndex
    this.setData({
      questionList: questionList
    })
  },

  setAnswers: function(e) {
    console.log(e)
    let questionList = this.data.questionList
    let index = e.currentTarget.dataset.index
    let answerList = questionList[index.index].answerList
    if (!answerList) {
      answerList = []
    }
    let isAnswer = false
    for (let i = 0; i < answerList.length; i++) {
      if (answerList[i] == index.optIndex) {
        answerList.splice(i, 1)
        isAnswer = true
        break
      }
    }
    if (!isAnswer) {
      answerList.push(index.optIndex)
      answerList.sort()
    }
    let answer = answerList.map(function(currentValue) {
      return String.fromCharCode(currentValue + 65)
    }).toString()
    questionList[index.index].answerList = answerList
    questionList[index.index].answer = answer
    this.setData({
      questionList: questionList
    })
  }
})