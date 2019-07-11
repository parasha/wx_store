import getValue from './getValue';

class Store {
  state = {};
  deps = {
    page: [],
    component: []
  };
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
      const { data, onLoad } = config;
      Page.onLoad = function (e) {
        this.data = Object.assign({}, data, _$state);
        onLoad(e)
      }
      this.setGlobalData = 
      store.addDepend('page',this);
      _Page(config)
    }

  }
  // 向 store 中增加依赖
  addDepend(type, page) {
    if(this.deps[types].indexOf(page) > -1){
      return;
    }
    this.deps[type].push(page)
  }
  // 修改 globalData 
  setGlobalData(key,value){
    
  }
}