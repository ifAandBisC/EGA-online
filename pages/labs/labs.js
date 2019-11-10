// pages/labs/labs.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  navigate: function (e) {
    var that = this
    wx.navigateTo({
      url: 'etiquetteDress/etiquetteDress',
      events: {
        acceptData: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptData', {lab: that.data.lab})
      }
    })
  },
  toSmileTest: function (e) {
    this.setData({
      lab: 'smileTest'
    })
    this.navigate()
  },
  toShapeDress: function (e) {
    this.setData({
      lab: 'shapeDress'
    })
    this.navigate()
  },
  toUploadPhoto: function (e) {
    this.setData({
      lab: 'uploadPhoto'
    })
    this.navigate()
  },

  toSelfIntroduction: function (e) {
    wx.navigateTo({
      url: 'interviewSkill/selfIntroduction/selfIntroduction',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tSelected: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取组件端传递来的数据
  changeSelected: function (e) {
    // console.log('changeSelect been active:' + e.detail.tSelected);
    this.setData({
      tSelected: e.detail.tSelected
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})