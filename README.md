## 微信小程序的状态管理

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
~~~JavaScript
import Store from '../store/store'
Store.createComponent({
  properties: {

  },
  data: {

  },
  globalData:['test'],
  methods: {

  }
})
~~~

2.3 修改globalData
~~~javascript
    this.setGlobalData({test:'测试'})
~~~

### 3. 各种问题
施工中...
