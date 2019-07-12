
import { isObject } from './utils/index';
class Store {
  state = {};
  deps = [];
  constructor(globalData) {
    this.init(globalData);
  }

  init(globalData) {

    this.state = globalData;
    const _$state = this.state;
    stateObserve(_$state);
    const store = this;

    const _Page = Page;
    Page = function (config) {
      const { onLoad, onUnload, inject } = config;
      /* 在 onload 时将 state 挂载到 data 上 */
      config.onLoad = function (e) {
        this.setData({ store: _$state });
        store.addDepend(this);
        onLoad && onLoad(e)
      }
      // 组件销毁时移出依赖
      config.onUnload = function (e) {
        store.deleteDepend(this);
        onUnload && onUnload(e)
      }
      config.setStoreData = store.setStoreData.bind(store);
      _Page(config)
    }
    // const _Component = Component;
    // Component = function (config) {
    //   const { attached, detached } = config;
    //   /* 在 created 时将 state 挂载到 data 上 */
    //   config.attached = function (e) {
    //     this.setData({ store: _$state });
    //     store.addDepend(this);
    //     attached && attached(e)
    //   }
    //   // 组件销毁时移出依赖
    //   config.detached = function (e) {
    //     store.deleteDepend(this);
    //     detached && detached(e)
    //   }
    //   config.methods.setStoreData = store.setStoreData.bind(store);
    //   _Component(config);
    // }
  }

  // 向 store 中增加依赖
  addDepend(page) {
    if (this.deps.indexOf(page) > -1) {
      return;
    }
    this.deps.push(page)
  }
  deleteDepend(page) {
    const index = this.deps.indexOf(page)
    if (index == -1) {
      return;
    }
    this.deps.splice(index, 1)
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

function stateObserve(state) {
  const keys = Object.keys(state);
  keys.forEach(key => {
    let value = state[key];
    if (isObject(value)) {
      stateObserve(value)
    }
    defineDepend(state, key, value);
  })
}

function defineDepend(obj, key, value) {
  const dep = new dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return value;
    },
    set: function (newValue) {
      console.log('set')
      value = newValue;
    },
  })
}

export default Store