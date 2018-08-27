const app = getApp()

import Store from '../../store/store'

// Page(
  Store.createPage('second',{
    data: {

    },
    globalData:['text'],
    //事件处理函数
    change:function(){
      this.setGlobalData({
        text:'HELLO WORLD 2'
      },()=>{
        wx.navigateTo({
          url:'/pages/index/index'
        })
      })
      console.log(Store)
    }
  })
// )

