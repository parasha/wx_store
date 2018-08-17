//logs.js
const util = require('../../utils/util.js')

import Store from '../../store/store'


// Page(
Store.createPage({
  data: {
    logs: []
  },
  globalData:['test'],
  onLoad: function () {

  },
  onShow:function(){
    console.log(this.store)
  }
})
// )