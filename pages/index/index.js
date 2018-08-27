const app = getApp()

import Store from '../../store/store'

// Page(
  Store.createPage('index',{
    data: {
      text: 'Hello World',
    },
    globalData:['text'],
    //事件处理函数
    change:function(){
      this.setGlobalData({
        text:'HELLO WORLD'
      },()=>{
        wx.navigateTo({
          url:'/pages/second/index'
        })
      })
      console.log(Store)
    }
  })
// )

