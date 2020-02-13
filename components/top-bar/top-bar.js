Component({
  properties: {
    showButton: {
      type: Boolean,
      value: true
    },
    barTitle: {
      type: String
    },
    barContent: {
      type: String
    },
    checkClose: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    'showButton': function(showButton) {
      this.setData({
        button: showButton
      })
    },
    'barTitle': function(barTitle) {
      this.setData({
        title: barTitle
      })
    },
    'barContent': function (barContent) {
      this.setData({
        content: barContent
      })
    }
  },
  data: {
    button: true
  },
  options: {
    multipleSlots: true
  },
  attached() {
    
  },
  methods: {
    navigateBack: function() {
      if (this.properties.showButton && this.properties.checkClose){
        wx.showModal({
          title: '还未保存，确认退出？',
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      } else {
        wx.navigateBack({
          delta: 1,
        })
      }
    }
  },
})