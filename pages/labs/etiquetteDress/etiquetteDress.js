Page({

  /**
   * 页面的初始数据
   */
  data: {
    // true is front, false is back
    cameraPosition: true
  },

  chosePhoto: function (e) {
    var that = this
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          src: tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  takePhoto: function (e) {
    this.data.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  switchCamera: function () {
    this.setData({
      cameraPosition: !this.data.cameraPosition
    })
    console.log(this.data.cameraPosition)
  },
  error: function (e) {
    console.log(e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptData',function(data){
      that.setData({
        lab: data.lab
      })
    })
    console.log("lab page: " + that.data.lab)
    that.setData({
      ctx: wx.createCameraContext()
    })
  }
})