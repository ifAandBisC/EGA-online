var systemColor = require('../../config/color.js')
//index.js
//获取应用实例
const app = getApp()
//console.log(app)

Page({
  data: {
    labList: [
      {
        labName: '微笑测试',
        labDescription: '',
        labIcon: '/images/bar_icon_smile.png',
        labUrl: ''
      },{
        labName: '体型着装',
        labDescription: '',
        labIcon: '/images/bar_icon_clothes.png'
      },{
        labName: '化妆模拟',
        labDescription: '',
        labIcon: '/images/bar_icon_makeup.png'
      },{
        labName: '无领导小组讨论',
        labDescription: '',
        labIcon: '/images/bar_icon_discuss.png'
      },{
        labName: '自我介绍',
        labDescription: '',
        labIcon: '/images/bar_icon_selfintroduction.png'
      },
    ]
  },
  navigate: function (e) {
    var lab = e.currentTarget.dataset.lab
    console.log(lab)
    var that = this
    wx.navigateTo({
      url: '../labs/etiquetteDress/etiquetteDress',
      events: {
        acceptData: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptData', { lab: lab })
      }
    })
  },
  onShow: function (options) {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
