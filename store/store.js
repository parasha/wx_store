const store = {
    callback:{},
    /**
     * 
     * @param {String} name 当前页面的唯一标识，用来区分全局变量的回调
     * @param {Object} params 
     */
    createPage(name,params) {
        //保存 store 
        const _this = this;
        // 小程序页面的原始参数
        const globalData = params.globalData || [];
        const onLoad = params.onLoad || function () {};
        const onUnload = params.onUnload || function () {};


        params.onLoad = function (options) {
            //把 store 加入到页面中
            this.store = _this;
            this.name = name;
            globalDataRefresh(globalData,this,_this)  
            
            // 向页面中添加一个 setGlobalData 方法
            this.setGlobalData = setGlobalData;        

            onLoad.call(this, options)
        }
        params.onUnload = function(){
            delete this.store.callback[this.name]

            onUnload.call(this)
        }
        //页面初始化
        Page(params)
    },
    /**
     * 组件这部分有问题，组件没有onShow
     */
    createComponent: function (params) {
        //保存 store 
        const _this = this;

        const attached = params.attached || function(){};
        const onReady = params.ready || function () {};

        params.attached = function(){
            // 获取父页面
            const allPages = getCurrentPages()
            this.page = allPages[allPages.length-1]
            // 向页面中添加一个 setGlobalData 方法
            this.setGlobalData = function (data){
                this.page.setGlobalData(data)
            }
            this.setPageData = function(data){
                this.page.setData(data)
            }
            //把 store 加入到页面中
            this.store = _this;
            attached.call(this)
        }
        Component(params)
    }
}

function setGlobalData (data){
    const store = this.store;
    for (let key in data) {
        store[key] = data[key]
    }
    store.callback.forEach(element=>{
        let obj = {}
        element.list.forEach(value => {
            obj[value] = store[value]
        });
        element.setData(obj);
    })
    this.setData({ ...data})
}
//每次调用 onShow 的时候更新需要的 globalData
/**
 * 
 * @param {Object} globalData data对象
 * @param {Object} page 当前的 page 对象
 * @param {Object} store store 对象
 */
function globalDataRefresh(globalData,page,store){
    //页面 load 时，从 store 中获取需要的globalData
    let obj = {}
    globalData.forEach(element => {
        if (store[element]) {
            obj[element] = store[element]
        }
    });
    page.setData(obj);
    // 保存一个 page 对象
    store.callback[page.name] = {list:globalData,page:page}
}

export default store