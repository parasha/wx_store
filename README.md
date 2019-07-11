### 使用说明
1. 初始化

~~~
// app.js
// 在 App() 之前使用
new Store({
  testNum: 1 // 需要的数据
})

App({
  ...
})
~~~

2. 使用

~~~
// store 中的数据会添加到 data.store 下
<text>{{store.testNum}}</text>

// 修改数据
this.setStoreData({
  testNum: 2
})
~~~


### 问题

这个功能的实现方式并不是太合理，setStoreData 的时候会同时触发 所以页面和组件的 setData 方法，太不优雅