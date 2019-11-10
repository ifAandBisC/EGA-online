var systemColor = require('../../../config/color.js');

Component({
  data: {
    tSelected: 0,
    color: systemColor.Gray,
    tSelectedColor: systemColor.Blue,
    list: [{
      pagePath: "../etiquetteDress/etiquetteDress",
      //iconPath: "/image/icon_component.png",
      //tSelectedIconPath: "/image/icon_component_HL.png",
      text: "礼仪着装"
    }, {
      pagePath: "../interviewSkill/interviewSkill",
      //iconPath: "/image/icon_API.png",
      //tSelectedIconPath: "/image/icon_API_HL.png",
      text: "面试技巧"
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
        tSelected: data.index
      })

      // 传递数据给父页面
      // console.log("changeParentData been active:" + this.data.tSelected);
      var detail = {
        tSelected: this.data.tSelected
      } // detail对象，提供给事件监听函数
      var option = {} // 触发事件的选项
      this.triggerEvent('changeSelected', detail, option);
    }
  }
})