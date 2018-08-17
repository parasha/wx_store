import Store from '../store/store'
Store.createComponent({
  /**
   * 组件的属性列表
   */
  properties: {
    test:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached:function(){
    console.log('page:',this.page)  
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change:function(){
      this.setGlobalData({test:'ceshi'})
      wx.navigateTo({
        url: '../new/index'
      })
    }
  }
})
