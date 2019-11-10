Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordState: true
  },

  startRecord: function (e) {
    var that = this
    wx.startRecord({
      success(res) {
        that.setData({
          recordPath: res.tempFilePath
        })
      }
    })
    this.setData({
      recordState: false
    })
    /*
    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 10000)
    */
  },
  stopRecord: function (e) {
    this.setData({
      recordState: true
    })
    wx.stopRecord()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      rcm: wx.getRecorderManager()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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