## 微信小程序的全局变量控制

### 1. 概要
在页面内增加了一个 setGlobalData 方法
~~~JavaScript
//事件处理函数
bindViewTap: function() {
    this.setGlobalData({test:'测试'})
},
~~~
和一个 globalData 属性（Arrary）


### 2. 使用
直接引用 'store/store.js'

2.1 创建Page 页面
~~~JavaScript
import Store from '../../store/store'

Store.createPage({
  data: {
    logs: []
  },
  globalData:['test']
  onLoad: function () {
    console.log(this.data.test)
    console.log(this.store.test)
  }
})
~~~

2.2 创建 Component 组件
组件没有 globalData 属性，内部需要使用的globalData 依然要以标签属性的形式传进来
调用 setGlobalData 时实际是调用父页面 page 上的 setGlobalData
另外添加了一个 setPageDate 方法，直接修改 page 的 data
~~~JavaScript
import Store from '../store/store'
Store.createComponent({
  properties: {

  },
  data: {

  },
  methods: {

  }
})
~~~

2.3 修改globalData
~~~javascript
    this.setGlobalData({test:'测试'})
~~~

### 3. 各种问题
还没有详细的测试，可能会出现各种不可用的问题
