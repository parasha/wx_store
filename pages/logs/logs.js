//logs.js
const util = require('../../utils/util.js')

import Store from '../../store/store'


// Page(
  Store.createPage({
    data: {
      logs: []
    },
    onLoad: function () {
      console.log(this.store.test)

      this.setData({
        logs: (wx.getStorageSync('logs') || []).map(log => {
          return util.formatTime(new Date(log))
        })
      })
    }
  })
// )