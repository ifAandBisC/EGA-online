const URL = require('../../../utils/url.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTranscript: true,
    detailHidden: false,
    currentIndex: 0, //当前显示题目
    idx: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    questionCnt: 0,
    questionList: []/* [{
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
      answer: "A",
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
      answer: "A",
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
    ] */
  },

  showProgress: function () {
    this.setData({
      detailHidden: !this.data.detailHidden
    })
  },

  problemChange: function (e) {
    let detail = e.detail
    if (detail.source == "touch") { // 解决微信bug
      this.setData({
        currentIndex: detail.current
      })
    }
  },

  switchQuestion: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      detailHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面渲染
   */
  onShow: function (options) {
    // 获取考试信息：
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('examInfo', function (data) {
      that.setData({
        exam: data.exam
      })
    })
    console.log('Transcript informations:');
    console.log(that.data.exam);

    that.setData({
      questionList: that.data.exam.questionList.map(function(currentValue){
        return ({
          ...(currentValue.questionBaseVO),
          myAnswer: currentValue.myAnswer,
          myScore: currentValue.myScore,
          score: currentValue.score,
          state: currentValue.state
        })
      })
    })
    
  },
})