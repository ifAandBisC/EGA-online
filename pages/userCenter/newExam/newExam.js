const URL = require('../../../utils/url.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWindow: false,
    showTimeLimit: false,
    detailHidden: false,
    idx: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    hour: 0,
    minute: 0,
    paperList: [
      {
        name: '大型数据库2019期末试卷',
        createTime: '2019-12-12'
      },
      {
        name: '大型数据库2019期末试卷',
        createTime: '2019-12-12'
      },
      {
        name: '大型数据库2019期末试卷',
        createTime: '2019-12-12'
      },
      {
        name: '大型数据库2019期末试卷',
        createTime: '2019-12-12'
      }
    ]
  },

  showProgress: function() {
    this.setData({
      detailHidden: !this.data.detailHidden
    })
  },

  /**
   * 生命周期函数--监听页面渲染
   */
  onShow: function(options) {

  },

  onLoad: function() {
    /**
     * 构造时间数组：
     */
    // 获取当前年份：
    const date = new Date(Date.parse(new Date()))
    const Y = date.getFullYear()
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // console.log("Current date:")
    // console.log(this.data.date)

    let hours = []
    for (let i=0;i<=12;i++) {
      hours.push(i)
    }
    let minutes = []
    for (let i=0;i<=59;i++) {
      minutes.push(i)
    }
    this.setData({
      hours: hours,
      minutes: minutes,
      date: Y + '-' + M + '-' + D
    })
  },

  addPaper: function() {
    wx.navigateTo({
      url: '../newPaper/newPaper',
    })
  },

  switchTimeLimit: function(e) {
    this.setData({
      showTimeLimit: e.detail.value
    })
  },

  changeTimeLimit: function(e) {
    const val = e.detail.value
    // console.log("Change time limit function:")
    // console.log(val)
    this.setData({
      hour: val[0],
      minute: val[1]
    })
  },

  switchDateLimit: function (e) {
    this.setData({
      hasDateLimit: e.detail.value
    })
  },

  changeDateLimit: function (e) {
    const val = e.detail.value
    console.log("Change date limit function:")
    console.log(val)
    this.setData({
      date: val
    })
  },

  closeWindow: function () {
    this.setData({
      showWindow: !this.data.showWindow
    })
  }
})