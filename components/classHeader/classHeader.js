const app=getApp()

Component({
  pageLifetimes: {
    show: function () {
      // this.drawBanner()
      this.freshClass();
    }
  },
  lifetimes: {
    attached: function () {
      // this.freshClass();
    }
  },
  data: {
    
  },
  methods: {
    freshClass: function () {
      let classInfo = app.globalData.classInfo
      console.log("Header of classes on show component:");
      console.log(classInfo);
      if (classInfo.classList.length > 0) {
        this.setData({
          className: classInfo.classList[classInfo.selected].className,
          teacher: classInfo.classList[classInfo.selected].teacherName
        });
      }
    },
    changeClass: function () {
      let that = this;
      let classInfo = app.globalData.classInfo;
      console.log("Header of classes on changeClass button clicked:")
      console.log(classInfo)
      let classNameList = classInfo.classList.map(function (e) { return e.className; });
      console.log(classNameList);
      if (classNameList.length == 0) {
        wx.showToast({
          title: '暂未加入班级',
          icon: 'loading',
          duration: 2000
        })
      }
      wx.showActionSheet({
        itemList: classNameList,
        success: function (res) {
          classInfo.selected = res.tapIndex
          console.log(classInfo.selected)
          that.setData({
            className: classInfo.classList[res.tapIndex].className,
            teacher: classInfo.classList[res.tapIndex].teacherName
          })

          // 触发使用组件页面所监听的事件
          that.triggerEvent('changeClass');
        }
      });
    },

    // suxj:当初想用Canvas画banner，但wx的Canvas太垃圾了，不得不放弃，但又不舍得删代码
    drawBanner: function () {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        }
      })
      let ww = this.data.windowWidth
      let wh = this.data.windowHeight
      let ctx = wx.createCanvasContext('canvas',this)// 这个this很重要，不加将不在组件内查找canvas
      // banner 高度：
      let ch = 3 * wh / 5 - 0.4 * wh
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
