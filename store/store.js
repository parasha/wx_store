import getValue from './getValue';

class Store {
  state = {};
  deps = [];
  constructor(globalData) {
    this.init(globalData);
  }

  init(globalData) {

    this.state = globalData;
    const store = this;
    const _$state = this.state;
    const _Page = Page;
    const _Component = Component;

    Page = function (config) {
      const { onLoad } = config;
      /* 在 onload 时将 state 挂载到 data 上 */
      config.onLoad = function (e) {
        this.setData({ store: _$state });
        store.addDepend(this);
        onLoad && onLoad(e)
      }
      config.setStoreData = store.setStoreData.bind(store);
      _Page(config)
    }

    Component = function (config) {
      const { attached } = config;
      /* 在 created 时将 state 挂载到 data 上 */
      config.attached = function (e) {
        this.setData({ store: _$state });
        console.log(this.data)
        store.addDepend(this);
        attached && attached(e)
      }
      config.methods.setStoreData = store.setStoreData.bind(store);
      _Component(config);
    }
  }

  // 向 store 中增加依赖
  addDepend(page) {
    if (this.deps.indexOf(page) > -1) {
      return;
    }
    this.deps.push(page)
  }
  // 修改 globalData 
  setStoreData(obj) {
    const changeData = {};
    const keys = Object.keys(obj);
    keys.forEach(k => {
      changeData[`store.${k}`] = obj[k]
    })
    this.deps.forEach(page => {
      page.setData(changeData)
    })
  }

}

export default Store