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
    
    Page = function (config) {
      const { onLoad } = config;
      config.onLoad = function (e) {
        this.setData({ store: _$state });
        store.addDepend(this);
        onLoad && onLoad(e)
      }
      config.setGlobalData = store.setGlobalData.bind(store);
      _Page(config)
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
  setGlobalData(obj) {
    const changeData = {};
    const keys = Object.keys(obj);
    keys.forEach(k=>{
      changeData[`store.${k}`] = obj[k]
    })
    this.deps.forEach(page => {
      page.setData(changeData)
    })
  }

}

export default Store