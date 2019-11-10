var systemColor = require('../config/color.js');

Component({
  data: {
    selected: 0,
    color: systemColor.Gray,
    selectedColor: systemColor.Blue,
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/bottom-icon-training1.png",
      selectedIconPath: "/images/bottom-icon-training1.png",
      text: "能力训练"
    }, {
      pagePath: "/pages/onlineTest/onlineTest",
      iconPath: "/images/bottom-icon-test0.png",
      selectedIconPath: "/images/bottom-icon-test0.png",
      text: "在线答题"
    }, {
      pagePath: "/pages/userCenter/userCenter",
      iconPath: "/images/bottom-icon-user0.png",
      selectedIconPath: "/images/bottom-icon-user0.png",
      text: "个人中心"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})