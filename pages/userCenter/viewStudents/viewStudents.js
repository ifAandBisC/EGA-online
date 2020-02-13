// pages/userCenter/viewStudents/viewStudents.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWindow: false,
    studentList: [
      {
        "nickname": "牛小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "牛小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "牛小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "牛小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "牛小明",
        "schoolNumber": "3901170000"
      },
      {
        "nickname": "牛小明",
        "schoolNumber": "3901170000"
      }
    ]
  },

  switchWindow: function () {
    this.setData({
      showWindow: !this.data.showWindow
    })
  },

  removeStudent: function () {
    wx.showModal({
      title: "确认移除？",
      success (res) {
        if (res.confirm) {
          // waiting for api
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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