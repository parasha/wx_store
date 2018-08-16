import Store from '../../store/store'
Store.createPage({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  globalData:['test'],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setGlobalData({test:'测试3'})
  },

})