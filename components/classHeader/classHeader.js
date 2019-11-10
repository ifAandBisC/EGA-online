Component({
  pageLifetimes: {
    show: function () {
      this.drawBanner()
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            ww: res.windowWidth,
            wh: res.windowHeight
          })
        }
      })
      // banner 高度：
      var bh = this.data.wh / 6
      this.setData({
        className: "形象班02班",
        teacher: "刘艾佳"
      })
      /*
        bannerWidth: this.data.ww,
        bannerHeight: bh,
        innerSide: this.data.ww / 8,
        innerTop: bh / 4,
        innerWidth: 3 * this.data.ww /4,
        innerHeight: bh / 2
      */
    }
  },
  methods: {
    drawBanner: function () {
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        }
      })
      var ww = this.data.windowWidth
      var wh = this.data.windowHeight
      var ctx = wx.createCanvasContext('canvas',this)// 这个this很重要，不加将不在组件内查找canvas
      // banner 高度：
      var ch = 3 * wh / 5 - 0.4 * wh
      this.setData({
        bannerWidth: ww,
        bannerHeight: ch,
        innerSide: ww / 8,
        innerTop: ch / 4
      })

      // 底层大圆
      // 渐变色对象：
      const grd = ctx.createLinearGradient(0, 0, ww, ww / 2)
      grd.addColorStop(0, '#91dbe5')
      grd.addColorStop(1, '#85e3c8')

      ctx.arc(ww/2, 0 - 7*wh/16, 5*wh/8, 0, 2 * Math.PI)
      /*
      ctx.beginPath()
      ctx.moveTo(0,0)
      ctx.lineTo(0,wh/8)
      ctx.arcTo(ww/2,wh/4, ww,wh/8, wh)
      ctx.lineTo(ww,0)
      ctx.lineTo(0,0)
      ctx.closePath()
      */

      ctx.setShadow(0, 1, 50, '#91dbe5')
      ctx.setFillStyle(grd)
      ctx.fill()

      ctx.setFillStyle('#7fcec8')
      ctx.fillRect(ww / 8, ch / 4, 0.75 * ww, 0.46 * ch)

      ctx.draw()

      console.log("canvas drawed")
      console.log(ctx)
    }
  }
})
